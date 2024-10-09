const assetsKeys = {
    base:['assets_mutate'] as const,
    addAssets: () => [...assetsKeys.base, 'addAssets'] as const,
    updateAssets: () => [...assetsKeys.base, 'updateAssets'] as const,
};
export default assetsKeys;