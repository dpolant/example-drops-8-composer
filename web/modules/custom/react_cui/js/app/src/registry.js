import LinkDefault from './components/form-components/LinkDefault';
import TextTextArea from './components/form-components/TextTextArea';

const componentMapping = {
  link_default: {
    component: LinkDefault
  },
  'text_textarea': {
    'component': TextTextArea
  }
}

export function deriveFormComponentName(fieldName, fieldConfig) {
  // Derive a suitable sub-component.
  const fieldFormType = fieldConfig.formConfigSettings.type;

  if (typeof componentMapping[fieldFormType] === 'undefined') {
    console.log(`Field ${fieldFormType} is not supported.`);
    return null;
  }

  var ComponentName = componentMapping[fieldFormType].component;

  return ComponentName;
}
