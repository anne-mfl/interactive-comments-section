import React from 'react'
import { useDispatch } from "react-redux";
import { deleteComment } from '../features/comments'

export default function DeleteModal({type, deleteMode, setDeleteMode}) {

  const dispatch = useDispatch();

  return (
    <div>
        <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black/20 flex justify-center items-center'>
          <div className='w-11/12 bg-white py-5 px-5 rounded-lg h-fit lg:w-96 lg:p-7'>
            <h1 className='font-medium text-lg'>Delete comment</h1>
            <p className='text-grayishBlue pt-4 pb-6'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <div className='flex justify-evenly'>
              <button
                className='bg-grayishBlue  text-white py-3 px-4 rounded-lg font-medium'
                onClick={() => setDeleteMode(false)}>NO, CANCEL</button>
              <button
                className='bg-softRed  text-white py-3 px-4 rounded-lg font-medium'
                onClick={() => {
                  dispatch(deleteComment({
                    id: deleteMode.num,
                    type
                  }))
                  setDeleteMode(false)
                }}
              >YES, DELETE</button>
            </div>
          </div>
        </div>
    </div>
  )
}
