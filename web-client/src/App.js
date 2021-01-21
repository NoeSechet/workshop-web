import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App() {

    const [userList, setUserList] = useState([]);
    const [updateInterval, setUpdateInterval] = useState(2);

    useEffect(() => {
        axios.get(`http://localhost:8080/user`)
            .then(res => {
                setUserList(res.data.users)
                console.log(res);
                console.log(res.data);
            })
    }, []);

    return (
        <div className="App">
            <header className="App-header">User list</header>
            <ul>
                {userList.map(user => {
                    return <li key={user._id} className="li">{user.name} {user.hobby}</li>
                })}
            </ul>
        </div>
    );
}

export default App;
