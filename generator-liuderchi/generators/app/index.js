'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the supreme ${chalk.red('generator-liuderchi')} generator!`
      )
    );

    // Parse cli arg options
    const {
      options,
      args: [name],
    } = this;
    const type = options.type || options.t;
    console.warn({ name, type });

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Package Name?',
        default: name || 'my-package',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Package Type?',
        choices: [
          'cli',
          'lib',
          // 'web'
        ],
        default: type || 'cli',
      },
    ];

    this.props = await this.prompt(prompts);
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
