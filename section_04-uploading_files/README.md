# Uploading files with Next.js

Welcome to the Cloudinary Integration with Next.js repository! This project provides a simple setup for integrating Cloudinary into a Next.js application to handle file uploads.

While there are several cloud platforms available:

- Amazon S3
- Google Cloud
- Microsoft Azure
- **Cloudinary**

Cloudinary offers unique benefits that make it an excellent choice for managing media assets:

1. **Comprehensive Media Management**: Cloudinary is specifically designed for image and video management. It offers advanced features like automatic format optimization, responsive image delivery, and on-the-fly image and video transformations.

2. **Easy Integration**: Cloudinary provides seamless integration with various frameworks and libraries, including Next.js. The setup is straightforward, and the provided SDKs and APIs are developer-friendly.

3. **Performance Optimization**: Cloudinary automatically optimizes images and videos for faster loading times and improved performance. This can significantly enhance user experience, especially on mobile devices.

4. **Scalability**: Cloudinary can handle large volumes of media assets without compromising performance. It scales effortlessly as your application grows, ensuring reliability and efficiency.

5. **Security**: Cloudinary offers robust security features, including secure URLs, access control, and automatic backups, ensuring that your media assets are protected.

6. **Rich Feature Set**: Cloudinary provides a wide range of features such as watermarking, facial recognition, animated GIF creation, and more, giving you the tools to create engaging and dynamic media content.

7. **Global CDN**: Cloudinary leverages a global content delivery network (CDN) to ensure fast and reliable media delivery to users around the world.

## Setting Up Cloudinary

To get started with Cloudinary, follow these steps:

1. **Sign up for a Cloudinary account**: If you don't have a Cloudinary account, you can sign up at [Cloudinary](https://cloudinary.com/).

2. **Get your Cloudinary credentials**: Once you have an account, get your Cloud name, API Key, and API Secret from the Cloudinary dashboard.

3. **Install the Cloudinary package**: In your Next.js project, install the Cloudinary package by running the following command:

    ```bash
    npm install next-cloudinary
    ```

4. **Set the environment variables**: Create a `.env.local` file in the root of your project and add your Cloudinary credentials: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"`


## Uploading Files

To upload files using Cloudinary in your Next.js project, follow these steps:

1. **Import the required components**: In your upload page, import the necessary components from the `next-cloudinary` package:


    ```javascript
    'use client';
    import React, { useState } from 'react';
    import { CldImage, CldUploadWidget } from 'next-cloudinary';
    ```

2. **Create a state to hold the public ID**: Create a state variable to hold the public ID of the uploaded file:


    ```javascript
    interface ICloudinaryResult {
        public_id: string;
    }
    ```

3. **Create the TodoNew component**: Use the `CldUploadWidget` and `CldImage` components to create a file upload and display page:


    ```javascript
    const TodoNew = () => {
        const [public_id, setPublic_id] = useState('');

        return (
            <div>
                {public_id && (
                    <CldImage alt={''} src={public_id} width={300} height={200} />
                )}
                <CldUploadWidget
                    uploadPreset="your_upload_preset"
                    onSuccess={(result) => {
                        const info = result.info as ICloudinaryResult;
                        setPublic_id(info.public_id);
                    }}
                >
                    {({ open }) => {
                        return (
                            <button
                                className="btn btn-primary my-3"
                                onClick={() => open()}
                            >
                                Upload
                            </button>
                        );
                    }}
                </CldUploadWidget>
            </div>
        );
    };

    export default TodoNew;
    ```

4. **Configure the upload widget**: Replace `"your_upload_preset"` with the actual upload preset you created in Cloudinary.


	> where do we get the `uploadPreset`?
	
	1. Go to [console/setting/uplaod](https://console.cloudinary.com/settings/c-bd3c5de64af788dda2f22ae255ef4e/upload)
	2. click **Add upload preset**
	3. copy *Upload preset name*
	4. change Signing Mode to *Unsingned*


5.  Customize the widget options as needed. Here is an example configuration:

```
<CldUploadWidget
  uploadPreset="your_upload_preset"
  options={{
    sources: ['local'],
    maxFiles: 5,
    multiple: false,
    styles: {},
  }}
>
  {({ open }) => (
    <button onClick={() => open()}>Upload</button>
  )}
</CldUploadWidget>

```