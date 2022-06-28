module.exports = {
    //关闭eslint语法检查
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                // secure: false,
            },
        },
    },
}