module.exports = {
  eslint: {
    dirs: ['pages', 'lib', 'components'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/posts/:id', // 参数前面加：
  //       destination: '/post404',
  //     },
  //   ]
  // },
}