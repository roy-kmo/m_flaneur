import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import $ from "jquery";
import "font-awesome/css/font-awesome.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
require("froala-editor/js/froala_editor.pkgd.min.js")($);
window.$ = $;
import FroalaEditor from 'react-froala-wysiwyg';


export default class PagesForm extends Component {

  static propTypes = {
    // Values for form fields, keyed by name
    formFields: PropTypes.object.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onBodyChange: PropTypes.func.isRequired,
    onPublishedChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  render () {
    const {
      formFields,
      onInputChange,
      onBodyChange,
      onPublishedChange,
      onSave,
      onBack
    } = this.props;
    const {
      title,
      body,
      path,
      isPublished
    } = formFields;
    const editorOptions = {
      imageUpload: false,
      fileUpload: false,
      videoUpload: false
    };
    return (
      <div>
        <div className="form-group">
          <button className="btn btn-default" onClick={onBack}>Back</button>
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={title}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label>Body</label>
          <FroalaEditor
            tag="textarea"
            model={body}
            onModelChange={onBodyChange}
            options={editorOptions}
          />
        </div>
        <div className="form-group">
          <label>Path</label>
          <input
            type="text"
            className="form-control"
            name="path"
            value={path}
            placeholder="about-us"
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            name="published"
            checked={isPublished}
            onChange={onPublishedChange}
            className="form-check-input"
          />
          <label className="form-check-label">&nbsp;&nbsp;Published?</label>
        </div>
        <button className="btn btn-default" onClick={onSave}>Save</button>
      </div>
    )
  }
}
