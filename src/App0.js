import { useState, useEffect } from 'react';
import './App.css';
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import { addComment, editComment, deleteComment, replyComment, deleteRepliedComment, editRepliedComment, incrementScore, decrementScore, incrementRepliedScore, decrementRepliedScore } from './features'

import AddComment from './components/AddComment';
import Comments from './components/Comments';
// import datasrc from './data.json'

function App() {

  const dispatch = useDispatch();

  
  const currentUser = 'amyrobson'

  return (
    <div className="font-rubik bg-veryLightGray py-12">

      <Comments
        currentUser={currentUser}
      />
      <AddComment
        currentUser={currentUser}
      />
    </div>
  );
}

export default App;
