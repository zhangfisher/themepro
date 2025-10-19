function getThemePro() {
    try {
        const iframe = document.getElementById('storybook-preview-iframe')
        return iframe.contentWindow.ThemePro
    } catch (err) {
        console.error('获取预览区ThemePro失败', err)
    }
}
module.exports = {
    getThemePro,
}
