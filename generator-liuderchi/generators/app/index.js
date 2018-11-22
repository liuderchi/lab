'use strict';
const Generator = require('yeoman-generator');
const promptToProps = require('./src/promptToProps');

module.exports = class extends Generator {
  async prompting() {
    this.props = await promptToProps.bind(this).call();
  }

  redirectToSubGenerator() {
    const { subGenerator } = this.props;
    const { args, options } = this;

    this.composeWith(require.resolve(`../${subGenerator}`), {
      // NOTE options
      arguments: args, // NOTE options.arguments -> this.args
      cliOptions: options, // NOTE special field to pass cli option to sub-gen
    });
  }
};
