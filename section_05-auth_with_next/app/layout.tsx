import './global.css';
import Footer from './library/footer';
import Navbar from './common/navbar';
import AuthProvider from './auth/context/provider';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <div>
                        <Navbar />
                    </div>
                    <main
                        className="container text-white"
                        style={{ minHeight: '100vh' }}
                    >
                        {children}
                    </main>
                </AuthProvider>
                <div>
                    <Footer></Footer>
                </div>
            </body>
        </html>
    );
}
