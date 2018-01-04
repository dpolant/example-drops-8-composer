// Packages
import React from 'react';
import axios from 'axios';

// Components
import FormComponent from './FormComponent';
import Messages from './Messages';

// Helpers
import Constants from '../constants'

class App extends React.Component {
  constructor() {
    super();
    this.setFormState = this.setFormState.bind(this);
    this.getFormState = this.getFormState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitEntityForm = this.submitEntityForm.bind(this);

    this.state = {
      drupalFieldConfig: {},
      node: {},
      formState: {},
      messages: []
    }
  }

  componentDidMount() {
    const resources = Constants.getResources();

    axios.all([
      axios.get(resources.formConfig), // 0
      axios.get(resources.fieldConfig), // 1
      axios.get(resources.node) // 2
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

  /**
   * Clear all messages in state.
   */
  clearMessages() {
    this.setState({
      messages: []
    })
  }

  /**
   * Submit the entity form and save the node/entity.
   * 
   * @param {object} e 
   *   An onSubmit event object.
   */
  submitEntityForm(e) {  
    // console.log(this.state.formState);
    var drupalConfig = this.state.drupalFieldConfig;
    var formState = this.state.formState;
    var node = this.state.node;
    var mutations = {};
    var errors = [];

    this.clearMessages();

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
        messages: errors
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

      // Update node state.
      // this.setState({
      //   node: node
      // });

      // Send the mutations back to Drupal.
      var payload = {
        data: {
          id: node.uuid,
          attributes: mutations,
          type: Constants.bundle,
        }
      };

      console.log(payload);

      var nodePath = Constants.getResources().node;
      var serializedPayload = JSON.stringify(payload);
      var requestConfig = {
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        }
      }

      axios.patch(nodePath, serializedPayload, requestConfig)
      .then(response => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  /**
   * Set the formstate for a node/entity field.
   * 
   * @param {object} value 
   *   A field value to be set in the form state.
   * @param {string} fieldname 
   *   The name of a node/entity field.
   */
  setFormState(value, fieldname) {
    const formState = this.state.formState;
    formState[fieldname] = value;
    this.setState({ formState });
  }

  /**
   * Get the form state value for a node/entity field.
   * 
   * @param {string} fieldname
   *   The name of a node/entity field.
   * 
   * @return {object}
   *   The field value in the form state.
   */
  getFormState(fieldname) {
    const formState = this.state.formState;
    console.log(formState);

    if (typeof formState[fieldname] !== 'undefined') {
      return formState[fieldname];
    }
  }

  /**
   * Handle transfering a non-scalar value change from an event object into the form state.
   * 
   * This is one of the methods that Form Components may use to keep the form state up to
   * date with their changes.
   * 
   * @param {object} event 
   *   An DOM change event.
   * @param {*} fieldname
   *   A field on the node/entity.
   * @param A field property on the provided node/entity field.
   */
  handleChange(event, fieldname, property) {
    var fieldFormState = this.getFormState(fieldname);
    fieldFormState[property] = event.target.value

    this.setFormState(fieldFormState, fieldname);
  }

  render() {
    return (
      <div className="drupal-field-container">
        <Messages messages={this.state.messages} />
        {Object.keys(this.state.drupalFieldConfig).map(fieldname => 
          <FormComponent        
            fieldConfig={this.state.drupalFieldConfig[fieldname]}
            handleChange={this.handleChange}
            fieldFormState={this.state.formState[fieldname]}
          />
        )}
        <button onClick={(e) => this.submitEntityForm(e)}>Save</button>
      </div>
    );
  }
}

export default App;