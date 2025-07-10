import TodoBoard from "./components/TodoBoard";
import { Toaster } from "sonner";
function App() {
  return (
    <>
      <TodoBoard />
      <Toaster position="top-right" closeButton />
    </>
  );
}

export default App;
