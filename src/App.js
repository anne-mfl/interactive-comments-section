import "./App.css";
import AddComment from './components/AddComment'
import Comments from "./components/Comments";

function App() {

  return (
    <div className='font-rubik bg-veryLightGray py-12'>
      <div className=' w-11/12 mx-auto lg:w-6/12'>
        <Comments />
        <AddComment />
      </div>
    </div>
  );
}

export default App;
