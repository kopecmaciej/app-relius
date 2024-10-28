import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "standalone",
};

const withMDX = createMDX({
  extension: /\.mdx?$/, // This will allow both .md and .mdx files to be treated as MDX
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
