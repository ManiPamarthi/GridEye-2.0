const assetsKeys = {
    base: ['assets'] as const,
    getAssets: () => [...assetsKeys.base, 'getAssets'] as const,
    getTopology: () => [...assetsKeys.base, 'getTopology'] as const,
}
export default assetsKeys;