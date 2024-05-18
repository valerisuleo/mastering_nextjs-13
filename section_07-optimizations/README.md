
# Next.js Optimization Guide

Welcome to the Next.js Optimization Guide repository. This guide covers various techniques and best practices to optimize your Next.js applications, ensuring better performance, faster load times, and improved SEO.

In this section...

- Optimize **images** for faster loading and better performance.
- Integrate and efficiently use third-party **Scripts**.
- Implement custom **fonts** in a way that maintains performance.
- Enhance your application's search engine optimization (**SEO**).
- Utilize l**azy loading** to defer the loading of offscreen content.

Each section provides detailed explanations, examples, and code snippets to help you implement these optimizations in your Next.js projects.


## Optimizing Images

### Local Images

The Image component in Next.js automatically optimizes and serves images in various formats and sizes, reducing loading times and bandwidth usage for improved site performance. By using the `next/image` component, you can take advantage of these built-in optimizations with minimal configuration. Here's an example of how to use the `Image` component for local images:

```jsx
import Image from 'next/image';
import coffee from '@/public/images/coffee.jpg';

export default async function Home() {
  return (
    <main>
      <Image src={coffee} alt="Coffee" />
    </main>
  );
}
```

In addition, make sure to configure your `tsconfig.json` to support path aliases:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Remote Images

Next.js also supports optimizing remote images. To use remote images with the `next/image` component, you need to configure the `next.config.js` file to specify the remote [image patterns](https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns). Here's an example configuration:

```js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bit/ly',
        // port: '',
        // pathname: '/account123/**',
      },
    ],
  },
};

module.exports = nextConfig;
```

Here's how to use the `Image` component for remote images:

```jsx
import Image from 'next/image';

export default async function Home() {
  return (
    <main>
      <Image
        src="https://bit.ly/react-cover"
        alt="Coffee"
        width={300}
        height={170}
      />
    </main>
  );
}
```

You can also use the `fill` property and other advanced configurations:

```jsx
import Image from 'next/image';

export default async function Home() {
  return (
    <main>
      <Image
        src="https://bit.ly/react-cover"
        alt="Coffee"
        fill
        style={{ objectFit: 'cover' }}
      />
    </main>
  );
}
```

#### Sizes Attribute

The `sizes` attribute in the `next/image` component specifies how much space (in viewport width) an image will take at different viewport sizes. This helps the browser determine which image size to download based on the current viewport width, which improves loading performance.

Here's the breakdown of the sizes attribute:

```jsx
<Image
  src="https://bit.ly/react-cover"
  alt="Coffee"
  fill
  className="object-cover"
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
  quality={100}
  priority
/>
```

- `(max-width: 480px) 100vw`: When the viewport width is 480 pixels or less, the image should take up 100% of the viewport width.
- `(max-width: 768px) 50vw`: When the viewport width is 768 pixels or less but more than 480 pixels, the image should take up 50% of the viewport width.
- `33vw`: When the viewport width is greater than 768 pixels, the image should take up 33% of the viewport width.

This attribute ensures that the browser downloads the appropriately sized image for the current viewport, reducing the download size and improving performance.


> Does `sizes` Affect the Layout?

The `sizes` attribute does not change the layout of the image on the page. It only affects which image file is downloaded. The actual display of the image—its dimensions and how it fits into its container—is controlled by the other attributes and CSS.



Understood. Here's the revised explanation incorporating the detail about images being lazy-loaded by default:

### Priority Attribute

By default, images in the `next/image` component are lazy-loaded. This means that they are only loaded when they enter the viewport, which helps to reduce initial page load times by deferring the loading of images that are not immediately visible.

However, there are cases where you want certain images to load immediately, especially for above-the-fold content (i.e., content visible without scrolling). In such cases, you can use the `priority` attribute.

The `priority` attribute in the `next/image` component is used to indicate that an image is a high priority for loading. This is useful for above-the-fold content, which should be loaded as quickly as possible to improve the initial page load experience.

When you set `priority` on an image, it tells Next.js to preload the image. Preloading helps the browser to fetch the image sooner, making it available faster when rendering the page.

Here's how it looks in the code:

```jsx
import Image from 'next/image';

export default async function Home() {
  return (
    <main>
      <Image
        src="https://bit.ly/react-cover"
        alt="Coffee"
        fill
        className="object-cover"
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        quality={100}
        priority
      />
    </main>
  );
}
```

