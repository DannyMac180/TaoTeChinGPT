import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';


// Define the interface for the component's props
interface NavbarProps {
    isLoggedIn: boolean;
    username?: string;
}

// Use the interface as a generic parameter for the functional component
const Navbar: React.FunctionComponent<NavbarProps> = ({ isLoggedIn, username }) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <ul>
                    <li>
                        {/* Logo with link to the root page */}
                        <Link href="/" className="navbar-logo">
                            Logo
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-right">
                {isLoggedIn ? (
                    // Display the username if the user is logged in
                    <span className="navbar-username">{username}</span>
                ) : (
                    // Display the "Login" button if the user is not logged in
                    <Link href="/auth" className="navbar-login">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;