const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  plugins: [
    // connect plugins to PostCSS
    autoprefixer,
    cssnano({ preset: "default" }), // set default minification settings
  ],
};
