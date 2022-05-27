import { Routes, Route } from "react-router-dom";
import Auth from "./containers/Auth";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
