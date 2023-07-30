import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import axios from 'axios'
import { UserInterface } from '../Interfaces'

export const myContext = createContext<Partial<UserInterface>>({})

export default function Context(props: PropsWithChildren<UserInterface>) {
    const [user, setUser] = useState<UserInterface>()
    useEffect(() => {
        axios
            .get('/api/users/me', {
                withCredentials: true,
            })
            .then((res) => {
                setUser(res.data)
            })
    }, [])
    return (
        <myContext.Provider value={user!}>{props.children}</myContext.Provider>
    )
}
