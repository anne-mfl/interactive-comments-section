import "./App.css";
// import moment from 'moment';
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addComment, editComment, deleteComment, replyComment, deleteRepliedComment, editRepliedComment, incrementScore, decrementScore, incrementRepliedScore, decrementRepliedScore } from './features'
// import { getCurrentUser } from "./features/currentUser";
import AddComment from './components/AddComment'
import Comments from "./components/Comments";

function App() {

 

  return (
    <div className='font-rubik bg-veryLightGray py-12'>

      {/* <section> */}
      <Comments />

      <AddComment />
      {/* <textarea onChange={(event) => setComment(event.target.value)} />
          <button onClick={() => {
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
          }>comment</button> */}

      {/* </section> */}

    </div>
  );
}

export default App;
