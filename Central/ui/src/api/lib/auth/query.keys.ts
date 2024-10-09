const authKeys = {
    base: ['auth'] as const,
    logout: () => [...authKeys.base, 'logout'] as const,
}
export default authKeys;