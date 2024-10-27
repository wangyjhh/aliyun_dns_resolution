import type { ConfigurationItem, ConfigurationType } from '../types'
import { homedir } from 'node:os'
import { join } from 'node:path'
import process from 'node:process'
import { ensureFileSync, readFileSync, writeFileSync } from 'fs-extra'
import { Client, logf } from '.'

export const configPath = join(homedir(), '.msgr', 'config')

export const tempPath = join(homedir(), '.msgr', 'temp')

export const getConfig = (mode: 'default' | 'all') => {
    ensureFileSync(configPath)
    const configContent = readFileSync(configPath, 'utf-8')
    // 当configContent为空时，直接返回一个空对象
    if (!configContent)
        return {}

    if (mode === 'default') {
        // 当configContent为空对象时，返回一个空对象，否则返回一个default为true的对象
        return Object.values<ConfigurationItem>(JSON.parse(configContent)).filter(item => item.default)[0] ?? {}
    }

    if (mode === 'all') {
        return JSON.parse(configContent) as ConfigurationType
    }
}

export const getDomainsTemp = () => {
    ensureFileSync(tempPath)
    const domainstempContent = readFileSync(tempPath, 'utf-8')
    if (!domainstempContent)
        return {}
    return JSON.parse(domainstempContent)
}

export const setDomainsTemp = (domains: string[]) => {
    const domainstempContent = JSON.stringify({ domains })
    writeFileSync(tempPath, domainstempContent)
}

export const clearDomainsTemp = async () => {
    writeFileSync(tempPath, '')
    logf('Domains cache cleared. Please run the command again.\n', 'warning')
}

export const configIsEmpty = (config: ConfigurationType) => {
    if (Object.keys(config).length === 0) {
        logf(`The accessKey is not configured\n`, 'warning')
        process.exit(0)
    }
}
