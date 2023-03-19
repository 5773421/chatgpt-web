import { defineConfig } from 'tsup'
import copy from 'rollup-plugin-copy'
export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'build',
  target: 'es2020',
  format: ['cjs'],
  splitting: false,
  sourcemap: true,
  minify: false,
  shims: true,
  dts: false,
  plugins: [
    // @ts-expect-error: 无js
    copy({
      targets: [{ src: 'keywords', dest: 'build' }],
    }),
  ],
})
