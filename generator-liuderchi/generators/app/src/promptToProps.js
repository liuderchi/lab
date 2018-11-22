const chalk = require('chalk');
const yosay = require('yosay');

const SUBGENERATORS = [
  'leetcode',
  // 'cli',
  // 'lib',
  // 'web'
];

const promptToProps /* () => Promise */ = async function() {
  this.log(
    yosay(`Welcome to the ${chalk.hex('#00dddd')('liuderchi')} generator!`)
  );
  const prompts = [
    {
      message: 'What kind of boilerplate you want to create?',
      type: 'list',
      name: 'subGenerator',
      choices: SUBGENERATORS,
      default: 'leetcode',
    },
  ];

  return this.prompt(prompts);
};

module.exports = promptToProps;
