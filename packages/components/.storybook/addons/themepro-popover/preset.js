module.exports = {
  name: 'preview-popover-tool',
  managerEntries: (entry = []) => {
    return [...entry, require.resolve('./manager.js')];
  },
};
