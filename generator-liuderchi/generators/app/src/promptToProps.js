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
    yosay(`Welcome to the ${chalk.red('generator-liuderchi')} generator!`)
  );
  const prompts = [
    {
      message: 'Which generator you want to run?',
      type: 'list',
      name: 'subGenerator',
      choices: SUBGENERATORS,
      default: 'leetcode',
    },
  ];

  return this.prompt(prompts);
};

module.exports = promptToProps;
