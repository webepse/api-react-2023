import {createContext} from 'react';

// juste besoin d'une forme 
export default createContext({
    isAuthenticated: false,
    setIsAuthenticated: value => {}
})
