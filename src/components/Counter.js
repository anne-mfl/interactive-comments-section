import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { incrementScore, decrementScore } from '../features'
import minusIcon from '../images/icon-minus.svg'
import plusIcon from '../images/icon-plus.svg'

export default function Counter({ data, type }) {

  const dispatch = useDispatch();
  const currentUserList = useSelector((state) => state.currentUser)
  const currentUser = currentUserList.value.username

  return (
    <div className='bg-veryLightGray max-w-fit flex py-3 rounded-xl'>
      <button
        className='px-4'
        onClick={() => dispatch(incrementScore({
          id: data.id,
          author: data.user.username,
          currentUser,
          type
        }))}>
        <img src={plusIcon} alt='plus button' className='' />
      </button>
      <p className='text-moderateBlue font-semibold'>{data.score}</p>
      <button
        className='px-4'
        onClick={() => dispatch(decrementScore({
          id: data.id,
          author: data.user.username,
          currentUser,
          type
        }))}>
        <img src={minusIcon} alt='minus button' className='' />
      </button>
    </div >
  )
}
