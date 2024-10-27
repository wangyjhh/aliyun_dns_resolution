import process from 'node:process'
import columnify from 'columnify'
import inquirer from 'inquirer'
import { Client, logf } from '.'

export const getDomain = async () => {
    const domainsList = await Client.getDomainsListCache()

    if (domainsList.length === 0) {
        logf('There is no domains in you account.\n', 'warning', 'WARNING')
        process.exit(0)
    }

    const { domain } = await inquirer.prompt([
        {
            type: 'list',
            loop: false,
            name: 'domain',
            message: 'Select a domain.',
            choices: domainsList,
        },
    ])

    return { domain }
}

export const getRecord = async () => {
    const { domain } = await getDomain()

    const res = await Client.getDomainRecordsList({
        domainName: domain,
    })

    const regRR = /^_/g

    const domainRecords = res.filter(record => !(record.RR.match(regRR))).map((record) => {
        return {
            name: `${columnify(
                [
                    {
                        RR: record.RR!,
                        type: record.type!,
                        value: record.value!,
                        TTL: record.TTL!,
                        status: record.status!,
                    },
                ],
                {
                    showHeaders: false,
                    config: {
                        RR: { minWidth: 6, maxWidth: 6 },
                        type: { minWidth: 12, maxWidth: 12 },
                        value: { minWidth: 15, maxWidth: 15 },
                        TTL: { minWidth: 4, maxWidth: 4 },
                        status: { minWidth: 6, maxWidth: 6 },
                    },
                },
            )}`,
            value: {
                recordId: record.recordId,
                RR: record.RR,
                type: record.type,
                value: record.value,
            },
        }
    })

    const { record } = await inquirer.prompt([
        {
            type: 'list',
            loop: false,
            name: 'record',
            message: 'Select the record that needs to be updated.',
            choices: domainRecords,
        },
    ])
    return { record }
}
