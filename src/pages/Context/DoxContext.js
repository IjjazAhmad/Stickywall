import React, { createContext, useContext, useEffect, useState } from 'react'
import { collection, getDocs} from 'firebase/firestore';
import { firestore } from '../../config/firebase'


const DoxContext = createContext()
export default function DoxContextProvider(props) {
 
  const [documents, setDocuments] = useState([])
  const [isApploading, setisApploading] = useState(true)
  const [listDocuments, setListDocuments] = useState([])
  // -------------------------------- get task doc ------------------
  useEffect(() => {
    fatchDoc()
  }, [documents])

  const fatchDoc = async () => {
    const querySnapshot = await getDocs(collection(firestore, "todos"));
    const array = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let data = doc.data()
      array.push(data)
    });
    setDocuments(array)
  }
  useEffect(() => {
    fatchListDoc()
    
  }, [listDocuments])

  const fatchListDoc = async () => {
    const querySnapshot = await getDocs(collection(firestore, "list"));
    const array = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let data = doc.data()
      array.push(data)
    });
    setListDocuments(array)
    setTimeout(() => {
      setisApploading(false)
    }, 10);
  }


  return (
    <DoxContext.Provider value={{ documents, listDocuments, isApploading ,setDocuments}}>
      {props.children}
    </DoxContext.Provider>
  )
}

export const UesDoxContext = () => useContext(DoxContext)