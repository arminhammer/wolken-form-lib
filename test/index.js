'use strict';

import assert from 'assert';
import * as Wolken from '../lib/index';

console.log('Creating template...');
var template = new Wolken.Template();
console.log('Created.');

describe('functions', function () {
  it('should be able to call a function', function () {
    template.build(function(result) {
      assert.equal('{"AWSTemplateFormatVersion":"2010-09-09","Description":"","Parameters":{},"Mappings":{},"Conditions":{},"Resources":{},"Outputs":{}}', result);
    });
  });
});

