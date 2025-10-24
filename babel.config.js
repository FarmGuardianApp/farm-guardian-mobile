
module.exports = function(api) {
  api.cache(true);
  return {
    // Place nativewind's babel entry in presets because it exports a
    // preset-style configuration (an object with a `plugins` field).
    // Putting it in `plugins` causes Babel to attempt to load a plugin
    // that itself contains `plugins`, which triggers the error seen.
    presets: ['babel-preset-expo', 'nativewind/babel'],
  };
};