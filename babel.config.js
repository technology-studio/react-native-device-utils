module.exports = function (api) {
  api.cache(() => process.env.NODE_ENV)
  const presets = [
	   require('@txo/babel-preset'),
  ];

  return {
    presets,
  };
}
