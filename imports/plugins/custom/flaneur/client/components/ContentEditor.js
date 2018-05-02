import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';

export default class ContentEditor extends Component {

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  componentDidMount () {
    // Manually disable editor tooltips
    $('#content-editor button').attr('data-original-title', '');
  }

  render () {
    const { value, onChange } = this.props;

    return (
      <div id="content-editor">
        <ReactSummernote
          value={value || ''}
          options={{
            height: 350,
            dialogsInBody: true,
            tooltip: false,
            toolbar: [
              ['style', ['style']],
              ['font', ['bold', 'underline', 'clear']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['table', ['table']],
              ['insert', ['link', 'picture', 'video']],
              ['view', ['fullscreen', 'codeview']]
            ]
          }}
          onChange={onChange}
        />
      </div>
    );
  }
}
