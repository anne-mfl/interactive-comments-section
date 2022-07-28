import { createSlice } from "@reduxjs/toolkit";
import data from '../data.json'

// console.log('state.value', data.comments.map((comment) => comment.replies).flat().map((reply) => reply.id))

export const commentSlice = createSlice({
  name: 'comment',
  initialState: { value: data.comments },
  reducers: {
    addComment: (state, action) => {
      state.value.push(action.payload)
    },
    deleteComment: (state, action) => {
      state.value = state.value.filter((comment) => comment.id !== action.payload)
    },
    editComment: (state, action) => {
      state.value.map((comment) => {
        if (comment.id === action.payload.id) {
          comment.content = action.payload.content
        }
      })
    },

    replyComment: (state, action) => {
      state.value.filter((comment) => comment.id === action.payload.parentId)[0].replies.push(action.payload)
    },
    deleteRepliedComment: (state, action) => {
      state.value.map((comment) =>
        comment.replies = comment.replies.filter((reply) => reply.id !== action.payload)
      )
    },
    editRepliedComment: (state, action) => {
      state.value.map((comment) => {
        comment.replies.flat().map((reply) => {
          if (reply.id === action.payload.id) {
            reply.content = action.payload.content
          }
        })
      })
    },

    
    incrementScore: (state, action) => {
      if (action.payload.type === 'comment') {
        state.value.map((comment) => {
          if (comment.id === action.payload.id && action.payload.currentUser !== action.payload.author) {
            comment.score = comment.score + 1
          }
        })
      } else if (action.payload.type === 'reply') {
        state.value.map((comment) => {
          comment.replies.flat().map((reply) => {
            if (reply.id === action.payload.id && action.payload.currentUser !== action.payload.author) {
              reply.score = reply.score + 1
            }
          })
        })
      }
    },
    decrementScore: (state, action) => {
      if (action.payload.type === 'comment') {
        state.value.map((comment) => {
          if (comment.id === action.payload.id && action.payload.currentUser !== action.payload.author) {
            comment.score = comment.score - 1
          }
        })
      } else if (action.payload.type === 'reply') {
        state.value.map((comment) => {
          comment.replies.flat().map((reply) => {
            if (reply.id === action.payload.id && action.payload.currentUser !== action.payload.author) {
              reply.score = reply.score - 1
            }
          })
        })
      }
    }
  }
})


export const { addComment, editComment, deleteComment, replyComment, deleteRepliedComment, editRepliedComment, incrementScore, decrementScore } = commentSlice.actions
export default commentSlice.reducer;