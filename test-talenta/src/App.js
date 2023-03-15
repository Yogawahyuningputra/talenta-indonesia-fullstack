import React, { useEffect, useContext } from 'react';
import { UserContext } from './context/userContext';
import { API, setAuthToken } from './config/api';
import Routers from './config/routes';

function App() {

  const [state, dispatch] = useContext(UserContext)


  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
      checkAuth()

    }

  }, [])

  const checkAuth = async () => {
    try {
      const response = await API.get('/checkAuth')
      let payload = response.data.data

      payload.token = localStorage.token
      dispatch({
        type: 'AUTH_SUCCESS',
        payload,
      })
    } catch (error) {
      dispatch({
        type: 'AUTH_ERROR'
      })
      console.log("check user failed", error)
    }
  }
  return (
    <>
      <Routers />
    </>
  );
}

export default App;
