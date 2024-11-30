import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Header() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
        response.json().then(userInfo => {
          setUsername(userInfo.username);
        });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
  }


  return(
      <header>
      <Link to="/" className="logo">blog it</Link>
      <nav>
        {username && (
          <>
            <Link to='/create'>Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">login</Link>
            <Link to="/register">register</Link>
          </>
        )}
      </nav>
    </header>
  );
}