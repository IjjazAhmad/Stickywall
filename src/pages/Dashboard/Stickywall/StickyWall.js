
import React, { useState } from 'react'
import { UesDoxContext } from '../../Context/DoxContext';
import Add from '../../../components/AddDoc/Add';
import { useAuthContext } from '../../Context/AuthContext';
import { firestore } from '../../../config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
export default function StickyWall() {
  const { user } = useAuthContext()
  const { documents, setDocuments } = UesDoxContext()
  const [ delDocId, setdelDocId ] = useState("")
  const handleDelete = async (docs) => {

    setdelDocId(docs.randumId)
   
    try {
      await deleteDoc(doc(firestore, "todos", docs.randumId));
      let newdocument = documents.filter(doc => doc.randumId !== docs.randumId)
      setDocuments(newdocument)
      window.notify("successfuly Deleted ", "success")

    } catch (err) {
      console.log(err);
      window.notify("SomeThing wants worng on deleting user!", "error")

    }

  }
  return (
    <>
      <div className="container">
        <div className="row">
          {
            documents.map((docs, i) => {
              if (docs.createdBy.email == user.email) {
                return <>

                  <div className="col-12 col-md-6 col-lg-4 " key={docs.randumId} >
                    <div className="box my-3 mx-sm-0 mx-md-0 mx-lg-3" style={{ backgroundColor: `${docs.bgColor}` }}  >
                      <div className="boxDescription">
                        <h3>{i + 1}</h3>
                        <h4>{docs.title}</h4>
                        <p>{docs.description}</p>
                      </div>
                      <span className='content align-bottom w-75'>Email : {docs.createdBy.email} <br />List : {docs.list} <br />{docs.startDate} <b> To </b> {docs.endDate}

                        {delDocId !== docs.randumId ?
                          <i className="fa-solid fa-trash float-end" style={{color: "#b0b0b0" , cursor: "pointer"}} onClick={() => { handleDelete(docs) }}></i>
                          :
                          <>
                            <div className="spinner-border" role="status" >
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </>

                        }
                      </span>
                    </div>
                  </div>
                </>
              }
            })
          }
          <Add />

        </div>
      </div>

    </>
  )

}
