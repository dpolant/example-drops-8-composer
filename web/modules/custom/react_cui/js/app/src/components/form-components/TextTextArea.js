import React from 'react';

class TextTextArea extends React.Component {

  handleChange(event, fieldname) {
    // Update form state.
    var value = {
      format: 'something',
      value: event.target.value
    }

    // This is propagated down from App. We keep the form state updated
    // in real time.
    this.props.setFormState(value, fieldname);
  }

  render() {
    let config = this.props.fieldConfig;

    return (
      <textarea         
        required={config.required}      
        onChange={(e) => this.handleChange(e, config.field_name)}
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