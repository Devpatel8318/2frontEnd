import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // console.log(user);
        if (!user) {

            axios.post('/userdata', {
                token: localStorage.getItem('jwttoken'),
            }).then((response) => {
               const {name,email,_id}  = response.data;
            //    console.log({name,email,_id});
                    // console.log(response.data);
                    setUser({name,email,_id});
                    setReady(true);

            })

            // axios.get('/profile', { withCredentials: true }).then((response) => {
            //     console.log(response.data);
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