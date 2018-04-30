import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';

const ContentEditor = function ({ value, onChange }) {
  return (
    <ReactSummernote
      value={value || ''}
      options={{
        height: 350,
        dialogsInBody: true,
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
  );
}

ContentEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default ContentEditor;
