import React, { useState } from 'react';
import axios from 'axios';

function TestCookie() {
    const [username, setUsername] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const URL_API:string = "http://localhost:8090/notify";

    const handleLogin = async () => {
        try {
            const response = await axios.post(URL_API + "/login", { username }, { 
              withCredentials: true 
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Erro no login');
        }
    };

    const handleProtectedRequest = async () => {
        try {
            const response = await axios.get(URL_API + '/protected', { withCredentials: true });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Acesso negado');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post(URL_API + '/logout', {}, { withCredentials: true });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Erro no logout');
        }
    };

    return (
        <div>
            <h1>Aplicação com JWT em Cookie</h1>
            <input 
                type="text"
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleProtectedRequest}>Acessar rota protegida</button>
            <button onClick={handleLogout}>Logout</button>
            <p>{message}</p>
        </div>
    );
}

export default TestCookie;
