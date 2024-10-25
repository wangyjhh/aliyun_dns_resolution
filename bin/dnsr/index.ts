#!/usr/bin/env node
import process from 'node:process'
import commander, { Command } from 'commander'
import pkg from '../../package.json'
import { logv } from '../../utils/index'
import {
    dnsr_query_records,
    msgr_add_rules,
    msgr_config,
    msgr_modify_rules,
    msgr_remove_rules,
} from './command'

const program = new Command()

program
    .name('dnsr')
    .addHelpText(
        'after',
        `
Example:
  $ dnsr config set
  $ dnsr config get
  $ dnsr config remove
  $ dnsr config clear
  $ dnsr config default
  $ dnsr list or dnsr ls
  $ dnsr add or dnsr ad or dnsr insert
  $ dnsr remove or dnsr rm or dnsr delete
  $ dnsr modify or dnsr mo or dnsr edit
  `,
    )
    .description('Alibaba Cloud Domain Records management tool.')

program.showHelpAfterError('(add -h or --help for additional information)')

// 设置accessKey
program
    .command('config')
    .addHelpText(
        'after',
        '\nExample:\n  $ dnsr config set\n  $ dnsr config get\n  $ dnsr config remove\n  $ dnsr config clear\n  $ dnsr config default\n',
    )
    .addArgument(new commander.Argument('<tpye>', 'Config type. [set][get][default][remove][clear]'))
    .description('Configuration')
    .action(msgr_config)

// 查看域名解析记录
program.command('list').aliases(['ls']).description('Review the domain records.').action(dnsr_query_records)
// 新增安全组规则
program.command('add').aliases(['ad', 'insert']).description('Add the domain records.').action(msgr_add_rules)
// 删除安全组规则
program.command('remove').aliases(['rm', 'delete']).description('Remove the domain records.').action(msgr_remove_rules)
// 修改安全组规则
program.command('modify').aliases(['mo', 'edit']).description('Modify the domain records.').action(msgr_modify_rules)

program.version(logv(pkg.version), '-v, --version', 'Output version number.')

program.parse(process.argv)

// 处理ctrl+c
process.on('exit', () => {
    process.exit(0)
})
