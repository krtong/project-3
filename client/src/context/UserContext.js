import {createContext} from 'react';

export const BookContext = createContext({
    users: [],
    setUsers: () => {}
})