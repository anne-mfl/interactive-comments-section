import React from 'react'
import Avatar from '../images/avatars/image-juliusomo.png'

export default function AddComment({currentUser}) {
  return (
    <div className='w-11/12 mx-auto bg-white rounded-xl py-5 px-3'>
      <textarea placeholder='Add a comment...' className='border-2 border-lightGray rounded-xl w-full resize-none h-32 focus:outline-none py-3 px-2' />

      <div className='flex justify-between items-center mt-3'>
      <img src={require('../images/avatars/image-' + currentUser + '.png')} alt='avatar' className='h-9'/>
      <button className='bg-moderateBlue text-white rounded-xl font-medium px-7 py-3'>SEND</button>
      </div>
    </div>
  )
}
