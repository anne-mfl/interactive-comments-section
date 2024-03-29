import React from 'react'
import Comment from './Comment';
import { useSelector } from "react-redux";

export default function New() {

  const commentList = useSelector((state) => state.comment)

  return (
    <div className=''>
      {commentList.value.map((comment) => (
        <>
          <Comment data={comment} type={'comment'} key={comment.id} />

          <div className='border-l-2 border-veryLightGrey lg:ml-10'>
            {comment.replies.map((reply) => (
              <Comment data={reply} type={'reply'} parentId={comment.id} key={reply.id} />
            ))}
          </div>
        </>
      ))}

    </div>
  )
}



