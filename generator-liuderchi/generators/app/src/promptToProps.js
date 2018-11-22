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
      default: name || 'untitled problem',
    },
    {
      type: 'confirm',
      name: 'install',
      message:
        'Would you like to install npm dependency after scaffold is created?',
      default: false,
    },
  ];

  return this.prompt(prompts);
};

module.exports = promptToProps;
