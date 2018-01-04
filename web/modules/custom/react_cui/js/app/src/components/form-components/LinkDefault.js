import React from 'react';
import validUrl from 'valid-url';

class LinkDefault extends React.Component {

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
          onChange={(e) => this.props.handleChange(e, config.field_name, 'uri')}
        />
        <input
          placeholder="Title"
          type="text"
          onChange={(e) => this.props.handleChange(e, config.field_name, 'title')}
          value={fieldValue.title}
        />
      </div>
    )
  }

  static validate(value, fieldName, fieldConfig) {
    if (!validUrl.isUri(value.uri)) {
      return {
        status: 'error',
        message: 'URL is invalid'
      }
    }
  }  
}

export default LinkDefault;