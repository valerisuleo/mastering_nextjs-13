import Image from 'next/image';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mare from '@/public/images/mare.jpg';

const TodosIndex = () => {
    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <Image
                src="https://bit.ly/react-cover"
                // width={300}
                // height={150}
                alt="mare"
                fill
                style={{ objectFit: 'cover' }}
                sizes="100vw"
                quality={75}
                priority
            ></Image>
            {/* <Image src={mare} alt="mare"></Image> */}
        </div>
    );
};

export default TodosIndex;
