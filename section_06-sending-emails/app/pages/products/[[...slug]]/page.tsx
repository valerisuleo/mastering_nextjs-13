import React from 'react';

interface Props {
    params: {
        slug: string[];
    };
    searchParams: {
        sortOrder: string;
    };
}

const ProductsIndex = ({ params, searchParams }: Props) => {
    return (
        <div>
            <h1>ProductsIndex</h1>
            {params.slug}
            {searchParams.sortOrder}
        </div>
    );
};

export default ProductsIndex;
