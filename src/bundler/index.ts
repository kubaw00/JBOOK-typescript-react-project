import * as esbuild from 'esbuild-wasm';

import { unpkgPathPlugin } from '../plugin/unpkg-path-plugin';
import { fetchPlugin } from '../plugin/fetch-plugin';

let service: esbuild.Service;

const bundle = async (rawCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  }

  const result = await service.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      global: 'window',
      'process.env.NODE_ENV': '"production"',
    },
  });

  return result.outputFiles[0].text;
};

export default bundle;
