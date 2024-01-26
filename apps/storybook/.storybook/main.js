import {dirname, join} from 'path'
module.exports = {
  stories: [
    '../../../packages/react/src/**/*.stories.mdx',
    '../../../packages/react/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('storybook-css-modules-preset'),
    getAbsolutePath('@storybook/addon-storysource'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {builder: {useSWC: true}},
  },
  features: {
    buildStoriesJson: true,
    disableTelemetry: true,
  },
  docs: {
    autodocs: false,
  },
}

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}
