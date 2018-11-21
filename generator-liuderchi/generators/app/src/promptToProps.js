const chalk = require('chalk');
const yosay = require('yosay');

const promptToProps /* () => Promise */ = async function() {
  // NOTE require binding this for consumer
  this.log(
    yosay(`Welcome to the ${chalk.red('generator-leetcode')} generator!`)
  );

  // Parse cli arg options
  const { options, args } = this;
  const num = options.num || options.n;
  const name = options.name || args[0];

  const prompts = [
    {
      message: 'Problem number?',
      type: 'input',
      name: 'num',
      default: num || '000',
    },
    {
      message: 'Problem name?',
      type: 'input',
      name: 'name',
      default: name || 'WIP',
    },
  ];

  return this.prompt(prompts);
};

module.exports = promptToProps;
