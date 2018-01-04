import React from 'react';
import validUrl from 'valid-url';

class LinkDefault extends React.Component {
  handleChange(event, fieldname, property) {
    var fieldFormState = this.props.getFormState(fieldname);
    fieldFormState[property] = event.target.value

    // This is propagated down from App. We keep the form state updated
    // in real time.
    this.props.setFormState(fieldFormState, fieldname);
  }

  render() {
    let config = this.props.fieldConfig;
    let fieldValue = this.props.fieldValue;

    return (
      <div class="link-items">
        <input 
          placeholder="URI"
          type="text" 
          value={fieldValue.uri}
          required={config.required}
          onChange={(e) => this.handleChange(e, config.field_name, 'uri')}
        />
        <input
          placeholder="Title"
          type="text"
          onChange={(e) => this.handleChange(e, config.field_name, 'title')}
          value={fieldValue.title}
        />
      </div>
    )
  }

  static validate(value, fieldName, fieldConfig) {
    console.log('validating linkdefault');  

    if (!validUrl.isUri(value.uri)) {
      return {
        status: 'error',
        message: 'Test validation error'
      }
    }
  }  
}

export default LinkDefault;