module.exports = {
  "stories": [
    "../src/*.stories.@(mdx|js|jsx|ts|tsx)",
    "../src/**/*.stories.@(mdx|js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
}