import inquirer from 'inquirer'
import { Client, getRecordId } from '../../../utils'

export const dnsr_delete_record = async () => {
    const { recordId } = await getRecordId()

    const { confirm } = await inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: `Are you sure you want to remove this record ?`,
        default: false,
    })

    if (confirm) {
        await Client.deleteDomainRecord({
            recordId,
        })
    }
}
