import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from "react-dom";
import ColorThief from '@cschear/color-thief';
import ColorLink from '/imports/plugins/custom/colors/client/components/ColorLink';
import handleSwatchbookAddClick from '/imports/plugins/custom/swatchbook/client/lib/handleSwatchbookAddClick';
import handleSwatchbookRemoveClick from '/imports/plugins/custom/swatchbook/client/lib/handleSwatchbookRemoveClick';
import { hexToPantone } from '../lib/hexToPantone';
import './PickImageColorView.less';

const PREVIEW_SIZE = 30;

class PickImageColorView extends Component {
  static propTypes = {
    image: PropTypes.string,
    imageColors: PropTypes.array,
    onReplaceImageClick: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired,
    swatchbookColorIds: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);

    this.onImageLoad = this.onImageLoad.bind(this);
    this.dominantCursors = this.dominantCursors.bind(this);
    this.onPixelSelect = this.onPixelSelect.bind(this);
    this.showPixelColor = this.showPixelColor.bind(this);
    this.selectColorPicker = this.selectColorPicker.bind(this);
    this.getPantoneCodes = this.getPantoneCodes.bind(this);

    this.state = {
      imageWidth: 0,
      imageHeight: 0,
      paletteMap: {},
      pickerMap: {
        '1': {},
        '2': {},
        '3': {},
        '4': {},
        '5': {},
      },
      pickerKey: null,
    };
  }

  matchRGB(rgb, pixelData, delta) {
    if (rgb.r === pixelData[0] &&
      rgb.g === pixelData[1] &&
      rgb.b === pixelData[2]) {
      return true;
    }

    if (delta === 0) {
      return false;
    }

    if (((rgb.r - delta) <= pixelData[0] && pixelData[0] <= (rgb.r + delta)) &&
      ((rgb.g - delta) <= pixelData[1] && pixelData[1] <= (rgb.g + delta)) &&
      ((rgb.b - delta) <= pixelData[2] && pixelData[2] <= (rgb.b + delta))) {
      return true;
    }

    return false;
  }

  matchPixel(pixelData, map, x, y, delta) {
    for (let key of Object.keys(map)) {
      const rgb = map[key];
      if (this.matchRGB(rgb, pixelData, delta)) {
        rgb.x = x;
        rgb.y = y;
        return key;
      }
    }

    return false;
  }

  onPixelSelect(e) {
    e.preventDefault();
    this.showPixelColor(e, true);
  }

  showPixelColor(e, pixelSelected = false) {
    e.preventDefault();

    const imageElem = ReactDOM.findDOMNode(this.imageElem);
    const bound = imageElem.getBoundingClientRect();
    const canvas = ReactDOM.findDOMNode(this.imageCanvas);
    const context = canvas.getContext('2d');
    const x = e.clientX - bound.left;
    const y = e.clientY - bound.top;
    const pixelData = context.getImageData(x, y, 1, 1).data;

    const { paletteMap, pickerMap, pickerKey } = this.state;
    if (!pickerMap[`${pickerKey}`]) {
      pickerMap[`${pickerKey}`] = {};
    }
    const color = this.rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
    pickerMap[`${pickerKey}`].color = color;
    pickerMap[`${pickerKey}`].x = x;
    pickerMap[`${pickerKey}`].y = y;

    const updateState = {
      pickerMap,
    };
    if (pixelSelected) {
      updateState.pickerKey = null;
      if (!paletteMap[pickerKey]) {
        return;
      }
      this.getPantoneCodes([color], (imageColorsList) => {
        if (imageColorsList && imageColorsList.length && imageColorsList[0] && imageColorsList[0][0]) {
          paletteMap[pickerKey].pantones = imageColorsList[0];
          updateState.paletteMap = paletteMap;
          this.setState(updateState);
        }
      });
    } else {
      this.setState(updateState);
    }
  }

  rgbToHex(r, g, b) {
    return `#${this.padZero(r.toString(16), 2)}${this.padZero(g.toString(16), 2)}${this.padZero(b.toString(16), 2)}`;
  }

  getPantoneCodes(rgbList, callback) {
    const pantoneCodesList = rgbList.map((rgb) => {
      const matches = new hexToPantone(rgb, 3);
      return matches.map(match => `${match} TCX`);
    });
    Meteor.call('Colors.getByPantoneCodesList', pantoneCodesList, (err, imageColorsList) => {
      if (err) {
        alert(err.reason);
      } else {
        callback(imageColorsList);
      }
    });
  }

  onImageLoad({ target: img }) {
    const colorThief = new ColorThief();
    const quality = 1;
    const palette = colorThief.getPalette(this.imageElem, 5, quality);
    let id = 1;
    const tmpPaletteMap = {};
    palette.forEach((palette) => {
      tmpPaletteMap[`${id++}`] = {
        r: palette[0], g: palette[1], b: palette[2]
      };
    });

    const imageElem = ReactDOM.findDOMNode(this.imageElem);
    const canvas = ReactDOM.findDOMNode(this.imageCanvas);
    canvas.width = img.width;
    canvas.height = img.height;
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, img.width, img.height);

    this.imgData = context.getImageData(0, 0, img.width, img.height).data;

    const paletteMap = {};
    let matchCount = 0;
    for (let delta = 0; delta < 50; delta++) {
      let x = -1;
      let y = 0;
      for (let i = 0; i < this.imgData.length; i += 4) {
        if (matchCount >= 5) {
          break;
        }

        x++;
        if (x >= img.width) {
          x = 0;
          y++;
        }

        const pixelData = [this.imgData[i], this.imgData[i + 1], this.imgData[i + 2], this.imgData[i + 3]];
        const key = this.matchPixel(pixelData, tmpPaletteMap, x, y, delta);
        if (key) {
          paletteMap[key] = tmpPaletteMap[key];
          delete tmpPaletteMap[key];
          matchCount++;
          if (matchCount >= 5) {
            const rgbList = [];
            for (let k of Object.keys(paletteMap)) {
              rgbList.push(paletteMap[k]);
            }
            this.getPantoneCodes(rgbList, (imageColorsList) => {
              let mapIndex = 1;
              imageColorsList.forEach((imageColors) => {
                paletteMap[`${mapIndex}`].delta = delta;
                if (imageColors && imageColors.length) {
                  paletteMap[`${mapIndex}`].pantones = imageColors;
                }
                mapIndex++;
              });
              this.setState({
                imageWidth: imageElem.offsetWidth,
                imageHeight: imageElem.offsetHeight,
                paletteMap,
              });
            });
          }
        }
      }
    }
  }

  invertColor(hex) {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      hex =  this.padZero(hex, 6);
    }
    const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16);
    const g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16);
    const b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
  }

  padZero(str, len) {
    len = len || 2;
    const zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }

  dominantCursors() {
    const { paletteMap, pickerMap } = this.state;

    const cursors = [];
    for (let key of Object.keys(paletteMap)) {
      const item = paletteMap[key];

      const picker = pickerMap[`${key}`];
      const color = (picker && picker.color) || this.rgbToHex(item.r, item.g, item.b);
      const invertedColor = this.invertColor(color);
      const x = (picker && picker.x) || item.x;
      const y = (picker && picker.y) || item.y;
      cursors.push(
        <div
          key={`cursor_${key}`}
          id={`cursor_${key}`}
          style={{
            position: 'absolute',
            cursor: 'crosshair',
            left: x - 7,
            top: y - 9,
            zIndex: 3,
          }}
        >
          <i className="fa fa-crosshairs" style={{ invertedColor }} />
        </div>
      );
    }
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          zIndex: 3,
        }}
        onMouseMove={(e) => this.showPixelColor(e)}
        onClick={(e) => this.onPixelSelect(e)}
      >
        {cursors}
      </div>
    );
  }

  selectColorPicker(key, color) {
    const { pickerKey, pickerMap } = this.state;
    if (pickerKey === key) {
      this.setState({ pickerKey: null });
    } else {
      this.getPantoneCodes([color], (imageColorsList) => {
        if (imageColorsList && imageColorsList[0] &&  imageColorsList[0][0]) {
          const pantoneColor = imageColorsList[0][0];
          pickerMap[`${key}`].color = `#${this.padZero(pantoneColor.hexCode, 6)}`;
        } else {
          pickerMap[`${key}`].color = color;
        }
        this.setState({ pickerKey: key, pickerMap });
      });
    }
  }

  colorPickers() {
    const { imageWidth, paletteMap, pickerKey, pickerMap } = this.state;

    const pickers = [];
    for (let key of Object.keys(paletteMap)) {
      const item = paletteMap[key];
      const pantones = item.pantones;

      const picker = pickerMap[`${key}`];
      let color;
      if (picker && picker.color) {
        color = picker.color;
      } else {
        color = this.rgbToHex(item.r, item.g, item.b);
      }

      const style = {
        width: '90%',
        height: '30px',
        margin: '0 auto 0 auto',
        marginBottom: '10px',
      };

      if (color) {
        style.backgroundColor = color;
      } else {
        color = '#ffffff';
      }

      let className = color ? '' : 'color-transition';

      if (key === pickerKey) {
        const invertedColor = this.invertColor(color);
        style.border = `2px solid ${invertedColor}`;
        className += className && ' active-picker-color' || 'active-picker-color';
      }

      const swatchbookColorIds = Meteor.user().profile.swatchbookColorIds || [];
      pickers.push(
        <div
          key={`cp_${key}`}
          style={{ display: 'inline-block' }}
        >
          <div
            key={`picker_${key}`}
            style={style}
            className={className}
            onClick={() => this.selectColorPicker(key, color)}
          />
          {
            pantones.length && pantones.map(pantone => (
              <ColorLink
                key={pantone._id}
                _id={pantone._id}
                name={pantone.name}
                hexCode={pantone.hexCode}
                slug={pantone.slug}
                pantoneCode={pantone.pantoneCode}
                pdpURL={pantone.pdpURL}
                isInSwatchbook={swatchbookColorIds.includes(pantone._id)}
                onSwatchbookAddClick={handleSwatchbookAddClick}
                onSwatchbookRemoveClick={handleSwatchbookRemoveClick}
              />
            ))
          }
        </div>
      );
    }

    return (
      <div>
        {pickers}
      </div>
    );
  }

  render() {
    const {
      image,
      imageColors,
      onReplaceImageClick,
      onBackClick,
      swatchbookColorIds
    } = this.props;

    const { imageWidth, imageHeight, pickerKey, pickerMap } = this.state;

    const picker = pickerMap[`${pickerKey}`];
    return (
      <div className="view">
        <div className="color-section">
          <div className="progressbarrow w-row">
            <div className="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
              <div className="progress-bar-div current"></div>
            </div>
            <div className="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
              <div className="progress-bar-div current"></div>
            </div>
            <div className="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
              <div className="progress-bar-div current"></div>
            </div>
            <div className="progress-bar w-col w-col-2 w-col-medium-2 w-col-small-2 w-col-tiny-2">
              <div className="progress-bar-div current"></div>
            </div>
            <div className="progress-bar w-col w-col-1 w-col-medium-1 w-col-small-1 w-col-tiny-1">
              <div className="progress-bar-div"></div>
            </div>
          </div>
          <div className="div-block-39">
            <div className="container-2 w-container">
              <div>
                <div className="div-block-17 w-clearfix">
                  <h1 className="heading-3-no-tooltip-2">Refine Your Color</h1>
                </div>
                <div className="div-block-19">
                  <div className="text-block-15">Select the colors to view product colors</div>
                </div>
              </div>
              <div>
                <div className="div-block-9coo">
                  <div className="div-block-15">
                    <div style={{ display: 'block', width: '100%', verticalAlign: 'top' }}>
                      <div className="btn-group image-buttons" style={{ clear: 'both' }}>
                        <button className="btn btn-default" onClick={onReplaceImageClick}>Replace Image</button>
                        <button className="btn btn-default" onClick={onBackClick}>Cancel</button>
                      </div>

                      <div style={{ display: 'block' }}>
                        <div ref={elem=> this.imageContainer = elem} className="uploaded-image" style={{ position: 'relative', display: 'inline-block', width: imageWidth ? `${imageWidth}px` : '100%', height: `${imageHeight}px`, zIndex: 1 }} >
                          <img ref={elem=> this.imageElem = elem} src={image} id="picker-image" style={{ position: imageWidth ? 'absolute' : 'static', display: 'block', cursor: 'crosshair', zIndex: 2, margin: imageWidth ? 'inherit' : '0 auto', maxWidth: '%',
                          }} onLoad={this.onImageLoad} />
                          <canvas ref={elem=> this.imageCanvas = elem} id="image-canvas" style={{ display: 'none' }}></canvas> { pickerKey && (
                          <div style={{ position: 'absolute', top: 0, right: 0, width: `${PREVIEW_SIZE}px`, height: `${PREVIEW_SIZE}px`, backgroundColor: picker.color, border: '1px solid lightgray', zIndex: 3, }} /> ) } {this.dominantCursors()}
                        </div>
                      </div>
                    </div>
                    <div className="div-block-19">
                      <div className="text-block-115">Click any color bar below to begin fine-tuning. See the curated color pairings change based on your position on the image. Click the bookmark to add a color to your swatchbook. </div>
                    </div>
                    <div className="block-pickers" style={{ display: 'inline-block' }}>
                      {this.colorPickers()}
                    </div>
                  </div>
                  <div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="help-block w-container">
          <div className="row-28 w-row">
            <div className="column-22 w-col w-col-4">
              <div>
                <h1 className="heading-7">Chat with us</h1>
                <p className="paragraph-3">Our concierge is available to assist you with color selections and more. </p><a href="#" onClick={()=>{ Intercom('show'); }} className="side-button">Chat</a></div>
            </div>
            <div className="column-22 w-col w-col-4">
              <div>
                <h1 className="heading-7">Get color tips</h1>
                <p className="paragraph-3">Get practical expert color advice from interior design insiders.</p>
              </div><a href="/pages/using-color" className="side-button">See Color Tips</a></div>
            <div className="column-22 w-col w-col-4">
              <div>
                <h1 className="heading-7">Explore the blog</h1>
                <p className="paragraph-3">Read our blog for color inspiration, how-to guides, and much more. </p><a href="www.hiflaneur.com/salon" className="side-button">Go to Salon</a></div>
            </div>
          </div>
        </div>
      </div>


    );
  }
}

export default withTracker(props => {
  const user = Meteor.user();
  const { swatchbookColorIds } = user.profile;
  return {
    swatchbookColorIds: swatchbookColorIds || []
  };
})(PickImageColorView);
