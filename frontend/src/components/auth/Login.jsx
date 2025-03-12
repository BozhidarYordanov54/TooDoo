import { useState } from "react"

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pending, setPending] = useState(false);

    const url = 'http://localhost:5058/api/authentication/login';
    const submitHandler = async (e) => {
        e.preventDefault();
        setPending(true);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        if(response.ok){
            console.log('login successful');
            localStorage.setItem('token', response.token);
        }
        setPending(false);
    }


    return(
        <>
            <form className="form login">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)} value={username} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <div className="form-group">
                    <button type="submit" disabled={pending}>Login</button>
                </div>
            </form>
        </>
    )
}