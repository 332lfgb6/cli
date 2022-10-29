'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

const choices = [
  {
    name: 'vue2（兼容ie）',
    value: 'vue2'
  },
  {
    name: 'vue3（速度快）',
    value: 'vue3'
  },
  {
    name: 'uniapp（app、小程序、网站）',
    value: 'uniapp'
  },
  {
    name: 'wx（微信小程序）',
    value: 'wx'
  },
  {
    name: 'thinkjs（后端）',
    value: 'thinkjs'
  }
]

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('projName', { type: String, required: true })
  }

  prompting() {
    // say hi
    this.log(yosay(`欢迎使用 ${chalk.red('carry-cli')} 创建新项目！`))

    return this.prompt([
      {
        type: 'list',
        name: 'projType',
        message: '选择你要创建的项目类型：',
        choices
      }
    ])
      .then(props => {
        this.props = props
        if (props.projType !== 'wx') {
          return this.prompt([
            {
              type: 'list',
              name: 'install',
              message: '选择你常用的包管理工具：',
              choices: ['npm', 'yarn']
            }
          ])
        }
      })
      .then(props => {
        props && (this.props = { ...props, ...this.props })
      })
  }

  writing() {
    this.fs.copy(this.templatePath(this.props.projType), this.destinationPath(this.options.projName), {
      globOptions: {
        dot: true
      }
    })
  }

  install() {
    if (this.props.projType !== 'wx') {
      const cwd = this.options.projName
      if (this.props.install === 'yarn') {
        this.yarnInstall(null, {}, { cwd })
      } else {
        this.npmInstall(null, {}, { cwd })
      }
    }
  }
}
