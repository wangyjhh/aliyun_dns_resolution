import columnify from 'columnify'
import { Client, getDomain, logf } from '../../../utils'

export const dnsr_query_records = async () => {
    const { domain } = await getDomain()

    const res = await Client.getDomainRecordsList({
        domainName: domain,
    })

    const regRR = /^_/g

    const domainRecords = res.map((record) => {
        return {
            RR: record.RR!,
            type: record.type!,
            value: record.value!,
            TTL: record.TTL!,
            status: record.status!,
        }
    }).filter(record => !(record.RR.match(regRR)))

    logf(`${columnify(domainRecords)}`, 'success')
}
