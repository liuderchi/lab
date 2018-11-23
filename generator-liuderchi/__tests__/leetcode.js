'use strict';
const path = require('path');
const fs = require('fs');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('sub-generator liuderchi:leetcode', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/leetcode'))
      .withPrompts({
        num: '39',
        title: ' combination sum ',
        install: false,
      });
  });

  it('creates files', () => {
    const RES_FOLDER = '039-combination-sum';
    const RES_FILES = [
      path.join('problem', 'index.js'),
      '.gitignore',
      'package.json',
      'readme.md',
      'sandbox.config.json',
      'solution.js',
      'solution.test.js',
    ];
    assert.file(RES_FILES.map(p => path.join(RES_FOLDER, p)));
    assert.noFile(
      path.join(RES_FOLDER, 'node_modules', 'react', 'package.json')
    );

    RES_FILES.forEach(p => {
      assert.equal(
        fs
          .readFileSync(path.join(RES_FOLDER, p), { encoding: 'utf8' })
          .match(/<%-.+%>/g),
        null
      );
    });

    assert.textEqual(
      fs
        .readFileSync(path.join(RES_FOLDER, 'readme.md'), { encoding: 'utf8' })
        .split('\n')[0],
      '# 039 Combination Sum'
    );
    assert.textEqual(
      JSON.parse(
        fs.readFileSync(path.join(RES_FOLDER, 'package.json'), {
          encoding: 'utf8',
        })
      ).name,
      RES_FOLDER
    );
  });
});
