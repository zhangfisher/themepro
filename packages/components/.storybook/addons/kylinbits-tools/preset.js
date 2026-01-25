module.exports = {
    name: 'kylinbits-tools',
    managerEntries: (entry = []) => {
        return [...entry, require.resolve('./manager.js')]
    },
}
