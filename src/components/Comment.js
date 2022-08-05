import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import { editComment } from '../features/comments'
import replyIcon from '../images/icon-reply.svg'
import editIcon from '../images/icon-edit.svg'
import deleteIcon from '../images/icon-delete.svg'
import Counter from './Counter';
import DeleteModal from './DeleteModal';
import Reply from './Reply';

export default function System({ data, type, parentId }) {

  const [editMode, setEditMode] = useState({ num: null })
  const [replyMode, setReplyMode] = useState({ num: null })
  const [deleteMode, setDeleteMode] = useState({ num: null })
  const [comment, setComment] = useState('')

  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment)
  const currentUserList = useSelector((state) => state.currentUser)
  const currentUser = currentUserList.value.username

  useEffect(() => {
    deleteMode.num
      ? document.body.classList.add("overflow--hidden")
      : document.body.classList.remove("overflow--hidden");
  }, [commentList, deleteMode]);

  
  return (
    <>
      <div className='comment'>

        <section className={`${type === 'reply' && 'ml-6 lg:ml-10'} bg-white  py-5 px-3 rounded-xl mb-5 lg:flex lg:py-6`}>

          <div className='hidden lg:block'>
            <Counter type={type} data={data} />
          </div>

          <div className='w-full'>

            <div className='lg:flex lg:justify-between'>
              <div className='flex items-center'>
                <img src={require('../images/avatars/image-' + data.user.username + '.png')} alt='avatar' className='h-10' />
                <h1 className='font-semibold mx-4 text-darkBlue'>{data.user.username}</h1>
                {currentUser === data.user.username &&
                  <p className='bg-moderateBlue text-white rounded-sm px-2 mr-3 text-sm w-fit'>you</p>
                }
                <h2 className='text-grayishBlue text-sm'>{data.createdAt.length >= 16 ? moment(data.createdAt).fromNow() : data.createdAt}</h2>
              </div>
              {currentUser === data.user.username ?
                <div className='hidden lg:flex '>
                  <button
                    className='flex items-center mr-4'
                    onClick={() => setDeleteMode({ num: data.id })}
                  >
                    <img src={deleteIcon} alt='reply icon' className='' />
                    <h3 className='text-softRed font-medium ml-1'>Delete</h3>
                  </button>

                  {deleteMode.num && <DeleteModal type={type} deleteMode={deleteMode} setDeleteMode={setDeleteMode} />}

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
                  className='hidden lg:flex lg:items-center'
                  onClick={() => setReplyMode({ num: data.id })}
                  disabled={replyMode.num === data.id}
                >
                  <img src={replyIcon} alt='reply icon' className='' />
                  <h3 className='text-moderateBlue font-medium mx-2'>Reply</h3>
                </button>
              }
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
              <div className='lg:min-w-full'>
                {type === 'reply'
                  ? <div className='my-6 lg:mt-6 lg:mb-1'>
                    <span className='text-moderateBlue font-medium'>@{data.replyingTo}&nbsp;</span>
                    <span className='text-grayishBlue'>{data.content}</span>
                  </div>
                  : <p className='text-grayishBlue my-6 lg:mt-6 lg:mb-1'>{data.content}</p>}
              </div>
            }
          </div>

          {/* ↓↓↓mobile version - footer of each comment↓↓↓ */}
          <div className='flex justify-between lg:hidden'>
            <Counter type={type} data={data} />
            {currentUser === data.user.username ?
              <div className='flex'>
                <button
                  className='flex items-center mr-4'
                  onClick={() => setDeleteMode({ num: data.id })}
                >
                  <img src={deleteIcon} alt='reply icon' className='' />
                  <h3 className='text-softRed font-medium ml-1'>Delete</h3>
                </button>

                {deleteMode.num && <DeleteModal type={type} deleteMode={deleteMode} setDeleteMode={setDeleteMode} />}

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
          {/* ↑↑↑mobile version - footer of each comment↑↑↑ */}
        </section>


        {replyMode && replyMode.num === data.id &&
          <Reply
            type={type}
            comment={comment}
            setComment={setComment}
            data={data}
            parentId={parentId}
            setReplyMode={setReplyMode}
          />}

      </div>
    </>
  )
}
