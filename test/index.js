'use strict';

import assert from 'assert';
import * as Wolken from '../lib/index';
import AWS from 'aws-sdk';

var template = new Wolken.Template();

describe('build', function () {
  it('should be able to call the build function', function () {
    return template.build().then(function(result) {
      assert.strictEqual(result, '{"AWSTemplateFormatVersion":"2010-09-09","Description":"","Metadata":{},"Parameters":{},"Mappings":{},"Conditions":{},"Resources":{},"Outputs":{}}');
    });
  });
});

describe('build', function () {
  it('The output template should be a valid CF template', function () {
    return template.build().then(function(result) {
      var params = {
        TemplateBody: result
      };
      var cloudformation = new AWS.CloudFormation();
      return cloudformation.validateTemplate(params, function(err, data) {
        if(err) {
          console.log(err);
          return assert(false, 'The template did not validate.');
        }
        if(data)  {
          console.log(data);
          return assert(true, 'The template validated.');
        }
      });
    });
  });
});
