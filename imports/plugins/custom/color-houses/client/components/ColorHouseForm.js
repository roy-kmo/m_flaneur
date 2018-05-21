import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ImageUploadField from '/imports/plugins/custom/flaneur/client/components/ImageUploadField';
import Autocomplete from '/imports/plugins/custom/flaneur/client/components/Autocomplete';
import Loadable from 'react-loadable';
const ContentEditor = Loadable({
  loader: async () => {
    const component = await import('/imports/plugins/custom/flaneur/client/components/ContentEditor');
    return component.default;
  },
  loading: () => null
});

export default class ColorHouseForm extends Component {

  static propTypes = {
    // Values for form fields, keyed by name
    formFields: PropTypes.object.isRequired,
    // Options for color autocomplete
    colorOptions: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired,
    isAutocompleteLoading: PropTypes.bool.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onImageUpload: PropTypes.func.isRequired,
    onImageRemove: PropTypes.func.isRequired,
    onColorSearch: PropTypes.func.isRequired,
    onColorAdd: PropTypes.func.isRequired,
    onColorRemove: PropTypes.func.isRequired,
    onSortEnd: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      loaded: false,
      SortableContainer: undefined,
      SortableElement: undefined
    };
  }

  async componentDidMount () {
    const ReactSortable = await import('react-sortable-hoc');
    const { SortableContainer, SortableElement, SortableHandle } = ReactSortable;
    this.setState({
      loaded: true,
      SortableContainer,
      SortableElement,
      SortableHandle
    });
  }

  render () {
    const {
      formFields,
      colorOptions,
      isAutocompleteLoading,
      colors,
      onInputChange,
      onDescriptionChange,
      onSave,
      onBack,
      onImageUpload,
      onImageRemove,
      onColorSearch,
      onColorAdd,
      onColorRemove,
      onSortEnd
    } = this.props;
    const {
      loaded,
      SortableContainer,
      SortableElement,
      SortableHandle
    } = this.state;
    const {
      title,
      description,
      imageFileId,
      imageFileName
    } = formFields;

    let SortableColor;
    let SortableColorList;
    if (loaded) {
      const DragHandle = SortableHandle(() => <a href="javascript:void(0)" style={{ cursor: 'move' }}>Move</a>);

      SortableColor = SortableElement(({ color }) => {
        return (
          <li key={color._id} className="list-group-item" style={{ zIndex: '2147483647' }}>
            {color.name} -
            &nbsp;<DragHandle />
            <a href="javascript:void(0)" style={{ float: 'right' }} onClick={() => onColorRemove(color)}>Remove</a>
          </li>
        )
      });

      SortableColorList = SortableContainer(({ items }) => {
        return (
          <ul className="list-group">
            {items.map((color, index) => {
              return (
                <SortableColor key={color._id} color={color} index={index} />
              )
            })}
          </ul>
        );
      });
    }

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
          <label>Description</label>
          <ContentEditor value={description} onChange={onDescriptionChange} />
        </div>
        <ImageUploadField
          label="Image"
          fileId={imageFileId}
          fileName={imageFileName}
          onChange={onImageUpload}
          onRemove={onImageRemove}
        />
        <div className="form-group">
          <label>Colors</label>
          {loaded && (
            <SortableColorList items={colors} onSortEnd={onSortEnd} useDragHandle={true} />
          )}
          <Autocomplete
            labelKey="name"
            placeholder="Enter a color name to add..."
            options={colorOptions}
            isLoading={isAutocompleteLoading}
            onSearch={onColorSearch}
            onEnter={onColorAdd}
          />
        </div>
        <button className="btn btn-default" onClick={onSave}>Save</button>
      </div>
    )
  }
}
