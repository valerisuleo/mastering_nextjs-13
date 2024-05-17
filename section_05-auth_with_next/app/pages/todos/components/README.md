# BtnHydrated Component for Next.js

## Introduction

Welcome to the `BtnHydrated` component documentation! This component is crafted for Next.js applications to address a specific challenge: the inability to pass event handlers or functions from server components to client components directly. By leveraging `BtnHydrated`, developers can embed flexible event handling in their client components, supporting a wide range of interactive functionalities while adhering to the architectural constraints of Next.js.

## Why `BtnHydrated`?

In the architecture of Next.js, especially with the introduction of the new app directory, there's a clear distinction between server and client components. Server components render on the server, improving performance by reducing the JavaScript load on the client. However, this model restricts passing functions, such as event handlers, from the server to the client directly, which can limit interactivity.

`BtnHydrated` was developed as a solution to overcome this limitation. It allows for dynamic and interactive client-side behaviors while maintaining the benefits of server-side rendering. The component facilitates passing configurable props that define its behavior, thereby enabling interactivity within the constraints of Next.js's component model.

## How It Works

The `BtnHydrated` component is designed to accept various props that dictate its functionality:

- **Props**:
  - `label`: The visible text on the button.
  - `eventName`: Identifies the action the button should trigger.
  - `data`: Optional data that might be needed for the event action (e.g., identifiers, paths).

- **Event Handling**:
  - The component interprets the `eventName` to determine what action to perform when clicked. This could range from navigation tasks (using Next.js's router) to more complex logic handled client-side.

### Example Usage

Here’s a simple usage example that demonstrates setting up a `BtnHydrated` for a common navigation task:

```jsx
import BtnHydrated from './components/BtnHydrated';

function UserProfile() {
    return (
        <div>
            <BtnHydrated
                label="View Settings"
                eventName="navigate"
                data={{ path: '/settings' }}
            />
        </div>
    );
}
```

In this example, the `BtnHydrated` is configured to navigate to the '/settings' page when clicked. The component handles the click event based on the `eventName` prop, ensuring that all logic remains encapsulated within the client-side boundaries.

## Benefits

- **Enhanced Reusability**: `BtnHydrated` can be used across various parts of the application with different settings without the need to rewrite the button logic.
- **Compliance with Next.js Architecture**: It adheres to the best practices of Next.js, particularly in handling the separation of server and client logic.
- **Flexibility**: It supports a wide range of actions and can be easily extended to include additional behaviors as needed.

