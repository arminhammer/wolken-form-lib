'use strict';

/**
 * Representation of a CloudFormation template
 */
class Template {

  /**
   * Constructor for Template.  Currently no parameters are taken.
   */
  constructor() {
    this.AWSTemplateFormatVersion = "2010-09-09";
    this.Description = "";
    this.Parameters = {};
    this.Mappings = {};
    this.Conditions = {};
    this.Resources = {};
    this.Outputs = {};
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