In this example, the image will be prioritized during the loading process, which is beneficial for images that are crucial to the initial user experience.


## Integrating and Efficiently Using Third-Party Scripts

Integrating third-party scripts, such as analytics, can be done efficiently in Next.js using the built-in `Script` component. This component allows you to load third-party scripts with various strategies to optimize performance.


First, add the Google Analytics script...

```
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-E720JHXSJ1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-E720JHXSJ1');
</script>

```

...to your `layout.tsx` (or `layout.js`) file using the `Script` component in Next.js. This ensures that the script is loaded on every page.

```jsx
// layout.tsx
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <Html lang="en" data-theme="winter">
      <Head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-E720JHXSJ1`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-E720JHXSJ1');
          `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

In this example:

- The `Script` component with the `async` attribute loads the Google Analytics script asynchronously.
- The `Script` component with the `id="google-analytics"` attribute contains the inline script to initialize Google Analytics. The `strategy="afterInteractive"` attribute ensures that the script runs after the page becomes interactive, which improves page load performance.

#### Understand the Loading Strategies

The `Script` component provides several strategies to control when and how scripts are loaded:

- `beforeInteractive`: Load the script before the page becomes interactive. Useful for critical scripts that need to be available immediately (i.e. bot detectors, cookie consent managers...)
- `afterInteractive`: Load the script after the page becomes interactive. Good for non-critical scripts that don't need to block the page from becoming interactive (i.e. tag managers and analytics)
- `lazyOnload`: the script is loaded only after all the resources on the page have been feteched (i.e. chat plugins, social media widget)
- `worker`: Load the script inside a web worker.


#### Refactoring


1. First, create a separate component for the Google Analytics script.

	```
	import Script from 'next/script';
	
	const GoogleAnalyticsScript = () => {
	  return (
	    <>
	      <Script
	        async
	        src={`https://www.googletagmanager.com/gtag/js?id=G-E720JHXSJ1`}
	      />
	      <Script id="google-analytics" strategy="afterInteractive">
	        {`
	          window.dataLayer = window.dataLayer || [];
	          function gtag(){dataLayer.push(arguments);}
	          gtag('js', new Date());
	
	          gtag('config', 'G-E720JHXSJ1');
	        `}
	      </Script>
	    </>
	  );
	};
	
	export default GoogleAnalyticsScript;
	```

2. Use the Component in Your Layout

	```
	// layout.tsx
	import { Html, Head, Main, NextScript } from 'next/document';
	import GoogleAnalyticsScript from './GoogleAnalyticsScript';
	
	export default function RootLayout({ children }) {
	  return (
	    <Html lang="en" data-theme="winter">
	      <Head>
	        <GoogleAnalyticsScript />
	      </Head>
	      <body>
	        <Main />
	        <NextScript />
	      </body>
	    </Html>
	  );
	}
	
	```
	
	
## Implementing Fonts in a Way That Maintains Performance

Using custom fonts can enhance the visual appeal of your Next.js application, but if not done correctly, it can negatively impact performance. Here's how to implement custom fonts.


### Step 1: Import the Font

Next.js provides a built-in way to optimize and load Google Fonts using the `next/font` package. To use the Roboto font, you can import it directly in your component.

```jsx
import { Roboto } from 'next/font/google';
```


#### What if I want to use local file for fonts?

```
import localFont from 'next/font/local';
```

### Step 2: Configure the Font

Configure the font by calling the `Roboto()` function and passing an options object. This function sets up the necessary configuration for loading the Roboto font with the specified options.

```jsx
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
});
```


> Explanation of Options
> 
> - **subsets**: This option specifies which character sets to load. In this case, `['latin']` indicates that we want to load the Latin character set, which is used by many Western languages.
> - **weight**: This option specifies the font weights to load. Here, `['400', '500']` means that we want to load the font weights 400 (regular) and 500 (medium).



#### What if I want to use local file for fonts?

```
const poppins = localFont({
  src: '../public/fonts/poppins-regular-webfont.woff2',
});
```

### Step 3: Apply the Font

Now, you need to apply the font to your application. You can do this by using the `className` property from the `roboto` object. This `className` is automatically generated and includes the necessary CSS to apply the Roboto font with the specified weights and subsets.

```jsx
// layout.tsx
import './globals.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  );
}
```

## Search Engine Optimization

To make our applications search engine friendly, we can export a metadata object from our pages and layouts. This helps search engines understand the content and context of each page, improving SEO performance.

> **Note**: Metadata exported from a page overwrite metadata defined in the layouts.

#### Step 1: Define Metadata in a Page

You can define metadata in a page by exporting a `metadata` object. This object typically includes properties like `title` and `description`.

```jsx
// pages/index.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function Home() {
  return (
    <div>
      <h1>Welcome to my Next.js app!</h1>
    </div>
  );
}
```

In this example, the `metadata` object is defined with `title` and `description` properties.

#### Step 2: Define Metadata in a Layout

You can also define metadata in a layout. This metadata serves as a default and can be overridden by pages that export their own metadata.

```jsx
// layouts/MainLayout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Default Title',
  description: 'Default description for the website',
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Default description for the website" />
        <title>Default Title</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

