import {Link} from "react-router-dom"

export default function Header() {
    return(
        <header>
        <Link to="/" className="logo">blog it</Link>
        <nav>
          <Link to="/login">login</Link>
          <Link to="/register">register</Link>
        </nav>
      </header>
    );
}