'use client';
import React, { useState } from 'react';
import { CldImage, CldUploadWidget } from 'next-cloudinary';

interface ICloudinaryResult {
    public_id: string;
}

const TodoNew = () => {
    const [public_id, setPublic_id] = useState('');

    return (
        <div>
            {public_id && (
                <CldImage alt={''} src={public_id} width={300} height={200} />
            )}
            <CldUploadWidget
                uploadPreset="ovsm9jda"
                options={{
                    sources: ['local'],
                    maxFiles: 5,
                    multiple: false,
                    styles: {},
                }}
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
