import React, { useContext, useState } from 'react'
import { userContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UpdateUser = () => {
    const { activeUser } = useContext(userContext)
    // declaring form variable
    const [username, setUserName] = useState(activeUser.username)
    const [email, setEmail] = useState(activeUser.userEmail)
    const [origin, setOrigin] = useState(activeUser.origin)
    const [password, setPassword] = useState(activeUser.password)


    // email validation function
    function isValidEmail(e) {
        const re = /\S+@\S+\.\S+/;
        return re.test(e);
    }
    // errors
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [message, setMessage] = useState('')
    // posting data to mongoose in express server
    const navigate = useNavigate()
    const handleUpdateUser = async () => {
        if (username.length < 1) {
            setNameError("missing username")
            setTimeout(() => {
                setNameError('')
            }, 2000);
        } else if (!isValidEmail(email)) {
            setEmailError("invalid error")
            setTimeout(() => {
                setEmail('')
                setEmailError('')
            }, 2000);
        } else if (email.length < 1) {
            setEmailError("missing email")
            setTimeout(() => {
                setEmailError('')
            }, 2000);
        } else if (password.length < 6) {
            setPasswordError("password should atleast contain six characters")
            setTimeout(() => {
                setPassword('')
                setPasswordError('')
            }, 2000);

        }
        else {
            try {
                await axios.patch(`${process.env.REACT_APP_BACKEND_URL}updateUser/${activeUser._id}`, {
                    username: username,
                    userEmail: email,
                    origin: origin,
                    password: password,
                })
                setMessage(`${activeUser.username} details updated`)
                setTimeout(() => {
                    setEmail("")
                    setOrigin('')
                    setPassword('')
                    setUserName('')
                    setMessage('')
                    navigate('/')
                }, 2000);
            } catch (error) {
                console.log(`error while creating user ${error}`)
            }

        }


    }


    return (
        <div className='w-full flex justify-center items-center pt-5'>
            {
                activeUser ? (
                    <div className='border-2 w-[75%] sm:w-[60%] md:w-[50%] lg:w-[40%] py-10 px-7 items-center justify-center flex flex-col'>
                        <h4 className='capitalize font-semibold underline'>update {activeUser.username} details</h4>
                        {message.length > 1 ? (<p className='text-center text-green-600 font-semibold py-2'>{message}</p>) : null}
                        <input type='text' value={username} placeholder='username' onChange={(e) => setUserName(e.target.value)}
                            className='w-[75%] px-3 py-2 border-2 rounded-lg mb-2'
                        />
                        {nameError.length > 0 ? (<p className='text-red-600 text-sm font-sans font-extralight'>{nameError}</p>) : null}
                        <input type='email' value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)}
                            required className='w-[75%] px-3 py-2 border-2 rounded-lg mb-4'
                        />
                        {emailError.length > 0 ? (<p className='text-red-600 text-sm font-sans font-extralight'>{emailError}</p>) : null}
                        <input type='text' value={origin} placeholder='country' onChange={(e) => setOrigin(e.target.value)}
                            required className='w-[75%] px-3 py-2 border-2 rounded-lg mb-2'
                        />
                        <input type='password' value={password} placeholder=' password' onChange={(e) => setPassword(e.target.value)}
                            required className='w-[75%] px-3 py-2 border-2 rounded-lg mb-2'
                        />
                        {passwordError.length > 0 ? (<p className='text-red-600  text-sm font-sans font-extralight'>{passwordError}</p>) : null}
                        <button className='w-[75%] px-3 py-2 bg-cyan-500 rounded-lg mb-4 text-center capitalize text-black
                font-semibold hover:bg-cyan-300'
                            onClick={handleUpdateUser}
                        >update</button>


                    </div>

                ) : (
                    <h4>no user to update</h4>
                )
            }
        </div>
    )
}

export default UpdateUser