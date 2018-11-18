const chalk = require('chalk');
const yosay = require('yosay');

const promptToProps /* () => Promise */ = async function() {
  // NOTE require binding this for consumer

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

  return this.prompt(prompts);
};

module.exports = promptToProps;
