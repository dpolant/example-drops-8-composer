import React from 'react';
import LinkDefault from './form-components/LinkDefault';
import TextTextArea from './form-components/TextTextArea';

class FormComponent extends React.Component {
  // There's hopefully a better way to do this discovery.
  getComponentRegistry() {
    return {
      link_default: {
        component: LinkDefault
      },
      'text_textarea': {
        'component': TextTextArea
      }
    }
  }

  static validate() {
    console.log('validating');
  }

  render() {
    const fieldConfig = this.props.fieldConfig;

    // Derive a suitable sub-component.
    const componentRegistry = this.getComponentRegistry();
    const fieldFormType = fieldConfig.formConfigSettings.type;
    

    if (typeof componentRegistry[fieldFormType] === 'undefined') {
      console.log(`Field ${fieldFormType} is not supported.`);
      return null;
    }

    const fieldName = fieldConfig.field_name;
    var ComponentName = componentRegistry[fieldFormType].component;

    return (
      <div className="field-form-component">
        <label>{fieldConfig.label}</label>
        <p className="field-description">{fieldConfig.description}</p>
        <ComponentName fieldConfig={fieldConfig} isRequired={fieldConfig.required} fieldValue={this.props.node[fieldName]}/>
      </div>      
    )
  }
}

export default FormComponent;