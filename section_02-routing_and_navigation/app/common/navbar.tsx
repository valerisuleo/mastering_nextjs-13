/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Navbar
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                href={'todos'}
                            >
                                Todos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href={'products'}>
                                Products
                            </Link>
                        </li>
                        <li className="nav-item"></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
