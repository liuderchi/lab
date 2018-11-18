'use strict';
const Generator = require('yeoman-generator');
// Const promptToProps = require('./src/promptToProps');

module.exports = class extends Generator {
  async prompting() {
    // This.props = await promptToProps.bind(this).call();
  }

  writing() {
    // Const { name } = this.props;
    const projRoot = '123_TODO_FOO';
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
