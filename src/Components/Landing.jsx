// boiler plate landing page with 2 buttons for login as alumni and login as institute

import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {

    return (
        <div className='h-screen flex justify-center items-center gap-36'>
        <div className='flex gap-[30px]'>
            <div className='text-5xl font-bold'>DeepTrace</div>
        </div>
        <div className='bg-[#252525] px-12 py-16 rounded-[20px]'>
            <div>
                <div className='text-sm font-semibold text-[#787878]'>Log In</div>
                <div className='text-3xl font-semibold'>Welcome Back!</div>
            </div>
    
            <div className='mt-8'>
                <div className='text-md font-semibold'>Log in as</div>
            </div>
    
            <div className='mt-8' >
                <Link to="/login" className='w-[360px] flex gap-4 justify-center items-center px-4 py-2.5 rounded-full border border-1 border-[#f1f3f515] text-smd hover:bg-[#f1f3f505]'> Log In as Alumni</Link>
            </div>
    
            <div className='mt-8' >
                <Link to="/instLogin" className='w-[360px] flex gap-4 justify-center items-center px-4 py-2.5 rounded-full border border-1 border-[#f1f3f515] text-smd hover:bg-[#f1f3f505]'> Log In as Institute</Link>
            </div>
        </div>
        </div>
    )
    }

export default Landing