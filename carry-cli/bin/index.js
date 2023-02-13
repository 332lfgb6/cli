#!/usr/bin/env node

const chalk = require('chalk')
const program = require('commander')
const yeoman = require('yeoman-environment')

program
  .version(require('../package').version)
  .name('carry')
  .usage('<command>')
  .on('--help', () => {
    console.log()
    console.log(`你正在查看${chalk.cyan('carry-cli的帮助信息')}。`)
    console.log()
  })
  .command('create <project-name>')
  .description('创建一个新的vue2/vue3/微信小程序/uniapp项目')
  .action((projName, options) => {
    const env = yeoman.createEnv()
    env.register(require.resolve('generator-help'), 'help')
    env.run(`help ${projName}`)
  })

program.parse(process.argv)
