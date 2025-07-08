import TodoBoard from "./components/TodoBoard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <TodoBoard />
      <ToastContainer />
    </>
  );
}

export default App;
