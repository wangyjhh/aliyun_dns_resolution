export const domainType = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SRV', 'CAA', 'REDIRECT_URL', 'FORWARD_URL']

type DomainType = typeof domainType[number]

export interface DomainRecordArgs {
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

export type AddDomainRecordRequestArgs = DescribeDomainRecordsRequestArgs & DomainRecordArgs

export type UpdateDomainRecordArgs = DeleteDomainRecordArgs & DomainRecordArgs

export type DescribeDomainRecordsResponse = DeleteDomainRecordArgs & DomainRecordArgs & {
    TTL: number
    status: string
}

export interface ConfigurationItem {
    accessKeyId?: string
    accessKeySecret?: string
    default?: boolean
}

export interface ConfigurationType {
    [key: string]: ConfigurationItem
}
