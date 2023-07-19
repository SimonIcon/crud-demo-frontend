import React, { useState } from 'react'
import axios from "axios"

const CreateUser = () => {
    // declaring form variable
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [origin, setOrigin] = useState('')
    const [password, setPassword] = useState('')


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
    const handleCreateUser = async () => {
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
                await axios.post("https://express-crud-api.onrender.com/createUser", {
                    username: username,
                    userEmail: email,
                    origin: origin,
                    password: password,
                })
                setMessage("user added successfully")
                setTimeout(() => {
                    setEmail("")
                    setOrigin('')
                    setPassword('')
                    setUserName('')
                    setMessage('')
                }, 2000);
            } catch (error) {
                console.log(`error while creating user ${error}`)
            }

        }


    }
    return (
        <div className='w-full flex justify-center items-center pt-5'>
            <div className='border-2 w-[75%] sm:w-[60%] md:w-[50%] lg:w-[40%] py-10 px-7 items-center justify-center flex flex-col'>
                <h3 className='capitalize text-center font-semibold text-xl underline mb-4'>create  user</h3>
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
                    onClick={handleCreateUser}
                >create user</button>


            </div>

        </div>
    )
}

export default CreateUser