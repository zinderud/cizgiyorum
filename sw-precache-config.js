module.exports = {
    staticFileGlobs: [
        'dist/**.html',
        'dist/**.js',
        'dist/**.css',
        'dist/assets/*',
        'dist/assets/svg/*',
        'disk/assets/icons/*'
    ],
    runtimeCaching: [{
        urlPattern: /cizgiyorum-ff989\.firebaseapp\.com/,
        handler: 'networkFirst'
    }],
    root: 'dist',
    stripPrefix: 'dist/',
    navigateFallback: '/index.html'
};
