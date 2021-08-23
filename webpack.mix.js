const mix = require('laravel-mix');
// require('laravel-mix-imagemin');
// require('laravel-mix-clean-css');

const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');

mix.js("assets/src/js/app.js", "assets/dist/js/scripts.min.js")
   .sass("assets/src/scss/app.scss", "assets/dist/css/styles.min.css")
   .options({ outputStyle: "compressed", processCssUrls: false });

mix.webpackConfig({
    plugins: [
        new CopyWebpackPlugin([
            {
                from: "assets/src/images",
                to: "assets/dist/images"
            }
        ]),
        new ImageminPlugin({
            // desabilitar em produção
            bypassOnDebug: true, 
            disable: true, 
            // -----------
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: { quality: "80-90" },
            plugins: [
                imageminMozjpeg({
                    quality: 80
                })
            ]
        })
    ]
});