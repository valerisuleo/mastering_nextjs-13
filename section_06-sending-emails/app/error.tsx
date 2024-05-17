'use client';

interface Props {
    error: Error;
    reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
    console.log('log error', error);

    return (
        <div>
            <h1>An unexpected error has occurred: {error.message}</h1>
            <button className="btn btn-primary" onClick={() => reset()}>
                Retry
            </button>
        </div>
    );
};

export default ErrorPage;
