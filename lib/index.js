'use strict';

class Template {

  constructor() {
    this.AWSTemplateFormatVersion = "2010-09-09";
    this.Description = "";
    this.Parameters = {};
    this.Mappings = {};
    this.Conditions = {};
    this.Resources = {};
    this.Outputs = {};
  }

  build(callback) {
    var templateString = JSON.stringify(this);
    callback(templateString);
  };

}

export { Template };
