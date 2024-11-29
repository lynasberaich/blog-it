import {useState} from "react";

export default function RegisterPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    async function register(ev) {
        ev.preventDefault();
        await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            header: {'Content-Type':'application/json'}
        })
    }
    return (
        <form className = "register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" 
                   placeholder="username" 
                   value={username} 
                   onChange={ev => setUsername(ev.target.value)}/>
            <input type="text" 
                   placeholder="password" 
                   value={password} 
                   onChange={ev => setPassword(ev.target.value)}/>
            <button>Register</button>
        </form>
    );
}