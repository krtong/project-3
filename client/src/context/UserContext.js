 import {createContext} from 'react';

export const UserContext = createContext({
    users: [],
    setUsers: () => {},
    setRecipes: (usersArray) => {console.log({usersArray})}
})