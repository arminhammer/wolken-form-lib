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
  constructor(name, type, properties) {
    super(name);
    this.body = {
      Type: type,
      Properties: properties
    }
  }
}

class Output extends Component {
  constructor(name) {
    super(name);
  }
}

/*
class AWS_EC2_EIP extends Resource {
  constructor(name) {
    super(name);
  }
}
*/

/**
 * Representation of a CloudFormation template
 */
class Template {

  /**
   * Constructor for Template.  Currently no parameters are taken.
   */
  constructor(templateFormatVersion, description) {
    templateFormatVersion ? this.AWSTemplateFormatVersion = templateFormatVersion : this.AWSTemplateFormatVersion = "2010-09-09";
    description ? this.Description = description : this.Description = null;
    this.Metadata = new Map();
    this.Parameters = new Map();
    this.Mappings = new Map();
    this.Conditions = new Map();
    this.Resources = new Map();
    this.Outputs = new Map();
  }

  addComponent(component, section, type) {
    if(component instanceof type) section.set(component.name, component);
  }

  addMetadata(component) {
    this.addComponent(component, this.Metadata, Metadata);
  }

  addParameter(component) {
    this.addComponent(component, this.Parameters, Parameter);
  }

  addMapping(component) {
    this.addComponent(component, this.Mappings, Mapping);
  }

  addCondition(component) {
    this.addComponent(component, this.Conditions, Condition);
  }

  addResource(component) {
    this.addComponent(component, this.Resources, Resource);
  }

  addOutput(component) {
    this.addComponent(component, this.Outputs, Output);
  }

  /**
   * Build a finished JSON version of the template
   * @returns {Promise}
   */
  build() {
    return new Promise((resolve, reject) => {

      var output = {
        AWSTemplateFormatVersion: this.AWSTemplateFormatVersion
      };

      if(this.Description) {
        output.Description = this.Description
      }

      if(this.Resources.size > 0) {
        output.Resources = {};
        this.Resources.forEach((value, key) => {
          output.Resources[key] = value.body
        })
      }

      resolve(JSON.stringify(output));

    });
  };

}

export {
  Template,
  Component,
  Metadata,
  Parameter,
  Mapping,
  Condition,
  Resource,
  Output
};
