import path from 'path';
import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: {config: webpack.Configuration}) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    locales: '',
    buildLocales: '',
  };

  if (config) {
    config.resolve?.modules?.push(paths.src);
    config.resolve?.extensions?.push('.ts', '.tsx');
    config.module?.rules?.push(buildCssLoader(true));

    if (config.module?.rules) {
      // eslint-disable-next-line no-param-reassign
      config.module.rules = config.module.rules.map((rule: RuleSetRule | '...') => {
        // if (/svg/.test(rule?.test as string)) {

        if (rule !== '...') {
          if (rule.test instanceof RegExp && rule.test.toString().includes('svg')) {
            return {
              ...rule,
              exclude: /\.svg$/i,
            };
          }
        }
        return rule;
      });

      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });

      config.plugins?.push(new DefinePlugin({
        __IS_DEV__: true,
        __API__: JSON.stringify(''),
        __PROJECT__: JSON.stringify('storybook'),
      }));
    }
  }

  return config;
};
