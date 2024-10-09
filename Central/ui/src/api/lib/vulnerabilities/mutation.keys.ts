const vulnerabilitiesKeys = {
    base:['vulnerabilities_mutate'] as const,
    addVulnerabilities: () => [...vulnerabilitiesKeys.base, 'addVulnerabilities'] as const,
};
export default vulnerabilitiesKeys;