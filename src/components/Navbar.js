import React from 'react'
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className='h-[80px]  text-white bg-slate-800'>
            <div className='flex flex-row w-full justify-between items-center px-10 pt-3'>
                <div className='uppercase text-xl font-bold'
                    onClick={() => navigate('/')}
                >mern crud demo</div>
                <ul className='flex flex-row justify-between'>
                    <li className='px-5 capitalize font-semibold text-sm hover:text-pink-600 hover:underline'>
                        <Link to="/createUser">create user</Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Navbar