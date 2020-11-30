module.exports = {
  devServer: {
    port: '8081',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api': {
        target: 'http://localhost',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      }
    }
  }
}