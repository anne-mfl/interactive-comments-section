import React from 'react'
// import avatar from '../images/avatars/image-amyrobson.webp'
import minusIcon from '../images/icon-minus.svg'
import plusIcon from '../images/icon-plus.svg'
import replyIcon from '../images/icon-reply.svg'
// import editIcon from '../images/icon-edit.svg'
// import deleteIcon from '../images/icon-delete.svg'
import data from '../data.json'
import Replies from './Replies'

export default function Comments({currentUser}) {


  return (
    <>
      <div className='w-11/12 mx-auto'>

        {data.comments.map((comment) => (
          <div key={comment.content}>
            <div className='bg-white  py-5 px-3 rounded-xl mb-5' >
              <div className='flex items-center'>
                <img src={require('../images/avatars/image-' + comment.user.username + '.png')} alt='avatar' className='h-10' />
                <h1 className='font-semibold mx-4 text-darkBlue'>{comment.user.username}</h1>
                <h2 className='text-grayishBlue text-sm'>{comment.createdAt}</h2>
              </div>

              <p className='text-grayishBlue my-6'>{comment.content}</p>

              <div className='flex justify-between'>
                <span className='bg-veryLightGray max-w-fit flex py-3 rounded-xl'>
                  <button className='px-4'><img src={minusIcon} alt='minus button' className='' /></button>
                  <p className='text-moderateBlue font-semibold'>{comment.score}</p>
                  <button className='px-4'><img src={plusIcon} alt='plus button' className='' /></button>
                </span>

                <span className='flex items-center cursor-pointer'>
                  <img src={replyIcon} alt='reply icon' className='' />
                  <h3 className='text-moderateBlue font-medium mx-2'>Reply</h3>
                </span>
              </div>
            </div>


          {
            comment.replies.length >= 1 &&
            <Replies
             replies={comment.replies}
             currentUser={currentUser}
             />
          }

          </div>
        ))
        }

       

      </div>
    </>
  )
}
