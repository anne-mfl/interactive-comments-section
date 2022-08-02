import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import { editComment, replyComment } from '../features/comments'
import { setDeleteModal } from '../features/deleteModal'
import replyIcon from '../images/icon-reply.svg'
import editIcon from '../images/icon-edit.svg'
import deleteIcon from '../images/icon-delete.svg'
import Counter from './Counter';
import DeleteModal from './DeleteModal';

export default function System({ data, type, parentId }) {

  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState({ num: null })
  const [replyMode, setReplyMode] = useState({ num: null })
  const [comment, setComment] = useState('')
  // console.log('comment==>', comment.split(' ').slice(1))

  const commentList = useSelector((state) => state.comment)
  const currentUserList = useSelector((state) => state.currentUser)
  const currentUser = currentUserList.value.username
  const deleteModal = useSelector((state) => state.deleteModal.value)

  const getIdnum = () => {
    const com = Math.max(...commentList.value.map((comment) => Math.max(comment.id)))
    const rep = Math.max(...commentList.value.map((comment) => comment.replies).flat().map((reply) => reply.id))
    if (com > rep) {
      return com + 1
    } else {
      return rep + 1
    }
  }

  const removeFirstWord =(comment)=> {
    const indexOfSpace = comment.indexOf(' ')
    return comment.substring(indexOfSpace + 1)
  }

  const checkComment =(comment)=> {
    if (comment.trim().split(' ').length === 1) {
      return true
    }
  }

  useEffect(() => {
    deleteModal
      ? document.body.classList.add("overflow--hidden")
      : document.body.classList.remove("overflow--hidden");
  }, [commentList, deleteModal]);


  return (
    <>
      <div className='comment'>
        <section className={`${type === 'reply' && 'ml-6 lg:ml-16'} bg-white  py-5 px-3 rounded-xl mb-5`}>
          <div className='flex items-center'>
            <img src={require('../images/avatars/image-' + data.user.username + '.png')} alt='avatar' className='h-10' />
            <h1 className='font-semibold mx-4 text-darkBlue'>{data.user.username}</h1>
            {currentUser === data.user.username &&
              <p className='bg-moderateBlue text-white rounded-sm px-2 mr-3 text-sm w-fit'>you</p>
            }
            <h2 className='text-grayishBlue text-sm'>{data.createdAt.length >= 16 ? moment(data.createdAt).fromNow() : data.createdAt}</h2>
          </div>

          {editMode && editMode.num === data.id ?
            <div className='my-5'>
              <textarea
                defaultValue={type === 'reply' && data.content.split('')[0] !== '@' ? `@${data.replyingTo} ${data.content}` : data.content}
                onChange={(e) => setComment(e.target.value)}
                className='border-2 border-lightGray rounded-xl w-full resize-none h-32 focus:outline-none py-3 px-2 text-grayishBlue scrollbar'
              />
              <div className='flex justify-end'>
                <button
                  className={`bg-moderateBlue text-white rounded-xl font-medium px-7 py-3 mt-2 ${!comment && 'opacity-50'}`}
                  disabled={!comment}
                  onClick={() => {
                    dispatch(editComment({
                      id: data.id,
                      content: comment,
                      type
                    }))
                    setComment('')
                    setEditMode(false)
                  }}>UPDATE</button>
              </div>
            </div>
            :
            <>
              {type === 'reply' 
                ? <div className='my-6'>
                  <span className='text-moderateBlue font-medium'>@{data.replyingTo}</span> <span className='text-grayishBlue'>{data.content}</span>
                </div>
                : <p className='text-grayishBlue my-6'>{data.content}</p>}
            </>
          }


          <div className='flex justify-between'>
            <Counter type={type} data={data} />
            {currentUser === data.user.username ?
              <div className='flex'>
                <button
                  className='flex items-center mr-4'
                  onClick={() => dispatch(setDeleteModal(true))}
                >
                  <img src={deleteIcon} alt='reply icon' className='' />
                  <h3 className='text-softRed font-medium ml-1'>Delete</h3>
                </button>

                {/* --------- delete modal --------- */}
                {deleteModal && <DeleteModal data={data} type={type} />}

                <button
                  className='flex items-center'
                  onClick={() => setEditMode({ num: data.id })}
                  disabled={editMode.num}
                >
                  <img src={editIcon} alt='reply icon' className={editMode.num && 'opacity-30'} />
                  <h3 className={`text-moderateBlue font-medium ml-1 ${editMode.num && 'opacity-30'}`}>Edit</h3>
                </button>
              </div>
              :
              <button
                className='flex items-center'
                onClick={() => setReplyMode({ num: data.id })}
                disabled={replyMode.num === data.id}
              >
                <img src={replyIcon} alt='reply icon' className='' />
                <h3 className='text-moderateBlue font-medium mx-2'>Reply</h3>
              </button>
            }
          </div>
        </section>

        {replyMode && replyMode.num === data.id &&
          <section className={`mx-auto bg-white rounded-xl my-5 py-3 px-3 ${type === 'reply' && 'ml-6'}`}>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              defaultValue={`@${data.user.username} `}
              className='border-2 border-lightGray rounded-xl w-full resize-none h-32 focus:outline-none py-3 px-2 text-grayishBlue scrollbar'
            />
            <div className='flex justify-between items-center mt-3'>
              <img src={require('../images/avatars/image-' + currentUser + '.png')} alt='avatar' className='h-9' />
              <button
                className={`bg-moderateBlue text-white rounded-xl font-medium px-7 py-3 ${checkComment(comment) && 'opacity-50'}`}
                disabled={checkComment(comment)}
                onClick={() => {
                  dispatch(replyComment({
                    id: getIdnum(),
                    content: comment.split('')[0] === '@' ? removeFirstWord(comment) : comment,
                    createdAt: Date(),
                    score: 0,
                    parentId: type === 'comment' ? data.id : type === 'reply' && parentId,
                    replyingTo: data.user.username,
                    // replyingTo: type === 'comment' ? data.user.username : type === 'reply' && data.replyingTo,
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
        }
      </div>
    </>
  )
}
