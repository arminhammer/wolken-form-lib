'use strict';

class Component {
  constructor(name) {
    this.name = name;
  }
}

class Metadata extends Component {
  constructor(name) {
    super(name);
  }
}

class Parameter extends Component {
  constructor(name, type) {
    super(name);
    this.type = type;
  }
}

class Mapping extends Component {
  constructor(name) {
    super(name);
  }
}

class Condition extends Component {
  constructor(name) {
    super(name);
  }
}

class Resource extends Component {
  constructor(name) {
    super(name);
  }
}

class Output extends Component {
  constructor(name) {
    super(name);
  }
}

/**
 * Representation of a CloudFormation template
 */
class Template {

  /**
   * Constructor for Template.  Currently no parameters are taken.
   */
  constructor(description, templateFormatVersion) {
    templateFormatVersion ? this.AWSTemplateFormatVersion = templateFormatVersion : this.AWSTemplateFormatVersion = "2010-09-09";
    description ? this.Description = description : this.Description = "";
    this.Metadata = {};
    this.Parameters = {};
    this.Mappings = {};
    this.Conditions = {};
    this.Resources = {};
    this.Outputs = {};
  }

  addComponent(component, section, type) {
    if(component instanceof type) section[component.name] = component;
  }

  addMetadata(component) {
    addComponent(component, this.Metadata, Metadata);
  }

  addParameter(component) {
    addComponent(component, this.Parameters, Parameter);
  }

  addMapping(component) {
    addComponent(component, this.Mappings, Mapping);
  }

  addCondition(component) {
    addComponent(component, this.Conditions, Condition);
  }

  addResource(component) {
    addComponent(component, this.Resources, Resource);
  }

  addOutput(component) {
    addComponent(component, this.Outputs, Output);
  }

  /**
   * Build a finished JSON version of the template
   * @returns {Promise}
   */
  build() {
    return new Promise((resolve, reject) => {
      resolve(JSON.stringify(this));
    });
  };

}

export { Template };
