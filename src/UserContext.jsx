import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!user) {

            axios.post('/userdata', {
                token: localStorage.getItem('jwttoken'),
            }).then((response) => {
                if (response.status === "ok") {
                    setUser(response.data);
                    setReady(true);
                }

            })

            // axios.get('/profile', { withCredentials: true }).then((response) => {
            //     setUser(response.data);
            //     setReady(true)
            // })
        }
    });



    return (<UserContext.Provider
        value={{ user, setUser, ready }}>
        {children}
    </UserContext.Provider>)
} 