import { Link } from 'react-router-dom';

//a navbar component
const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>MealPro</h1>
                </Link>
            </div>
        </header>
    );
};

export default Navbar;
