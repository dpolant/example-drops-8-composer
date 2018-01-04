import React from 'react';
import axios from 'axios';
import FormComponent from './FormComponent';

class App extends React.Component {
  constructor() {
    super();
    this.setFormState = this.setFormState.bind(this);
    this.getFormState = this.getFormState.bind(this);
    this.submitEntityForm = this.submitEntityForm.bind(this);

    this.state = {
      drupalFieldConfig: {},
      node: {},
      formState: {},
      formErrors: []
    }
  }

  getResourceBase(ssl) {
    const domain = window.location.hostname;
    const protocol = !ssl ? 'http://' : 'https://';

    return protocol + domain;
  }

  getDrupalConfigResource(type, entityType, bundle, ssl) {
    let path = '';
    
    // We'll want to support jsonapi extras overrides at some point.
    switch (type) {
      case 'form':
        path = `/jsonapi/entity_form_display/entity_form_display?filter[targetEntityType][value]=${entityType}&filter[bundle][value]=${bundle}`
        break;
      case 'field':
        path = `/jsonapi/field_config/field_config?filter[entity_type][value]=${entityType}&filter[bundle][value]=${bundle}`
        break;
    }

    return this.getResourceBase(ssl) + path;
  }

  componentDidMount() {
    const bundle = drupalSettings.reactCui.bundle;
    const formConfigResource = this.getDrupalConfigResource('form', 'node', bundle);
    const fieldConfigResource = this.getDrupalConfigResource('field', 'node', bundle);
    const nodeResource = this.getResourceBase() + `/jsonapi/node/${bundle}/${drupalSettings.reactCui.uuid}`

    axios.all([
      axios.get(formConfigResource), // 0
      axios.get(fieldConfigResource), // 1
      axios.get(nodeResource) // 2
    ])
    .then(response => {
      // Stitch the responses together in a useful way. For now let's say we only care about
      // user-configured fields.
      const formConfigData = response[0].data.data[0].attributes.content;;
      const fieldConfigResponse = response[1]
      const nodeResponse = response[2];
      
      const drupalFieldConfig = [];
      for (var fieldConfigItem of fieldConfigResponse.data.data) {
        let drupalFieldConfigItem = fieldConfigItem.attributes;
        let fieldName = drupalFieldConfigItem.field_name;
        let formConfigDataItem = formConfigData[fieldName];

        drupalFieldConfigItem.formConfigSettings = {  
          basic: formConfigDataItem.settings,
          thirdParty: formConfigDataItem.third_party_settings,
          type: formConfigDataItem.type
        };

        drupalFieldConfig[fieldName] = drupalFieldConfigItem;
      }
      
      var nodeData = nodeResponse.data.data.attributes;

      // Set initial form state.
      var initFormState = {};
      Object.keys(drupalFieldConfig).map(function(fieldName) {
        // console.log(fieldName);
        // console.log(nodeData);
        if (typeof nodeData[fieldName] !== 'undefined') {
          initFormState[fieldName] = nodeData[fieldName];
        }
      });

      this.setState({
        drupalFieldConfig: drupalFieldConfig,
        node: nodeData,
        formState: initFormState
      });

      console.log(initFormState);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  submitEntityForm(e) {  
    // console.log(this.state.formState);
    var drupalConfig = this.state.drupalFieldConfig;
    var formState = this.state.formState;
    var node = this.state.node;
    var mutations = {};
    var errors = [];

    Object.keys(this.state.formState).map(function(fieldName) {
      // Validate each field value.
      var value = formState[fieldName];
      var result = FormComponent.validate(value, fieldName, drupalConfig[fieldName]);
      
      // Add any errors to our list.
      console.log(result);
      if (typeof result !== 'undefined' && result.status === 'error') {
        errors.push({
          fieldName: fieldName,
          message: result.message,
        });
      }
      else {
        mutations[fieldName] = value;
      }
    });

    if (errors.length > 0) {
      // console.log(errors);
      this.setState({
        formErrors: errors
      });
    }
    else {
      // Update node state.
      console.log(mutations);
      Object.keys(node).map(function(fieldName) {
        if (!typeof mutations[fieldName] === 'undefined') {
          node[fieldName] = mutations[fieldName];
        }
      });
      console.log('updating node');
      this.setState({
        node: node
      });
    }

    console.log(node);
  }

  setFormState(value, fieldname) {
    const formState = this.state.formState;
    formState[fieldname] = value;
    this.setState({ formState });
  }

  getFormState(fieldname) {
    const formState = this.state.formState;
    console.log(formState);

    if (typeof formState[fieldname] !== 'undefined') {
      return formState[fieldname];
    }
  }

  render() {
    return (
      <div className="drupal-field-container">
        {Object.keys(this.state.drupalFieldConfig).map(key => 
          <FormComponent        
            fieldConfig={this.state.drupalFieldConfig[key]}            
            setFormState={this.setFormState}
            getFormState={this.getFormState}
          />
        )}
        <button onClick={(e) => this.submitEntityForm(e)}>Save</button>
      </div>
    );
  }
}

export default App;