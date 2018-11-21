'use strict';
const Generator = require('yeoman-generator');
const slugify = require('slugify');
const promptToProps = require('./src/promptToProps');
const { pad } = require('./src/utils');

module.exports = class extends Generator {
  async prompting() {
    this.props = await promptToProps.bind(this).call();
  }

  writing() {
    const { name, num } = this.props;
    const projRoot = slugify(`${pad(num, 3)} ${name}`, '-');

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath(`${projRoot}/.gitignore`)
    );

    // https://github.com/sboudrias/mem-fs-editor#copytplfrom-to-context-templateoptions--copyoptions
    // this.fs.copyTpl(
    //   this.templatePath('dummyfileWithTpl.txt'),
    //   this.destinationPath(`${name}.txt`),
    //   {
    //     name,
    //   }
    // );
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
