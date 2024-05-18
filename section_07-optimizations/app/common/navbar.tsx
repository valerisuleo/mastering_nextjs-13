/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

const Navbar = async () => {
    const session = await getServerSession(authOptions);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">Navbar</a>
                <div
                    className="collapse navbar-collapse d-flex justify-content-between"
                    id="navbarNav"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    href={'/todos'}
                                >
                                    Todos
                                </Link>
                        </li>
                        {/* <li className="nav-item">
                            {session && (
                                <Link className="nav-link" href={'/products'}>
                                    Products
                                </Link>
                            )}
                        </li> */}
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                href={'/api/auth/signin'}
                            >
                                {(session && session.user.name) || 'Login'}
                            </Link>
                        </li>
                        {session && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    href={'/api/auth/signout'}
                                >
                                    Sign Out
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
