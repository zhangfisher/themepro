module.exports = {
  name: 'preview-doc-grabber',
  managerEntries: (entry = []) => {
    return [...entry, require.resolve('./manager.js')];
  },
};
