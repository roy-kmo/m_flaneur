import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from "react-dom";
import ColorThief from '@cschear/color-thief';
import ColorLink from '/imports/plugins/custom/colors/client/components/ColorLink';
import handleSwatchbookAddClick from '/imports/plugins/custom/swatchbook/client/lib/handleSwatchbookAddClick';
import handleSwatchbookRemoveClick from '/imports/plugins/custom/swatchbook/client/lib/handleSwatchbookRemoveClick';
import { hexToPantone } from '../lib/hexToPantone';

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

    this.state = {
      imageWidth: 0,
      imageHeight: 0,
      paletteMap: {},
      selectedPickerColor: 'transparent',
      selectedPickerKey: null,
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
    this.showPixelColor(e);
  }

  showPixelColor(e) {
    e.preventDefault();

    const imageElem = ReactDOM.findDOMNode(this.imageElem);
    const bound = imageElem.getBoundingClientRect();
    const canvas = ReactDOM.findDOMNode(this.imageCanvas);
    const context = canvas.getContext('2d');
    const pixelData = context.getImageData(e.clientX - bound.left, e.clientY - bound.top, 1, 1).data;

    this.setState({
      selectedPickerColor: `#${pixelData[0].toString(16)}${pixelData[1].toString(16)}${pixelData[2].toString(16)}`,
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
            const pantoneCodesList = [];
            for (let k of Object.keys(paletteMap)) {
              const rgb = paletteMap[k];
              const matches = new hexToPantone(rgb, 3);
              const pantoneCodes = matches.map(match => `${match} TCX`);
              pantoneCodesList.push(pantoneCodes);
            }
            Meteor.call('Colors.getByPantoneCodesList', pantoneCodesList, (err, imageColorsList) => {
              if (err) {
                alert(err.reason);
              } else {
                let mapIndex = 1;
                imageColorsList.forEach((imageColors) => {
                  paletteMap[`${mapIndex}`].delta = delta;
                  paletteMap[`${mapIndex}`].pantone = imageColors;
                  mapIndex++;
                });
                this.setState({
                  imageWidth: imageElem.offsetWidth,
                  imageHeight: imageElem.offsetHeight,
                  paletteMap,
                });
              }
            });
            return;
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
      throw new Error('Invalid HEX color.');
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
    const { paletteMap } = this.state;

    const cursors = [];
    for (let key of Object.keys(paletteMap)) {
      const item = paletteMap[key];
      const color = `#${this.padZero(item.r.toString(16), 2)}${this.padZero(item.g.toString(16), 2)}${this.padZero(item.b.toString(16), 2)}`;
      const invertedColor = this.invertColor(color);

      cursors.push(
        <div
          key={`cursor_${key}`}
          id={`cursor_${key}`}
          style={{
            position: 'absolute',
            cursor: 'crosshair',
            left: item.x,
            top: item.y,
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
    const { selectedPickerKey } = this.state;
    if (selectedPickerKey === key) {
      this.setState({ selectedPickerKey: null, selectedPickerColor: 'transparent' });
    } else {
      this.setState({ selectedPickerKey: key, selectedPickerColor: color });
    }
  }

  colorPickers() {
    const { paletteMap, selectedPickerKey, selectedPickerColor } = this.state;

    const pickers = [];
    for (let key of Object.keys(paletteMap)) {
      const item = paletteMap[key];
      const pantone = item.pantone && item.pantone.length && item.pantone[0];
      let color;
      if (selectedPickerKey === key && selectedPickerColor !== 'transparent') {
        color = selectedPickerColor;
      } else {
        color = pantone ? `#${pantone.hexCode}` : `#${this.padZero(item.r.toString(16), 2)}${this.padZero(item.g.toString(16), 2)}${this.padZero(item.b.toString(16), 2)}`;
      }

      const style = {
        width: '80%',
        height: '30px',
        marginLeft: '20px',
        marginBottom: '10px',
        backgroundColor: color,
      };

      if (key === selectedPickerKey) {
        const invertedColor = this.invertColor(color);
        style.border = `1px solid ${invertedColor}`;
      }

      pickers.push(
        <div
          key={`picker_${key}`}
          style={style}
          onClick={() => this.selectColorPicker(key, color)}
        />
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

    const { imageWidth, imageHeight, selectedPickerKey, selectedPickerColor } = this.state;

    return (
      <div className="view">
        <h1>Pick a Color</h1>
        <p className="title-desc">Use your cursor to pick a color from the image.</p>
        <div style={{ display: 'table-cell', width: '50%', verticalAlign: 'top' }}>
          <div className="btn-group image-buttons" style={{ clear: 'both' }}>
            <button className="btn btn-default" onClick={onReplaceImageClick}>Replace Image</button>
            <button className="btn btn-default" onClick={onBackClick}>Cancel</button>
          </div>
          <div style={{ display: 'block' }}>
            <div
              ref={elem => this.imageContainer = elem}
              className="uploaded-image"
              style={{
                position: 'relative',
                display: 'inline-block',
                width: imageWidth ? `${imageWidth}px` : '100%',
                height: `${imageHeight}px`,
                zIndex: 1
              }}
            >
              <img
                ref={elem => this.imageElem = elem}
                src={image} id="picker-image"
                style={{
                  position: imageWidth ? 'absolute' : 'static',
                  display: 'block',
                  cursor: 'crosshair',
                  zIndex: 2,
                  margin: imageWidth ? 'inherit' : '0 auto'
                }}
                onLoad={this.onImageLoad}
              />
              <canvas ref={elem => this.imageCanvas = elem} id="image-canvas" style={{ display: 'none' }}></canvas>
              {
                selectedPickerKey && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: `${PREVIEW_SIZE}px`,
                      height: `${PREVIEW_SIZE}px`,
                      backgroundColor: selectedPickerColor,
                      border: '1px dotted lightgray',
                      zIndex: 3,
                    }}
                  />
                )
              }
              {this.dominantCursors()}
            </div>
          </div>
        </div>
        <div style={{ display: 'table-cell', width: '50%', }}>
          {this.colorPickers()}
        </div>
        <div className="image-colors">
          {imageColors.map(color => {
            const { _id, name, hexCode, slug, pantoneCode, pdpURL } = color;
            return (
              <ColorLink
                key={_id}
                _id={_id}
                name={name}
                hexCode={hexCode}
                slug={slug}
                pantoneCode={pantoneCode}
                pdpURL={pdpURL}
                isInSwatchbook={swatchbookColorIds.includes(_id)}
                onSwatchbookAddClick={handleSwatchbookAddClick}
                onSwatchbookRemoveClick={handleSwatchbookRemoveClick}
              />
            );
          })}
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
