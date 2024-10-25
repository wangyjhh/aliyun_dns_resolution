import { log } from 'node:console'
import { Client } from '../utils'

const test1 = async () => {
    const res = await Client.getDomainsList()
    log(res)
}

const test2 = async () => {
    const res = await Client.getDomainRecordsList({ domainName: 'typingfree.top' })
    log(res)
}

test1()
test2()
