var postcssConfig = {
  loader: 'postcss-loader',
  options: {
    plugins: function() {
      return [
        require('postcss-modules')({
          scopeBehaviour: 'global' // can be 'global' or 'local',
        }),
        require('precss'), // scss syntax
      ];
    },
  },
};


module.exports = postcssConfig;