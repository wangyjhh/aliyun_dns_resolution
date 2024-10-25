import inquirer from 'inquirer'
import { domainType } from '../../../types'
import { Client, getDomain } from '../../../utils'

export const dnsr_add_record = async () => {
    const { domain } = await getDomain()
    const { type, RR, value } = await inquirer.prompt([
        {
            type: 'select',
            loop: false,
            name: 'type',
            message: 'Please enter type.',
            default: 'A',
            choices: domainType,
        },
        {
            type: 'input',
            name: 'RR',
            message: 'Please enter RR.',
            default: 'www',
        },
        {
            type: 'input',
            name: 'value',
            message: 'Please enter value.',
            default: '1.1.1.1',
        },
    ])

    await Client.addDomainRecord({
        domainName: domain,
        type,
        RR,
        value,
    })
}
