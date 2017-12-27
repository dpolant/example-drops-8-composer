import React from 'react';
import axios from 'axios';
import FormComponent from './FormComponent';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      drupalFieldConfig: {},
      node: {}
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
      axios.get(formConfigResource),
      axios.get(fieldConfigResource),
      axios.get(nodeResource)
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
        let formConfigDataItem = formConfigData[drupalFieldConfigItem.field_name];

        drupalFieldConfigItem.formConfigSettings = {
          basic: formConfigDataItem.settings,
          thirdParty: formConfigDataItem.third_party_settings,
          type: formConfigDataItem.type
        };

        drupalFieldConfig.push(drupalFieldConfigItem);
      }
      
      this.setState({
        drupalFieldConfig: drupalFieldConfig,
        node: nodeResponse.data.data.attributes
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  saveRootEntityToDrupal() {

  }

  render() {
    return (
      <div className="drupal-field-container">
        {Object.keys(this.state.drupalFieldConfig).map(key => 
          <FormComponent fieldConfig={this.state.drupalFieldConfig[key]} node={this.state.node}/>
        )}
        <button onClick={() => this.saveRootEntityToDrupal()}>Save</button>
      </div>
    );
  }
}

export default App;