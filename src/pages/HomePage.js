import React, { useContext, useState } from 'react'
import { userContext } from '../context/UserContext'
import axios from 'axios'

const HomePage = () => {
    const { users } = useContext(userContext)
    const [activeId, setActiveId] = useState('')
    const [message, setMessage] = useState('')

    const handleDelete = async () => {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}deleteUser/${activeId}`).then((req) => {
            setMessage(req.data.message)
            setTimeout(() => {
                setMessage('')
            }, 2000);
        }).catch((error) => {
            console.log(`error occurred while deleting data ${error}`)
        })

    }
    return (
        <div className='w-full flex justify-center mt-6'>
            <div className='w-full md:w-[70%] lg:w-60% xl:w-[50%]'>
                {message.length > 0 ? (<p className='text-center text-sm text-red-600 font-semibold py-3'>{message}</p>) : null}
                <table>
                    <tr className='capitalize text-start px-4'>
                        <th className='px-2'>username</th>
                        <th className='px-2'>email</th>
                        <th className='px-2'>origin</th>
                        <th className='px-2'>is admin</th>
                        <th className='px-2'>update</th>
                        <th className='px-2'>delete</th>
                    </tr>
                    {
                        users.map((user) => (
                            <tr key={user._id} className='mt-4 text-xs text-center'>
                                <td className='px-2'>{user.username}</td>
                                <td className='px-2'>{user.userEmail}</td>
                                <td className='px-2'>{user.origin}</td>
                                <td className='px-2'>{user.isAdmint === true ? "true" : "false"}</td>
                                <td className='px-2 text-center capitalize text-green-500 text-xs font-semibold
                                hover:text-green-800 hover:underline'>update</td>
                                <td className='px-2 capitalize text-red-500 font-semibold hover:underline
                                hover:text-red-800'
                                    onClick={() => {
                                        setActiveId(user._id)
                                        handleDelete()
                                    }}
                                >delete</td>
                            </tr>
                        ))
                    }
                </table>

            </div>

        </div>
    )
}

export default HomePage