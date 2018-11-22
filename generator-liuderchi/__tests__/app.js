'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-liuderchi:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      subGenerator: 'leetcode',
    });
  });

  it('redirects to sub-generator', () => {
    const RES_FOLDER = '000-untitled-problem';
    const RES_FILES = [
      path.join('problem', 'index.js'),
      '.gitignore',
      'package.json',
      'readme.md',
      'solution.js',
      'solution.test.js',
    ];
    assert.file(RES_FILES.map(p => path.join(RES_FOLDER, p)));
    assert.noFile(
      path.join(RES_FOLDER, 'node_modules', 'react', 'package.json')
    );
  });
});
