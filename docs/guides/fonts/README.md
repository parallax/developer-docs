# Using Fonts

## Font Filetypes

You can check which filetypes are compatible with which browsers here:

[https://caniuse.com/#feat=ttf](https://caniuse.com/#feat=ttf)
[https://caniuse.com/#feat=otf](https://caniuse.com/#feat=otf)
[https://caniuse.com/#feat=woff](https://caniuse.com/#feat=woff)
[https://caniuse.com/#feat=woff2](https://caniuse.com/#feat=woff2)
[https://caniuse.com/#feat=eot](https://caniuse.com/#feat=eot)

TODO: Write more of this

## Google Fonts

Unfortunately Google does not offer an easy way to directly download fonts. You can browse the raw [git repository](https://github.com/google/fonts/) to search for the file you want.

Do not link to the GitHub hosted fonts in your CSS though! GitHub serves the files with the wrong mime type, which causes issues in some browsers.

While there is not a mainstream CDN for all the formats, you can use [http://google-webfonts-helper.herokuapp.com](http://google-webfonts-helper.herokuapp.com/) to download the font files and host them yourselves.

## Font Face Observer

[Font Face Observer](https://github.com/bramstein/fontfaceobserver) is a small @font-face loader and monitor (3.5KB minified and 1.3KB gzipped) compatible with any webfont service. It will monitor when a webfont is loaded and notify you. It does not limit you in any way in where, when, or how you load your webfonts. Unlike the [Web Font Loader](https://github.com/typekit/webfontloader) Font Face Observer uses scroll events to detect font loads efficiently and with minimum overhead.