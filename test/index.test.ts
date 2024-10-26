import { log } from 'node:console'
import { Client, getRecord } from '../utils'

const test1 = async () => {
    const res = await Client.getDomainsList()
    log(res)
}

const test2 = async () => {
    const res = await Client.getDomainRecordsList({ domainName: 'typingfree.top' })
    log(res)
}

const test3 = async () => {
    const res = await Client.addDomainRecord({
        domainName: 'typingfree.top',
        RR: 'test',
        type: 'A',
        value: '1.1.1.1',
    })
    log(res)
}

const test4 = async () => {
    const res = await Client.deleteDomainRecord({
        recordId: '924826136129871872',
    })
    log(res)
}

const test5 = async () => {
    const res = await Client.updateDomainRecord({
        recordId: '924830480879351808',
        RR: 'test',
        type: 'A',
        value: '1.1.1.2',
    })
    log(res)
}

const test6 = async () => {
    const { record } = await getRecord()
    log(record.recordId)
}

test1()
test2()
// test3()
// test4()
// test5()
test6()
