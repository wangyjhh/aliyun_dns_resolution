export interface DescribeDomainRecordsRequestArgs {
    domainName: string
}
interface ConfigurationItem {
    accessKeyId?: string
    accessKeySecret?: string
    default?: boolean
}

// eslint-disable-next-line unused-imports/no-unused-vars
interface ConfigurationType {
    [key: string]: ConfigurationItem
}
