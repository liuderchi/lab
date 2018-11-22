'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const slugify = require('slugify');
const promptToProps = require('./src/promptToProps');
const { pad, capitalizeAllWords, camalCase } = require('./src/utils');

module.exports = class extends Generator {
  async prompting() {
    this.props = await promptToProps.bind(this).call();
    if (this.props.title) {
      this.props.title = slugify(this.props.title, ' ');
    }
  }

  writing() {
    const { title, num } = this.props;
    const projRoot = slugify(`${pad(num, 3)} ${title}`, '-');

    const resources = [
      '.gitignore',
      path.join('problem', 'index.js'),
      'package.json',
      'readme.md',
      'solution.js',
      'solution.test.js',
    ];
    resources.forEach(p => {
      this.fs.copyTpl(
        this.templatePath(p),
        this.destinationPath(path.join(projRoot, p)),
        {
          title: capitalizeAllWords(title),
          titleSlug: slugify(title, '-'),
          num: pad(num, 3),
          funcName: camalCase(title),
        }
      );
    });
  }

  Install() {
    if (this.props.install) {
      const { title, num } = this.props;
      const projRoot = slugify(`${pad(num, 3)} ${title}`, '-');
      process.chdir(path.join(process.cwd(), projRoot));
      this.installDependencies({
        // http://yeoman.io/generator/Generator.html#installDependencies
        bower: false,
        npm: false,
        yarn: true,
      });
    }
  }
};
