/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import postcssMixins from 'postcss-mixins';
import postcssNested from 'postcss-nested';
import postcssExtendedRule from 'postcss-extend-rule';
import postcssSimpleVars from 'postcss-simple-vars';
import postcssStripInlineComments from 'postcss-strip-inline-comments';
import postcssPresetEnv from 'postcss-preset-env';
import postcssCustomMedia from 'postcss-custom-media';
import autoPrefixer from 'autoprefixer';
import postcssReporter from 'postcss-reporter';
import cssNano from 'cssnano';
import cssVars from './src/utils/tokens';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
//mixinDir:[path.join(__dirname, './src/utils/mixins')]
export default defineConfig({
  plugins: [react(),tsconfigPaths()],
  css: {
    postcss: {
        plugins: [
          postcssStripInlineComments,
          postcssMixins(),
          postcssNested,
          postcssSimpleVars({
          variables:cssVars,
          unknown(node, name, result) {
            node.warn(result,'Unknown variable '+name);
          },
          }),
          postcssExtendedRule,
          postcssCustomMedia,
          postcssPresetEnv,
          cssNano({
            preset:'default'
          }),
          autoPrefixer,
          postcssReporter
        ],
    },
},
resolve: {
  alias: [
    { find: '@', replacement: path.resolve(__dirname, 'src') },
  ],
},
test: {
  globals:true,
  environment:"jsdom",
  css:true,
  setupFiles:"./src/test/setup.ts",
},
})

