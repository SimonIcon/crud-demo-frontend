import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

// creating contex
export const userContext = createContext({})

const UserContext = ({ children }) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const getAllUsers = async () => {
            await axios.get(process.env.REACT_APP_BACKEND_URL).then((list) => {
                setUsers(list.data.data)
            }).catch((error) => {
                console.log(`error occurred while fetching users ${error}`)
            })

        }
        getAllUsers()
    }, [users])

    return (
        <userContext.Provider value={{ users }}>
            {children}
        </userContext.Provider>
    )
}

export default UserContext