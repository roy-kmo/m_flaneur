import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColorHousesOption from './ColorHousesOption';
import BackLink from './BackLink';

export default class HaveView extends Component {

  static propTypes = {
    onUploadClick: PropTypes.func.isRequired,
    onEnterPantoneClick: PropTypes.func.isRequired
  }

  render () {
    const { onUploadClick, onEnterPantoneClick } = this.props;

    return (
<div className="view">
  <div className="bedding-builder-section">
    <div className="progressbarrow w-row">
      <div className="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
        <div className="progress-bar-div current"></div>
      </div>
      <div className="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
        <div className="progress-bar-div current"></div>
      </div>
      <div className="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
        <div className="progress-bar-div"></div>
      </div>
      <div className="progress-bar w-col w-col-2 w-col-medium-2 w-col-small-2 w-col-tiny-2">
        <div className="progress-bar-div"></div>
      </div>
      <div className="progress-bar w-col w-col-1 w-col-medium-1 w-col-small-1 w-col-tiny-1">
        <div className="progress-bar-div"></div>
      </div>
    </div>
    <div className="div-block-39">
      <div className="div-block-9">
        <div className="div-block-17-no-tooltip">
          <h1 className="heading-3-no-tooltip-2">I know what (color) I want.</h1>
        </div>
        <div className="div-block-19">
          <div className="text-block-15">Select one.</div>
        </div>
      </div>
      <div className="bedding-container-whole w-container">
        <div className="bedding-builder-holder">
          <div className="row-bedding w-row">
            <div className="bedding-builder-3-column w-col w-col-1 w-col-stack"></div>
            <div className="bedding-builder-3-column w-col w-col-3 w-col-stack">
              <div className="bedding-builder-containerblock"><img src="/images/Oval-21.png" width="259" srcset="/images/Oval-21-p-500.png 500w, /images/Oval-21.png 518w" sizes="220px" className="bedding-oval-shape"/>
                <div className="bedding-build-1-line option upload-image" onClick={onUploadClick}><a href="#" className="bedding-link">Upload Image</a><div class="tooltip"><img src="/images/question-mark-1question-mark.png" width="19" class="question-centered"/><span class="tooltiptext">Already have an image in mind? Upload and start with that.</span>
</div></div>
              </div>
            </div>
            <div className="bedding-builder-3-column w-col w-col-4 w-col-stack">
              <div className="bedding-builder-containerblock"><img src="/images/Oval-23.png" width="259" className="bedding-oval-shape"/>
                <div className="bedding-build-1-line option enter-pantone" onClick={onEnterPantoneClick}><a href="#" className="bedding-link">Enter Pantone Code</a><div class="tooltip"><img src="/images/question-mark-1question-mark.png" width="19" class="question-centered"/><span class="tooltiptext">The standard has already been set. Add the Pantone number here.</span>
</div></div>
              </div>
            </div>
            <div className="bedding-builder-3-column w-col w-col-3 w-col-stack">
              <div className="bedding-builder-containerblock"><img src="/images/Oval-21.png" width="259" srcset="/images/Oval-21-p-500.png 500w, /images/Oval-21.png 518w" sizes="220px" className="bedding-oval-shape"/>
                <div className="bedding-build-1-line"><a href="/color-houses" className="bedding-link">View Color Houses</a><div class="tooltip"><img src="/images/question-mark-1question-mark.png" width="19" class="question-centered"/><span class="tooltiptext">View curated collections of colors by Flaneurs experts.</span>
</div></div>
              </div>
            </div>
            <div className="bedding-builder-3-column w-col w-col-1 w-col-stack"></div>
          </div>
              <BackLink {...this.props} />
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


</div>



    );
  }
}
