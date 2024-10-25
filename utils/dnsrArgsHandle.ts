import process from 'node:process'
import columnify from 'columnify'
import inquirer from 'inquirer'
import { Client, logf } from '.'

export const getDomain = async () => {
    const domainsList = await Client.getDomainsList()

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

export const getRecordId = async () => {
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
            value: record.recordId,
        }
    })

    const { recordId } = await inquirer.prompt([
        {
            type: 'list',
            loop: false,
            name: 'recordId',
            message: 'Select the record that needs to be modified.',
            choices: domainRecords,
        },
    ])
    return { recordId }
}
