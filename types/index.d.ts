const domainType = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SRV', 'CAA', 'REDIRECT_URL', 'FORWARD_URL']

 type DomainType = typeof domainType[number]

export interface AddDomainRecordRequestArgs {
    domainName: string
    RR: string
    type: DomainType
    value: string
}

export interface UpdateDomainRecordArgs {
    recordId: string
    RR: string
    type: DomainType
    value: string
}

export interface DeleteDomainRecordArgs {
    recordId: string
}

export interface DescribeDomainRecordsRequestArgs {
    domainName: string
}

export interface DescribeDomainRecordsResponse {
    RR: string
    type: DomainType
    value: string
    TTL: number
    status: string
    recordId: string
}

export interface ConfigurationItem {
    accessKeyId?: string
    accessKeySecret?: string
    default?: boolean
}

export interface ConfigurationType {
    [key: string]: ConfigurationItem
}
