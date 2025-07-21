import './App.css';
import { useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Active from './components/Active.jsx';
import Completed from './components/Completed.jsx';
import AllTask from './components/AllTask.jsx';
import Layout from './components/Layout.jsx';
import TaskContext from './context/TaskContext.js';
import TokenContext from './context/TokenContext.js';
import taskReducer from './reducer/taskReducer.js';
import tokenReducer from './reducer/tokenReducer.js';
import userReducer from './reducer/userReducer.js';
import Header from './components/Header/Header.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import ForgotPassword from './components/forgotPassword/ForgotPassword.jsx';
import ResetPassword from './components/forgotPassword/ResetPassword.jsx';
import axios from './Axios/axios.js';
function App() {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const [tasks, dispatch] = useReducer(taskReducer, [])
  const [userToken, tokenDispatch] = useReducer(tokenReducer, token)
  const [user, userDispatch] = useReducer(userReducer, {})
  useEffect(() => {
    console.log("App.js");
    const fetchUser = async () => {
      try {
        console.log("fetchUser");
        const res = await axios.get("/user/getUser",{
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })
        //tokenDispatch({type: "SET_TOKEN", payload: res.token})
        console.log("res.data: ", res.data);
        userDispatch({type: "SET_USER", payload:res.data.user})
      } catch (error) {
        console.log(error);
      }
    }
    if (userToken) {
      fetchUser()
    }
  },[userToken])
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log("fetchTasks");
        const res = await axios.get("/shift/getShift", {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })
        dispatch({ type: "SET_TASK", payload: res.data })
      } catch (error) {
        console.log(error);
      }
    }
    if (userToken) {
      fetchTasks()
    }
  },[userToken])
  return (
    <BrowserRouter>
      <TokenContext.Provider value={{userToken, tokenDispatch, user, userDispatch}}>
        <TaskContext.Provider value={{ tasks, dispatch }}>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path='/' element={token ? <Layout /> : <Login />}>
                <Route index element={<AllTask />} />
                <Route path="active" element={<Active />} />
                <Route path="completed" element={<Completed />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
            </Route>
          </Routes>
        </TaskContext.Provider>
      </TokenContext.Provider>

    </BrowserRouter>
  );
}

export default App;
