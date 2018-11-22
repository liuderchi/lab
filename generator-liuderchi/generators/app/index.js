'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const globby = require('globby');
const slugify = require('slugify');
const promptToProps = require('./src/promptToProps');
const { pad, capitalizeAllWords, camalCase } = require('./src/utils');

let TARGET_FOLDER_NAME = '';
let TEMPLATE_PATHS = []; // NOTE: files under /templates dir in relative path

module.exports = class extends Generator {
  async prompting() {
    this.props = await promptToProps.bind(this).call();
    if (this.props.title) {
      this.props.title = slugify(this.props.title, ' ');
    }
  }

  initConstants() {
    const { title, num } = this.props;
    TARGET_FOLDER_NAME = slugify(`${pad(num, 3)} ${title}`, '-');

    const templateDir = this.templatePath('');
    TEMPLATE_PATHS = globby
      .sync([templateDir], { dot: true })
      .map(p => path.relative(templateDir, p));
  }

  writing() {
    const { title, num } = this.props;
    TEMPLATE_PATHS.forEach(p => {
      this.fs.copyTpl(
        this.templatePath(p),
        this.destinationPath(path.join(TARGET_FOLDER_NAME, p)),
        {
          title: capitalizeAllWords(title),
          titleSlug: slugify(title, '-'),
          num: pad(num, 3),
          funcName: camalCase(title),
        }
      );
    });
  }

  install() {
    if (this.props.install) {
      process.chdir(path.join(process.cwd(), TARGET_FOLDER_NAME));
      this.installDependencies({
        // http://yeoman.io/generator/Generator.html#installDependencies
        bower: false,
        npm: false,
        yarn: true,
      });
    }
  }
};
