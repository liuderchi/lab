'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const slugify = require('slugify');
const promptToProps = require('./src/promptToProps');
const { pad, capitalizeAllWords, camalCase } = require('./src/utils');

module.exports = class extends Generator {
  async prompting() {
    this.props = await promptToProps.bind(this).call();
    if (this.props.name) {
      this.props.name = slugify(this.props.name, ' ');
    }
  }

  writing() {
    const { name, num } = this.props;
    const projRoot = slugify(`${pad(num, 3)} ${name}`, '-');

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath(path.join(projRoot, '.gitignore'))
    );

    this.fs.copyTpl(
      this.templatePath(path.join('problem', 'index.js')),
      this.destinationPath(path.join(projRoot, 'problem', 'index.js')),
      {
        name: capitalizeAllWords(name),
        nameSlug: slugify(name, '-'),
        num: pad(num, 3),
      }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(path.join(projRoot, 'package.json')),
      {
        nameSlug: slugify(name, '-'),
        num: pad(num, 3),
      }
    );

    this.fs.copyTpl(
      this.templatePath('readme.md'),
      this.destinationPath(path.join(projRoot, 'readme.md')),
      {
        name: capitalizeAllWords(name),
        nameSlug: slugify(name, '-'),
        num: pad(num, 3),
      }
    );

    this.fs.copyTpl(
      this.templatePath('solution.js'),
      this.destinationPath(path.join(projRoot, 'solution.js')),
      {
        name: capitalizeAllWords(name),
        nameSlug: slugify(name, '-'),
        num: pad(num, 3),
        funcName: camalCase(name),
      }
    );

    this.fs.copyTpl(
      this.templatePath('solution.test.js'),
      this.destinationPath(path.join(projRoot, 'solution.test.js')),
      {
        funcName: camalCase(name),
      }
    );
  }

  // Install() {
  //   this.installDependencies({
  //     // http://yeoman.io/generator/Generator.html#installDependencies
  //     bower: false,
  //     npm: false,
  //     yarn: true,
  //   });
  // }
};
