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
    static createClient(endpoint: string): DNS {
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
        // Endpoint 请参考 https://api.aliyun.com/product/Ecs
        config.endpoint = endpoint
        return new DNS(config)
    }

    /**
     * @remarks
     * 获取DNS解析记录列表
     * @returns any
     */
    static async getSecurityGroupId(endpoint: string, args: DescribeDomainRecordsRequestArgs): Promise<any> {
        const client = Client.createClient(endpoint)
        const request = new $DNS.DescribeDomainRecordsRequest(args)
        const runtime = new $Util.RuntimeOptions({})
        try {
            // 复制代码运行请自行打印 API 的返回值
            const group = (await client.describeSecurityGroupsWithOptions(request, runtime)).body?.securityGroups?.securityGroup
            return group?.map((item: any) => item.securityGroupId)
        }
        catch (error: any) {
            // 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
            // 错误 message
            logf(`${error.data.Message}\n`, 'error', 'ERROR')
            process.exit(1)
            // 诊断地址
            // console.log(error.data["Recommend"])
        }
    }

    /**
     * @remarks
     * 获取安全组规则信息
     * @returns any
     */

    /**
     * @remarks
     * 获取安全组规则ID
     * @returns any
     */

    /**
     * @remarks
     * 添加入方向安全组规则
     * @returns any
     */

    /**
     * @remarks
     * 删除入方向安全组规则
     * @returns any
     */

    /**
     * @remarks
     * 修改北京安全组规则
     * @param endpoint 参数
     * @param args 参数
     * @returns any
     */
}
