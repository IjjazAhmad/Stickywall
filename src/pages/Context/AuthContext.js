import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { auth, firestore } from '../../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const AuthContext = createContext()
const initialState = { isAuth: false , user:{}}
const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return {isAuth: true, user: payload.user }
    case "LOGOUT":
      return initialState
    default:
      return state
  }

}
export default function AuthContextProvider(props) {
  const [isAppLoading, setIsAppLoading] = useState(true)
  const [state, dispatch] = useReducer(reducer , initialState)
useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      readUserProfile(user)
    }else{
      setIsAppLoading(false)
    } 
  });
},[])
const readUserProfile = async (user) => {
  const docRef = doc(firestore, "users", user.uid);
  const docSnap = await getDoc(docRef);

  // console.log('auth user', user)
  if (docSnap.exists()) {
      const user = docSnap.data()
      // console.log('user', user)
      dispatch({ type: "LOGIN", payload: { user } })
  } else {
      window.notify("User data not found", "error")
      console.log("User data not found")
  }
  setIsAppLoading(false)
}
 
  return (
    <AuthContext.Provider value={{ ...state, dispatch, isAppLoading, readUserProfile }} >
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)