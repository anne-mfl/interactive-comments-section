import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { incrementScore, decrementScore } from '../features/comments'
import minusIcon from '../images/icon-minus.svg'
import plusIcon from '../images/icon-plus.svg'

export default function Counter({ data, type }) {

  const dispatch = useDispatch();
  const currentUserList = useSelector((state) => state.currentUser)
  const currentUser = currentUserList.value.username


  const [voted, setVoted] = useState({ [data.id]: false })
  

  return (
    <div className='bg-veryLightGray max-w-fit flex py-3 rounded-xl lg:flex-col lg:items-center lg:px-4 lg:ml-2 lg:mr-6'>
      <button
        className='px-4 lg:pb-4 lg:px-0'
        onClick={() => {
          if (voted[data.id] === false) {
            dispatch(incrementScore({
              id: data.id,
              author: data.user.username,
              currentUser,
              type
            }))
            setVoted({ [data.id]: true })
          }
        }}
      >
        <img src={plusIcon} alt='plus button' className='' />
      </button>
      <p className={`text-moderateBlue font-semibold ${voted[data.id] === true && 'scored'} lg:w-fit lg:mx-auto`}>{data.score}</p>
      <button
        className='px-4 lg:pt-4 lg:px-0'
        onClick={() => {
          if (voted[data.id] === false) {
            dispatch(decrementScore({
              id: data.id,
              author: data.user.username,
              currentUser,
              type
            }))
            setVoted({ [data.id]: true })
          }
        }}
      >
        <img src={minusIcon} alt='minus button' className='' />
      </button>
    </div >
  )
}
