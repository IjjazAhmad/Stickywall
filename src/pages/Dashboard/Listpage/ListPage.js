import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { UesDoxContext } from '../../Context/DoxContext'
import Add from '../../../components/AddDoc/Add'
import { useAuthContext } from '../../Context/AuthContext'

export default function ListPage() {
  const { user } = useAuthContext()
  let { listId } = useParams()
  const { documents } = UesDoxContext()
  const [listDoc, setListDoc] = useState([])



  const getFun = () => {
    let today = []
    today = documents.filter((doc) => {
      if (doc.list == listId) {
        return doc
      }
    })
    setListDoc(today)
  }

  useEffect(() => {
    getFun()
  }, [listId])
  return (
    <>
      <div className="container">
        <div className="row">

          {
            listDoc.map((doc, i) => {
              if (doc.createdBy.email === user.email) {
                return <>

                  <div className="col-12 col-md-6 col-lg-4 " >
                    <div className="box my-3 mx-sm-0 mx-md-0 mx-lg-3" style={{ backgroundColor: `${doc.bgColor}` }} key={i} >
                      <div className="boxDescription">
                        <h3>{i + 1}</h3>
                        <h4>{doc.title}</h4>
                        <p>{doc.description}</p>
                      </div>
                      <span className='content align-bottom'>Email : {doc.createdBy.email} <br />List : {doc.list} <br />{doc.startDate} <b> To </b> {doc.endDate}
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
