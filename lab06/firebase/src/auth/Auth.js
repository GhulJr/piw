'use strict';

import React, { useEffect, useState } from 'react';
import fb from '../config.js';


export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserEmail, setCurrentUserEmail] = useState('Logged out');

    useEffect(() => {
        fb.auth().onAuthStateChanged((user) => {

            setCurrentUser(user);

            if (user) {
                props.login();
                setCurrentUserEmail(user.email);
            } else {
                props.logout();
                setCurrentUserEmail('Logged out');
            }
        });
    }, []);

    return (
        <div>
            <h1>{currentUserEmail}</h1>
            <AuthContext.Provider value={{ currentUser }}>
                {props.children}
            </AuthContext.Provider>
        </div>
    );
};
