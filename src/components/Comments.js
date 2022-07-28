import React from 'react'
import moment from 'moment';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editComment, deleteComment, replyComment, deleteRepliedComment, editRepliedComment } from '../features'

import replyIcon from '../images/icon-reply.svg'
import editIcon from '../images/icon-edit.svg'
import deleteIcon from '../images/icon-delete.svg'
import Counter from './Counter';

export default function Comments() {

  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState({ num: null })
  const [replyMode, setReplyMode] = useState({ num: null })
  const [comment, setComment] = useState('')
  const [replyToReplyMode, setReplyToReplyMode] = useState({ num: null })
  const [editReplyMode, setEditReplyMode] = useState({ num: null })

  const commentList = useSelector((state) => state.comment)
  const currentUserList = useSelector((state) => state.currentUser)
  const currentUser = currentUserList.value.username
  // const currentUser = 'amyrobson'

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
    <div>
      {commentList.value.map((data) => (
        <div key={data.id} className='w-11/12 mx-auto'>
          <section className='bg-white  py-5 px-3 rounded-xl mb-5'>
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
                  defaultValue={data.content}
                  onChange={(e) => setComment(e.target.value)}
                  className='border-2 border-lightGray rounded-xl w-full resize-none h-32 focus:outline-none py-3 px-2 text-grayishBlue scrollbar'
                />
                <div className='flex justify-end'>
                  <button
                    className='bg-moderateBlue text-white rounded-xl font-medium px-7 py-3 mt-2'
                    onClick={() => {
                      dispatch(editComment({
                        id: data.id,
                        content: comment
                      }))
                      setComment('')
                      setEditMode(false)
                    }}>UPDATE</button>
                </div>
              </div>
              :
              <p className='text-grayishBlue my-6'>{data.content}</p>
            }


            <div className='flex justify-between'>
              <Counter type={'comment'} data={data} />
              {currentUser === data.user.username ?
                <div className='flex'>
                  <button
                    className='flex items-center mr-4'
                    onClick={() => dispatch(deleteComment(data.id))}>
                    <img src={deleteIcon} alt='reply icon' className='' />
                    <h3 className='text-softRed font-medium ml-1'>Delete</h3>
                  </button>
                  <button
                    className='flex items-center'
                    onClick={() => setEditMode({ num: data.id })}
                    disabled={editMode.num}
                  >
                    <img src={editIcon} alt='reply icon' className='' />
                    <h3 className='text-moderateBlue font-medium ml-1'>Edit</h3>
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
            <section className='w-11/12 mx-auto bg-white ml-10 rounded-xl my-5 py-3 px-3'>
              <textarea
                onChange={(e) => setComment(e.target.value)}
                defaultValue={`@${data.user.username} `}
                className='border-2 border-lightGray rounded-xl w-full resize-none h-32 focus:outline-none py-3 px-2'
              />
              <div className='flex justify-between items-center mt-3'>
                <img src={require('../images/avatars/image-' + currentUser + '.png')} alt='avatar' className='h-9' />
                <button
                  className='bg-moderateBlue text-white rounded-xl font-medium px-7 py-3'
                  onClick={() => {
                    dispatch(replyComment({
                      id: getIdnum(),
                      content: comment,
                      createdAt: Date(),
                      score: 0,
                      parentId: data.id,
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
          }


          {/* -----------------------以下リプライのmap---------------------- */}

          {data.replies.map((reply) => (
            <div key={reply.id} >
              <section className='ml-10 bg-white py-5 px-3 rounded-xl mb-5'>
                <div className='flex items-center'>
                  <img src={require('../images/avatars/image-' + reply.user.username + '.png')} alt='avatar' className='h-10' />
                  <h1 className='font-semibold mx-3 text-darkBlue'>{reply.user.username}</h1>
                  {currentUser === reply.user.username &&
                    <p className='bg-moderateBlue text-white rounded-sm px-2 mr-3 text-sm w-fit'>you</p>
                  }
                  <h2 className='text-grayishBlue text-sm'>{reply.createdAt.length >= 16 ? moment(reply.createdAt).fromNow() : data.createdAt}</h2>
                </div>

                {editReplyMode && editReplyMode.num === reply.id ?
                  <div className='my-5'>
                    <textarea
                      defaultValue={reply.content.split('')[0] !== '@' ? `@${reply.replyingTo} ${reply.content}` : reply.content}
                      onChange={(e) => setComment(e.target.value)}
                      className='border-2 border-lightGray rounded-xl w-full resize-none h-32 focus:outline-none py-3 px-2 text-grayishBlue scrollbar'
                    />
                    <div className='flex justify-end'>
                      <button
                        className='bg-moderateBlue text-white rounded-xl font-medium px-7 py-3 mt-2'
                        onClick={() => {
                          dispatch(editRepliedComment({
                            id: reply.id,
                            content: comment
                          }))
                          setComment('')
                          setEditReplyMode(false)
                        }}>UPDATE</button>
                    </div>
                  </div>
                  :
                  <p className='text-grayishBlue my-6'>
                    {reply.content.split('')[0] !== '@' ? `@${reply.replyingTo} ${reply.content}` : reply.content}
                  </p>
                }

                <div className='flex justify-between'>
                  <Counter type={'reply'} data={reply} />
                  {currentUser === reply.user.username ?
                    <div className='flex'>
                      <button
                        className='flex items-center mr-4'
                        onClick={() => dispatch(deleteRepliedComment(reply.id))}
                      ><img src={deleteIcon} alt='reply icon' className='' />
                        <h3 className='text-softRed font-medium ml-1'>Delete</h3>
                      </button>
                      <button
                        className='flex items-center'
                        onClick={() => setEditReplyMode({ num: reply.id })}
                        disabled={editReplyMode.num}
                      >
                        <img src={editIcon} alt='reply icon' className='' />
                        <h3 className='text-moderateBlue font-medium ml-1'>Edit</h3>
                      </button>
                    </div>
                    :
                      <button
                        className='flex items-center'
                        onClick={() => setReplyToReplyMode({ num: reply.id })}
                        disabled={replyToReplyMode.num === reply.id}
                      >
                        <img src={replyIcon} alt='reply icon' className='' />
                        <h3 className='text-moderateBlue font-medium mx-2'>Reply</h3>
                      </button>
                  }
                </div>
              </section>

              {replyToReplyMode && replyToReplyMode.num === reply.id &&
                <section className='bg-white ml-10 rounded-xl my-5 py-3 px-3'>
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    defaultValue={`@${reply.replyingTo} `}
                    className='border-2 border-lightGray rounded-xl w-full resize-none h-32 focus:outline-none py-3 px-2'
                  />
                  <div className='flex justify-between items-center mt-3'>
                    <img src={require('../images/avatars/image-' + currentUser + '.png')} alt='avatar' className='h-9' />
                    <button
                      className='bg-moderateBlue text-white rounded-xl font-medium px-7 py-3'
                      onClick={() => {
                        dispatch(replyComment({
                          id: getIdnum(),
                          content: comment,
                          createdAt: Date(),
                          score: 0,
                          parentId: data.id,
                          replyingTo: reply.replyingTo,
                          user: {
                            image: {
                              png: '',
                              webp: ''
                            },
                            username: currentUser
                          }
                        }))
                        setComment('')
                        setReplyToReplyMode(false)
                      }}>REPLY</button>
                  </div>
                </section>
              }

            </div>
          ))}
        </div>
      ))}

    </div>
  )
}
