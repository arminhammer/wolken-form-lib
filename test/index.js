'use strict';

import assert from 'assert';
import * as Wolken from '../lib/index';
import AWS from 'aws-sdk';

AWS.config.update({region:'us-east-1'});

var template = new Wolken.Template();

var vpc = new Wolken.Resource('vpc0','AWS::EC2::VPC', {
  "CidrBlock" : "10.0.0.0/16"
});
console.log(vpc);

describe('build', function () {
  it('should be able to call the build function', () => {
    return template.build().then((result) =>  {
      assert.strictEqual(result, '{"AWSTemplateFormatVersion":"2010-09-09"}');
    });
  });
});

describe('build', function () {
  it('The output template should be a valid CF template', () => {
    template.addResource(vpc);
    return template.build().then(function(result) {
      console.log('Result');
      console.log(JSON.stringify(result, null, 2));
      var params = {
        TemplateBody: result
      };
      var cloudformation = new AWS.CloudFormation();
      return cloudformation.validateTemplate(params, (err, data) => {
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
