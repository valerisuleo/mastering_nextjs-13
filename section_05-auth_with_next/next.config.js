//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    nx: {
        // Set this to true if you would like to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
    async rewrites() {
        return [
            {
                source: '/todos/:path*',
                destination: '/pages/todos/:path*',
            },
            {
                source: '/todos/new',
                destination: '/pages/todos/new/page',
            },
            {
                source: '/products/:path*',
                destination: '/pages/products/:path*',
            },
            // Add more rewrites as needed
        ];
    },
};

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
