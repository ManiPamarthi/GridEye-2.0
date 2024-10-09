const authKeys = {
    base:['auth_mutate'] as const,
    login: () => [...authKeys.base, 'login'] as const,
};
export default authKeys;