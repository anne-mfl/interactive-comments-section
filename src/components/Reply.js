import React from 'react'
import { replyComment } from '../features/comments'
import { useSelector, useDispatch } from "react-redux";

export default function Reply({ type, comment, setComment, data, parentId, setReplyMode }) {

  const dispatch = useDispatch();
  const currentUserList = useSelector((state) => state.currentUser)
  const currentUser = currentUserList.value.username
  const commentList = useSelector((state) => state.comment)

  const getIdnum = () => {
    const com = Math.max(...commentList.value.map((comment) => Math.max(comment.id)))
    const rep = Math.max(...commentList.value.map((comment) => comment.replies).flat().map((reply) => reply.id))
    if (com > rep) {
      return com + 1
    } else {
      return rep + 1
    }
  }

  const removeFirstWord = (comment) => {
    const indexOfSpace = comment.indexOf(' ')
    return comment.substring(indexOfSpace + 1)
  }

  const checkComment = (comment) => {
    if (comment.trim().split(' ').length === 1) {
      return true
    }
  }

  return (
    <div>
      <section className={`mx-auto bg-white rounded-xl my-5 py-3 px-3 comment ${type === 'reply' && 'ml-6 lg:ml-10'} lg:flex`}>
        <img src={require('../images/avatars/image-' + currentUser + '.png')} alt='avatar' className='h-9 hidden lg:block' />
        <textarea
          onChange={(e) => setComment(e.target.value)}
          defaultValue={`@${data.user.username} `}
          className='border-2 border-lightGray rounded-xl w-full resize-none h-32 focus:outline-none py-3 px-2 text-grayishBlue scrollbar lg:mx-5'
        />
        <div className='flex justify-between items-center mt-3 lg:items-start lg:mt-0'>
          <img src={require('../images/avatars/image-' + currentUser + '.png')} alt='avatar' className='h-9 lg:hidden' />
          <button
            className={`bg-moderateBlue text-white rounded-xl font-medium px-7 py-3 ${checkComment(comment) && 'opacity-50'} lg:`}
            disabled={checkComment(comment)}
            onClick={() => {
              dispatch(replyComment({
                id: getIdnum(),
                content: comment.split('')[0] === '@' ? removeFirstWord(comment) : comment,
                createdAt: Date(),
                score: 0,
                parentId: type === 'comment' ? data.id : type === 'reply' && parentId,
                replyingTo: data.user.username,
                user: {
                  image: {
                    png: '',
                    webp: ''
                  },
                  username: currentUser
                }
              }))
              setComment('')
              setReplyMode(false)
            }}>
            REPLY</button>
        </div>
      </section>
    </div>
  )
}
