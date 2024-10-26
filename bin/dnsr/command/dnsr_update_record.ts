import inquirer from 'inquirer'
import { domainType } from '../../../types'
import { Client, getRecord } from '../../../utils'

export const dnsr_update_record = async () => {
    const { record } = await getRecord()

    const { type, RR, value } = await inquirer.prompt([
        {
            type: 'select',
            loop: false,
            name: 'type',
            message: 'Please enter type.',
            default: record.type,
            choices: domainType,
        },
        {
            type: 'input',
            name: 'RR',
            message: 'Please enter RR.',
            default: record.RR,
        },
        {
            type: 'input',
            name: 'value',
            message: 'Please enter value.',
            default: record.value,
        },
    ])

    await Client.updateDomainRecord({
        recordId: record.recordId,
        type,
        RR,
        value,
    })
}
