import React from 'react';
import { deriveFormComponentName } from '../registry';
import { classString } from '../helpers';

class FormComponent extends React.Component {

  static validate(value, fieldName, fieldConfig) {
    const childComponentName = deriveFormComponentName(fieldName, fieldConfig);
    return childComponentName.validate(value, fieldName, fieldConfig);
  }

  render() {
    const fieldConfig = this.props.fieldConfig;
    const fieldName = fieldConfig.field_name;
    var ComponentName = deriveFormComponentName(fieldName, fieldConfig);

    var wrapperClasses = ['field-form-component'];
    console.log('checking has error');
    if (this.props.fieldHasError(fieldName)) {
      wrapperClasses.push('error');
    }

    return (
      <div className={classString(wrapperClasses)}>
        <label>{fieldConfig.label}</label>
        <p className="field-description">{fieldConfig.description}</p>
        <ComponentName 
          fieldConfig={fieldConfig} 
          isRequired={fieldConfig.required} 
          fieldValue={this.props.fieldFormState}
          handleChange={this.props.handleChange}
        />
      </div>
    )
  }
}

export default FormComponent;