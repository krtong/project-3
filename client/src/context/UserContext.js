 import {createContext} from 'react';

export const UserContext = createContext({
    users: [],
    setUsers: (e) => {console.log("setUsers(e)", e)}
})