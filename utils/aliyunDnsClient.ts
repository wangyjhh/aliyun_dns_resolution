import type {
    AddDomainRecordRequestArgs,
    ConfigurationType,
    DeleteDomainRecordArgs,
    DescribeDomainRecordsRequestArgs,
    DescribeDomainRecordsResponse,
    UpdateDomainRecordArgs,
} from '../types'
import process from 'node:process'
import DNS, * as $DNS from '@alicloud/alidns20150109'
import * as $OpenApi from '@alicloud/openapi-client'
import * as $Util from '@alicloud/tea-util'
import { configIsEmpty, getConfig, logf } from '.'

export class Client {
    /**
     * @remarks
     * 使用AK&SK初始化账号Client
     * @returns Client
     *
     * @throws Exception
     */
    static createClient(): DNS {
        // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考。
        // 建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html。
        const AccessKeyConfig = getConfig('default') as ConfigurationType
        configIsEmpty(AccessKeyConfig)

        const config = new $OpenApi.Config({
            // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
            accessKeyId: AccessKeyConfig.accessKeyId,
            // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
            accessKeySecret: AccessKeyConfig.accessKeySecret,
        })
        return new DNS(config)
    }

    /**
     * @remarks
     * 获取域名列表
     * @returns string[]
     */
    static async getDomainsList(args = {}): Promise<string[]> {
        const client = Client.createClient()
        const request = new $DNS.DescribeDomainsRequest(args)
        const runtime = new $Util.RuntimeOptions({})
        try {
            const list = (await client.describeDomainsWithOptions(request, runtime)).body?.domains?.domain
            if (!list) {
                return []
            }
            return list.map((item: $DNS.DescribeDomainsResponseBodyDomainsDomain) => item.domainName!)
        }
        catch (error: any) {
            logf(`${error.data.Message}\n`, 'error', 'ERROR')
            process.exit(1)
        }
    }

    /**
     * @remarks
     * 获取域名解析记录列表
     * @returns any
     */
    static async getDomainRecordsList(args: DescribeDomainRecordsRequestArgs): Promise<DescribeDomainRecordsResponse[]> {
        const client = Client.createClient()
        const request = new $DNS.DescribeDomainRecordsRequest(args)
        const runtime = new $Util.RuntimeOptions({})
        try {
            const list = (await client.describeDomainRecordsWithOptions(request, runtime)).body?.domainRecords?.record
            if (!list) {
                return []
            }
            return list.map((item) => {
                return {
                    RR: item.RR!,
                    type: item.type!,
                    value: item.value!,
                    TTL: item.TTL!,
                    status: item.status!,
                    recordId: item.recordId!,
                }
            })
        }
        catch (error: any) {
            logf(`${error.data.Message}\n`, 'error', 'ERROR')
            process.exit(1)
        }
    }

    /**
     * @remarks
     * 添加域名解析记录
     * @returns any
     */
    static async addDomainRecord(args: AddDomainRecordRequestArgs): Promise<any> {
        const client = Client.createClient()
        const request = new $DNS.AddDomainRecordRequest(args)
        const runtime = new $Util.RuntimeOptions({})
        try {
            const response = (await client.addDomainRecordWithOptions(request, runtime))
            if (response.statusCode === 200)
                logf('The domain record was added successfully.\n', 'success')
            return response
        }
        catch (error: any) {
            logf(`${error.data.Message}\n`, 'error', 'ERROR')
            process.exit(1)
        }
    }

    /**
     * @remarks
     * 删除域名解析记录
     * @returns any
     */
    static async deleteDomainRecord(args: DeleteDomainRecordArgs): Promise<any> {
        const client = Client.createClient()
        const request = new $DNS.DeleteDomainRecordRequest(args)
        const runtime = new $Util.RuntimeOptions({})
        try {
            const response = (await client.deleteDomainRecordWithOptions(request, runtime))
            if (response.statusCode === 200)
                logf('The domain record was deleted successfully.\n', 'success')
            return response
        }
        catch (error: any) {
            logf(`${error.data.Message}\n`, 'error', 'ERROR')
            process.exit(1)
        }
    }

    /**
     * @remarks
     * 修改域名解析记录
     * @returns any
     */
    static async updateDomainRecord(args: UpdateDomainRecordArgs): Promise<any> {
        const client = Client.createClient()
        const request = new $DNS.UpdateDomainRecordRequest(args)
        const runtime = new $Util.RuntimeOptions({})
        try {
            const response = (await client.updateDomainRecordWithOptions(request, runtime))
            if (response.statusCode === 200)
                logf('The domain record was updated successfully.\n', 'success')
            return response
        }
        catch (error: any) {
            logf(`${error.data.Message}\n`, 'error', 'ERROR')
            process.exit(1)
        }
    }
}
