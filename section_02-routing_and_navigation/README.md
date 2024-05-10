# Routing and Navigation in Next.js

This guide explores the routing and navigation features in Next.js, focusing on the new App Router. It aims to help you understand and implement dynamic routing, prefetching, client-side caching, and layouts efficiently in your Next.js projects.

## Directory Structure and Conventions

Next.js uses a convention-over-configuration approach, which simplifies defining routes by looking for special files such as `page.tsx`, `layout.tsx`, `loading.tsx`, `route.tsx`, etc.

### Project Organization

With the App router, files can be colocated within their respective domain-specific folders, which helps in organizing the project more logically:

```plaintext
/app
  /product
    [productId].tsx    // Dynamic route for individual products
    index.tsx          // Lists all products
    layout.tsx         // Layout specific to product pages
  /admin
    /users
      [userId].tsx     // Dynamic route for individual user profiles
      index.tsx        // User dashboard
    layout.tsx         // Admin-specific layout
  layout.tsx           // Root layout for common UI
```

## Dynamic Routes

Dynamic routes are defined by wrapping directory names with square brackets. For example, to define a dynamic route for a product:

```tsx
import React from 'react';

interface IProps {
    params: { id: number };
}

export const UserShow = ({ params }: IProps) => {
    return <div>UserShow</div>;
};


export default UserShow
```


### Dynamic Routes with Optional Catch-All

Dynamic routes in Next.js can be made even more flexible using the optional catch-all routes pattern `[[...slug]]`. This means the route will match both `/products` and `/products/any/number/of/segments`. 


#### File Structure

```plaintext
/pages
  /products
    [[...slug]].tsx   // Handles all /products/* routes, including /products itself
```

#### Dynamic Route Component

Here is how you can define a component in `pages/products/[[...slug]].tsx` to handle any number of nested routes under `/products`, as well as capture and utilize query parameters for functionality like sorting.

```tsx
import React from 'react';

interface Props {
    params: {
        slug: string[];
    };
}

const ProductsIndex = ({ params }: Props) => {
    return (
        <div>
            <h1>ProductsIndex</h1>
            {params.slug}
        </div>
    );
};

export default ProductsIndex;

```


## State Management

**In standard React applications**, we use the state hook for managing component state. 

```
'use client';

import React, { useState } from 'react';
import { ITodo } from './page';
import { sort } from 'fast-sort';

interface Props {
    list: ITodo[];
}

const TodosTable = ({ list }: Props) => {
    const th = Object.keys(list[0]);

    const [todos, setTodos] = useState<ITodo[]>(list);
    const [value, setValue] = useState('asc');

    const handleSort = (current: string) => {
        setValue((prev) => {
            const newState = prev === 'asc' ? 'desc' : 'asc';
            return newState;
        });

        const sorted = sort(list)[value]((key) => key[current]);

        setTodos(sorted);

    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        {th.map((item, i) => (
                            <th
                                key={i}
                                scope="col"
                                onClick={() => handleSort(item)}
                            >
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {todos.map((item: ITodo) => (
                        <tr key={item.id}>
                            {th.map((element: string, i) => (
                                <td key={i}>
                                    {element === 'completed'
                                        ? JSON.stringify(item[element])
                                        : item[element]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodosTable;

```


**In server-rendered applications**, however, we use query string parameters to keep state. This also allows us to bookmark our pages in specific state. For example, we can bookmark a filtered and sorted list of products: `<Link href="/todos?sortOrder=title">Sort Users</Link>`


Here's the right way to handle the sorting:

```
import React from 'react';
import { sort } from 'fast-sort';
import Link from 'next/link';
import { ITodo } from './interfaces';

interface Props {
    list: ITodo[];
    colName: string;
}

const TodosTable = ({ list, colName }: Props) => {
    const th: string[] = Object.keys(list[0]);
    const sorted: ITodo[] = sort(list).asc((sortBy) => sortBy[colName]);

    return (
        <div>
            {colName}
            <table className="table">
                <thead>
                    <tr>
                        {th.map((item, i) => (
                            <th key={i} scope="col">
                                <Link href={`/todos?sortOrder=${item}`}>
                                    {item}
                                </Link>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((item: ITodo) => (
                        <tr key={item.id}>
                            {th.map((element: string, i) => (
                                <td key={i}>
                                    {element === 'completed'
                                        ? JSON.stringify(item[element])
                                        : item[element]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodosTable;

```

## Layouts

In Next.js, layout components are a powerful way to encapsulate and reuse common UI elements across different parts of your application. You can define a general layout that applies to all pages, as well as specialized layouts for different sections like an admin area.

#### Example 1: Root Layout

The root layout usually contains elements that are common across all pages, such as headers, footers, and navigation menus. Here’s how you might set up a root layout file:

**File: `/app/layout.tsx`**

```tsx
import './global.css';
import Footer from './library/footer';
import Navbar from './library/navbar';

export const metadata = {
    title: 'Welcome to next-fundamentals',
    description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div>
                    <Navbar />
                </div>
                <main
                    className='container' style={{ minHeight: "100vh"}}
                >
                    {children}
                </main>
                <div>
                    <Footer></Footer>
                </div>
            </body>
        </html>
    );
}

```

You would wrap your page components with this `Layout` component to ensure that every page includes the header, footer, and any other common UI components.

#### Example 2: Admin Area Layout

For specialized areas like an admin panel, you might want a different layout that includes additional navigation elements or styling suited to administrative tasks.

**File: `/app/admin/layout.tsx`**

```tsx
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <aside className="bg-slate-200 p-5 mr-5">
        Admin Sidebar
      </aside>
      <div>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;

```

Now all the admin pages will show a side navbar. Cool hun?fault Layout;


## Prefetching and Client Cache






#### What is Prefetching?

Prefetching is the process of loading data or resources before they are actually needed. In the context of a web application, this often means loading parts of other pages in advance. By doing so, when a user clicks a link, the page can appear almost instantaneously because much of the data has already been loaded.

#### How Does Next.js Implement Prefetching?

Next.js automatically prefetches pages linked with the `Link` component that are visible in the viewport (the part of the web page you can see). This means if there are links on the current page that point to other parts of the application and those links are visible, Next.js will start loading those pages in the background.

#### The Role of the `Link` Component

The `Link` component in Next.js is not just a wrapper around the traditional `<a>` tag. It's a component designed to leverage the Next.js router capabilities, including prefetching. Here’s how you use it:

```
import Link from 'next/link';

const Navigation = () => (
  <nav>
    <Link href="/home" prefetch>Home</Link>
    <Link href="/about" prefetch>About</Link>
  </nav>
);

export default Navigation;

```


#### Benefits of Prefetching

As the user moves around our application, Next.js stores the page content in a cache on the client. So, if they revisit a page that already exists in the cache, Next.js simply grabs it from the cache instead of making a new request to the server. The client cache exists in the browser’s memory and lasts for an entire session. It gets reset when we do a full refresh.

