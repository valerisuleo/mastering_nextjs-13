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