In this example, the layout provides default metadata.

#### Step 3: Export Metadata

When you export the `metadata` object from a page or layout, Next.js automatically includes this information in the HTML `<head>` section, making it available for search engines.

### Example: Generating Metadata Dynamically

You can also generate metadata dynamically based on data fetched during the page rendering process. This is useful for pages with dynamic content.

```jsx
// pages/blog/[slug].tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPost({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
```

In this example, the `generateMetadata` function dynamically generates metadata based on the blog post data.

### Summary

1. **Define Metadata in Pages**: Export a `metadata` object from pages to provide SEO-friendly information like `title` and `description`.
2. **Define Metadata in Layouts**: Set default metadata in layouts, which can be overridden by page-specific metadata.
3. **Dynamic Metadata**: Use the `generateMetadata` function to create dynamic metadata based on fetched data.

By exporting metadata from your pages and layouts, you can improve the SEO performance of your Next.js application, making it more discoverable by search engines.







## Lazy Loading Components

Utilizing lazy loading allows you to defer the loading of offscreen content, improving the initial load time and overall performance of your Next.js application. This is especially useful for heavy components that are not immediately visible to the user.

In Next.js, you can achieve lazy loading with the `next/dynamic` package.

#### Step 1: Import Dynamic

First, import the `dynamic` function from `next/dynamic`.

```jsx
import dynamic from 'next/dynamic';
```

#### Step 2: Lazy Load the Component

Use the `dynamic` function to dynamically import the component you want to lazy load. You can also specify options such as disabling server-side rendering (`ssr: false`) and providing a fallback component to display while the main component is loading.

```jsx
const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
```

### Example Explained

Let's break down the example:

1. **Dynamic Import**: 
   - `dynamic(() => import('./HeavyComponent'))` tells Next.js to dynamically import the `HeavyComponent` only when it is needed.

2. **Options**:
   - `ssr: false`: Disables server-side rendering for this component. This means the component will only be loaded on the client side.
   - `loading: () => <p>Loading...</p>`: Specifies a fallback component to display while the `HeavyComponent` is being loaded. In this case, a simple loading message is displayed.

### Full Example

Here's a complete example of how to implement lazy loading in your Next.js application:

```jsx
// pages/index.tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function Home() {
  return (
    <div>
      <h1>Welcome to my Next.js app!</h1>
      <HeavyComponent />
    </div>
  );
}
```

### Benefits of Lazy Loading

- **Improved Performance**: By deferring the loading of offscreen content, you reduce the initial load time of your application.
- **Better User Experience**: Users can start interacting with the content faster, while the less critical parts of the page load in the background.
- **Reduced Bandwidth Usage**: Only the necessary components are loaded initially, which can save bandwidth, especially on mobile devices or slow connections.

By using lazy loading, you can significantly enhance the performance and user experience of your Next.js application.


### Lazy Loading for libraries

In Next.js, you can also lazy load packages to improve the initial load time of your application. This is especially useful for large libraries that are not needed immediately.

The example you provided shows how to lazy load the `lodash` library when a button is clicked. Here's a step-by-step breakdown:

### Example Code

```jsx
import { useState } from 'react';

export default function Home() {
  const [sortedUsers, setSortedUsers] = useState(null);

  const handleSortUsers = async () => {
    const _ = (await import('lodash')).default;
    
    const users = [
      { name: 'c' },
      { name: 'b' },
      { name: 'a' },
    ];

    const sorted = _.orderBy(users, ['name']);
    setSortedUsers(sorted);
    console.log(sorted);
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={handleSortUsers}>Sort Users</button>
      {sortedUsers && (
        <ul>
          {sortedUsers.map((user, index) => (
            <li key={index}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```










