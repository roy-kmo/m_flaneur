import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackLink from './BackLink';
import ColorHousesOption from './ColorHousesOption';

export default class HelpView extends Component {

  static propTypes = {
    onColorTipsClick: PropTypes.func.isRequired,
    onCapsulesClick: PropTypes.func.isRequired
  }

  render () {
    const { onColorTipsClick, onCapsulesClick } = this.props;

    return (
      <div className="view">
      <div class="bedding-builder-section">
    <div class="progressbarrow w-row">
      <div class="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
        <div class="progress-bar-div current"></div>
      </div>
      <div class="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
        <div class="progress-bar-div"></div>
      </div>
      <div class="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
        <div class="progress-bar-div"></div>
      </div>
      <div class="progress-bar w-col w-col-2 w-col-medium-2 w-col-small-2 w-col-tiny-2">
        <div class="progress-bar-div"></div>
      </div>
      <div class="progress-bar w-col w-col-1 w-col-medium-1 w-col-small-1 w-col-tiny-1">
        <div class="progress-bar-div"></div>
      </div>
    </div>
    <div class="div-block-39">
      <div class="div-block-9">
        <div class="div-block-17-no-tooltip">
          <h1 class="heading-3-no-tooltip-2">I need inspiration.</h1>
        </div>
        <div class="div-block-19">
          <div class="text-block-15">Select one.</div>
        </div>
      </div>
      <div class="bedding-container-whole w-container">
        <div class="bedding-builder-holder">
          <div class="row-bedding w-row">
            <div class="bedding-builder-3-column w-col w-col-1 w-col-stack"></div>
            <div class="bedding-builder-3-column w-col w-col-3 w-col-stack">
              <div class="bedding-builder-containerblock"><img src="/images/Oval-21.png" width="259" srcset="/images/Oval-21-p-500.png 500w, /images/Oval-21.png 518w" sizes="220px" class="bedding-oval-shape"/>
                <div class="bedding-build-1-line option color-tips" onClick={onColorTipsClick}><a href="/pages/" class="bedding-link">Using Color Guide</a><img src="/images/question-mark-1question-mark.png" width="19" class="question-centered"/></div>
              </div>
            </div>
            <div class="bedding-builder-3-column w-col w-col-4 w-col-stack">
              <div class="bedding-builder-containerblock"><img src="/images/Oval-21.png" width="259" srcset="/images/Oval-21-p-500.png 500w, /images/Oval-21.png 518w" sizes="220px" class="bedding-oval-shape"/>
                <div class="bedding-build-1-line option capsules"><a href="/pages/capsule" class="bedding-link">See Designer Capsules</a><img src="/images/question-mark-1question-mark.png" width="19" class="question-centered"/></div>
              </div>
            </div>
            <div class="bedding-builder-3-column w-col w-col-3 w-col-stack">
              <div class="bedding-builder-containerblock"><img src="/images/Oval-21.png" width="259" srcset="/images/Oval-21-p-500.png 500w, /images/Oval-21.png 518w" sizes="220px" class="bedding-oval-shape"/>
                <div class="bedding-build-1-line"><a href="/color-houses" class="bedding-link">See Color Houses</a><img src="/images/question-mark-1question-mark.png" width="19" class="question-centered"/></div>
              </div>
            </div>
            <div class="bedding-builder-3-column w-col w-col-1 w-col-stack"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="help-block w-container">
    <div className="row-28 w-row">
      <div className="column-22 w-col w-col-4">
        <div>
          <h1 className="heading-7">Chat with us</h1>
          <p className="paragraph-3">Our concierge is available to assist you with color selections and more. </p><a href="#" className="side-button">Chat</a></div>
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
    <BackLink {...this.props} />
  </div>



      </div>
    );
  }
}
