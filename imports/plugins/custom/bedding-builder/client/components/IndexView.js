import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class IndexView extends Component {

  static propTypes = {
    onHaveClick: PropTypes.func.isRequired,
    onHelpClick: PropTypes.func.isRequired
  }

  render () {
    const { onHaveClick, onHelpClick } = this.props;

    return (

      <div className="view">
      <div className="bedding-builder-section">
    <div className="progressbarrow w-row">
      <div className="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
        <div className="progress-bar-div current"></div>
      </div>
      <div className="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
        <div className="progress-bar-div"></div>
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
          <h1 className="heading-3-no-tooltip-2">Create Your Custom Color Bedding</h1>
        </div>
        <div className="div-block-19">
          <div className="text-block-15">Select one.</div>
        </div>
      </div>
      <div className="bedding-container-whole w-container">
        <div className="bedding-builder-holder">
          <div className="row-bedding w-row">
            <div className="bedding-builder-3-column w-col w-col-6">
              <div className="bedding-builder-containerblock"><img src="/images/Oval-21.png" width="315" srcSet="/images/Oval-21-p-500.png 500w, /images/Oval-21.png 518w" sizes="(max-width: 479px) 300px, 315px" className="bedding-oval-shape-large"/>
                <div className="bedding-build-2-line option have-color" onClick={onHaveClick}><a href="#" className="bedding-link">I know what (color) I want</a><div class="tooltip"><img src="/images/question-mark-1question-mark.png" width="19" class="question-centered"/><span class="tooltiptext">Pick your Pantone, upload an image, or view color houses</span>
</div></div>
              </div>
            </div>
            <div className="bedding-builder-3-column w-col w-col-6">
              <div className="bedding-builder-containerblock"><img src="/images/Oval-21.png" width="315" srcSet="/images/Oval-21-p-500.png 500w, /images/Oval-21.png 518w" sizes="(max-width: 479px) 300px, 315px" className="bedding-oval-shape-large"/>
                <div className="bedding-build-2-line option need-help" onClick={onHelpClick}><a href="#" className="bedding-link">I need inspiration</a><div class="tooltip"><img src="/images/question-mark-1question-mark.png" width="19" class="question-centered"/><span class="tooltiptext">Explore color tips, designer capsules, and more.</span>
</div></div>
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
      </div>
    );
  }
}
