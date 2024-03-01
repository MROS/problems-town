import withMDX from '@next/mdx'

await import("./src/env.js");

const config = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default withMDX()(config);
