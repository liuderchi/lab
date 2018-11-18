'use strict';
const Generator = require('yeoman-generator');
const promptToProps = require('./src/promptToProps');

module.exports = class extends Generator {
  async prompting() {
    this.props = await promptToProps.bind(this).call();
  }

  writing() {
    const { name } = this.props;
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
    this.fs.copy(
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    );
    // https://github.com/sboudrias/mem-fs-editor#copytplfrom-to-context-templateoptions--copyoptions
    this.fs.copyTpl(
      this.templatePath('dummyfileWithTpl.txt'),
      this.destinationPath(`${name}.txt`),
      {
        name,
      }
    );
  }

  install() {
    this.installDependencies({
      // http://yeoman.io/generator/Generator.html#installDependencies
      bower: false,
      npm: false,
      yarn: true,
    });
  }
};
