import React from 'react';

class TextTextArea extends React.Component {

  render() {
    let config = this.props.fieldConfig;

    return (
      <textarea         
        required={config.required}      
        onChange={(e) => this.props.handleChange(e, config.field_name, 'value')}
        rows={config.formConfigSettings.basic.rows}>
          {this.props.fieldValue.value}
      </textarea>
    )
  }

  static validate(value, fieldName, fieldConfig) {
    console.log('childvalidate');
    // console.log([value, fieldName, fieldConfig]);

    // return {
    //   status: 'error',
    //   message: 'Test validation error'
    // }
  }
}

export default TextTextArea;