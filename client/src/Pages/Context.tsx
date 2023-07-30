import { createContext, PropsWithChildren, useEffect, useState} from 'react';
import axios from 'axios';

export const myContext = createContext<any>({});

export default function Context(props: PropsWithChildren<any>) {
    const [user, setUser] = useState<string>("")
    useEffect(()=>{
        axios.get("/api/users/me", {
            withCredentials: true
          }).then(res=> {
            setUser(res.data)
          })
    }, []);
  return (
    <myContext.Provider value={user}>{props.children}</myContext.Provider>
  )
}
