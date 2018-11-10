'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the supreme ${chalk.red('generator-liuderchi')} generator!`
      )
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true,
      },
      {
        type: 'input',
        name: 'fileName',
        message: 'Example File Name?',
        default: 'foobar',
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const { fileName } = this.props;
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
      this.destinationPath(`${fileName}.txt`),
      {
        fileName,
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
