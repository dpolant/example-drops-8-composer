import React from 'react';

class TextTextArea extends React.Component {
  render() {
    let config = this.props.fieldConfig;

    return (
      <textarea required={config.required} rows={config.formConfigSettings.basic.rows}>
        {this.props.fieldValue.value}
      </textarea>
    )
  }

  saveToState() {

  }

  validate() {
    
  }
}

export default TextTextArea;