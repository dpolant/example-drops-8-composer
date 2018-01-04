var Constants = {
  getResourceBase: function(ssl) {
    const domain = window.location.hostname;
    const protocol = !ssl ? 'http://' : 'https://';

    return protocol + domain;
  },
  getDrupalConfigResource: function(type, entityType, bundle, ssl) {
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
  },
  /**
   * The node/entity bundle.
   */
  bundle: drupalSettings.reactCui.bundle,
  /**
   * The node/entity uuid.
   */
  nodeUuid: drupalSettings.reactCui.uuid,
  getResources: function() {
    return {
      formConfig: this.getDrupalConfigResource('form', 'node', this.bundle),
      fieldConfig: this.getDrupalConfigResource('field', 'node', this.bundle),
      node: this.getResourceBase() + `/jsonapi/node/${this.bundle}/${this.nodeUuid}`
    }
  }
}

export default Constants;