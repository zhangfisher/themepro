module.exports = {
    name: 'themepro-tools',
    managerEntries: (entry = []) => {
        return [...entry, require.resolve('./manager.js')]
    },
}
