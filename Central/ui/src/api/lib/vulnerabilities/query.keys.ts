const vulnerabilitiesKeys = {
    base: ['vulnerabilities'] as const,
    getVulnerabilities: (size:number, from:number) => [...vulnerabilitiesKeys.base, 'getVulnerabilities'] as const,
    getStats:() => [...vulnerabilitiesKeys.base, 'getStats'] as const,
}
export default vulnerabilitiesKeys;