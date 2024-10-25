interface DescribeDomainRecordsRequestArgs {
    domainName: string
}

interface ConfigurationItem {
    accessKeyId?: string
    accessKeySecret?: string
    default?: boolean
}

interface ConfigurationType {
    [key: string]: ConfigurationItem
}
