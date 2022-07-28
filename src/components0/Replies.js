import React from 'react'
import editIcon from '../images/icon-edit.svg'
import deleteIcon from '../images/icon-delete.svg'
import minusIcon from '../images/icon-minus.svg'
import plusIcon from '../images/icon-plus.svg'
import replyIcon from '../images/icon-reply.svg'

export default function Replies({ replies, currentUser }) {

  return (
    <div className='border-l-2 border-lightGray'>

      {replies.map((reply) => (
        <div key={reply.content}>
          <div className='bg-white py-5 px-3 rounded-xl mb-5 ml-3'>
            <div className='flex items-center'>
              <img src={require('../images/avatars/image-' + reply.user.username + '.png')} alt='avatar' className='h-10' />
              <h1 className='font-semibold mx-3 text-darkBlue'>{reply.user.username}</h1>

              {currentUser === reply.user.username &&
                <p className='bg-moderateBlue text-white rounded-sm px-2 mr-3 text-sm'>you</p>
              }

              <h2 className='text-grayishBlue text-sm'>{reply.createdAt}</h2>
            </div>

            <p className='text-grayishBlue my-6'>
              <span className='text-moderateBlue font-medium mr-1'>@{reply.replyingTo}</span>
              {reply.content}
            </p>

            <div className='flex justify-between'>
              <span className='bg-veryLightGray max-w-fit flex py-3 rounded-xl'>
                <button className='px-4'><img src={minusIcon} alt='minus button' className='' /></button>
                <p className='text-moderateBlue font-semibold'>{reply.score}</p>
                <button className='px-4'><img src={plusIcon} alt='plus button' className='' /></button>
              </span>

              {
                currentUser === reply.user.username ?
                  <div className='flex cursor-pointer'>
                    <span className='flex items-center mr-4'>
                      <img src={deleteIcon} alt='reply icon' className='' />
                      <h3 className='text-softRed font-medium ml-1'>Delete</h3>
                    </span>
                    <span className='flex items-center'>
                      <img src={editIcon} alt='reply icon' className='' />
                      <h3 className='text-moderateBlue font-medium ml-1'>Edit</h3>
                    </span>
                  </div>
                  :
                  <span className='flex items-center cursor-pointer'>
                    <img src={replyIcon} alt='reply icon' className='' />
                    <h3 className='text-moderateBlue font-medium mx-2'>Reply</h3>
                  </span>
              }

            </div>
          </div>
        </div>

      ))}
    </div>
  )
}
