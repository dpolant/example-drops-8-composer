import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      drupalFieldConfig: {}
    }
  }

  getDrupalConfigResource(type, entityType, bundle, ssl) {
    const domain = window.location.hostname;
    const protocol = !ssl ? 'http://' : 'https://';
    let path = '';

    switch (type) {
      case 'form':
        path = `/jsonapi/entity_form_display/entity_form_display?filter[targetEntityType][value]=${entityType}&filter[bundle][value]=${bundle}`
        break;
      case 'field':
        path = `/jsonapi/field_config/field_config?filter[entity_type][value]=${entityType}&filter[bundle][value]=${bundle}`
    }

    return protocol + domain + path;
  }

  componentDidMount() {
    const bundle = drupalSettings.reactCui.bundle;
    const formConfigResource = this.getDrupalConfigResource('form', 'node', bundle);
    const fieldConfigResource = this.getDrupalConfigResource('field', 'node', bundle);

    axios.all([
      axios.get(formConfigResource),
      axios.get(fieldConfigResource)
    ])
    .then(response => {
      // Stitch the responses together in a useful way. For now let's say we only care about
      // user-configured fields.
      const formConfigData = response[0].data.data[0].attributes.content;;
      const fieldConfigResponse = response[1]
      
      const drupalFieldConfig = [];
      for (var fieldConfigItem of fieldConfigResponse.data.data) {
        let drupalFieldConfigItem = fieldConfigItem.attributes;
        let formConfigDataItem = formConfigData[drupalFieldConfigItem.field_name];

        drupalFieldConfigItem.formConfigSettings = {
          basic: formConfigDataItem.settings,
          thirdParty: formConfigDataItem.third_party_settings
        };

        drupalFieldConfig.push(drupalFieldConfigItem);
      }

      this.setState({drupalFieldConfig});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {  
    return (
      <p>yo</p>
    );
  }
}

export default App;