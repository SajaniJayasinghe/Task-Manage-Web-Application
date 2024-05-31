import { Routes, Route } from "react-router-dom";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CreateTasks from "./components/Tasks/CreateTasks";
import TaskDetails from "./components/Tasks/TaskDetails";
import CompletedTasks from "./components/Tasks/CompletedTasks";
import EditTasks from "./components/Tasks/EditTasks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/createtasks" element={<CreateTasks />} />
      <Route path="/taskdetails" element={<TaskDetails />} />
      <Route path="/completedtasks" element={<CompletedTasks />} />
      <Route path="/edittask" element={<EditTasks />} />
    </Routes>
  );
}

export default App;
