import { Link } from 'react-router-dom';// imports link component frm react router dom for navigating

//fucntion for rendering navbar
const Navbar = () => {
    return (
        <header>
            {/* container for centering content */}
            <div className="container">
                {/* link to the home page */}
                <Link to="/">
                    <h1>MealPro</h1>
                </Link>
            </div>
        </header>
    );
};

//exporting navbar
export default Navbar;
