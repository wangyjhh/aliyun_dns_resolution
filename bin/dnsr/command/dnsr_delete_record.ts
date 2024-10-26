import inquirer from 'inquirer'
import { Client, getRecord } from '../../../utils'

export const dnsr_delete_record = async () => {
    const { record } = await getRecord()

    const { confirm } = await inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: `Are you sure you want to delete this record ?`,
        default: false,
    })

    if (confirm) {
        await Client.deleteDomainRecord({
            recordId: record.recordId,
        })
    }
}
