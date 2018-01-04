import React from 'react';
import { deriveFormComponentName } from '../registry';

class FormComponent extends React.Component {

  static validate(value, fieldName, fieldConfig) {
    const childComponentName = deriveFormComponentName(fieldName, fieldConfig);
    return childComponentName.validate(value, fieldName, fieldConfig);
  }

  render() {
    const fieldConfig = this.props.fieldConfig;
    const fieldName = fieldConfig.field_name;
    var ComponentName = deriveFormComponentName(fieldName, fieldConfig);
    var fieldFormState = this.props.getFormState(fieldName);

    return (
      <div className="field-form-component">
        <label>{fieldConfig.label}</label>
        <p className="field-description">{fieldConfig.description}</p>
        <ComponentName 
          fieldConfig={fieldConfig} 
          isRequired={fieldConfig.required} 
          fieldValue={fieldFormState}
          setFormState={this.props.setFormState}
          getFormState={this.props.getFormState}
        />
      </div>
    )
  }
}

export default FormComponent;