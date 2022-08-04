import React, { useState } from 'react'
import { addComment } from '../features/comments'
import { useSelector, useDispatch } from "react-redux";

export default function AddComment() {

  const [comment, setComment] = useState('')

  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment)
  const currentUserList = useSelector((state) => state.currentUser)
  const currentUser = currentUserList.value.username

  const getIdnum = () => {
    const com = Math.max(...commentList.value.map((comment) => Math.max(comment.id)))
    const rep = Math.max(...commentList.value.map((comment) => comment.replies).flat().map((reply) => reply.id))
    if (com > rep) {
      return com + 1
    } else {
      return rep + 1
    }
  }

  return (
    <div className='bg-white rounded-xl py-5 px-3'>
      <textarea
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder='Add a comment...'
        className='border-2 border-lightGray rounded-xl w-full resize-none h-32 focus:outline-none py-3 px-2 scrollbar'
      />

      <div className='flex justify-between items-center mt-3'>
        <img src={require('../images/avatars/image-' + currentUser + '.png')} alt='avatar' className='h-9' />
        <button
          className={`bg-moderateBlue text-white rounded-xl font-medium px-7 py-3 ${comment.trim() === '' && 'opacity-50'}`}
          disabled={comment.trim() === ''}
          onClick={() => {
            dispatch(addComment({
              id: getIdnum(),
              content: comment,
              createdAt: Date(),
              score: 0,
              user: {
                image: {
                  png: '',
                  webp: ''
                },
                username: currentUser
              },
              replies: []
            }))
            setComment('')
          }
          }>SEND</button>
      </div>
    </div>
  )
}
