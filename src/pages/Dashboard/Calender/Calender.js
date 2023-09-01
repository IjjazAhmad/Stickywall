import React, { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { UesDoxContext } from '../../Context/DoxContext'
import { useAuthContext } from '../../Context/AuthContext'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

let Events = []

export default function Calender() {
  const {user} =useAuthContext()
  const [allEvents, setAllEvents] = useState([])
  const [show, setShow] = useState(true)
  const { documents } = UesDoxContext()

  const getFun = () => {
    Events = []
    documents.map((doc) => {
      if (doc.createdBy.email === user.email) {
      let totaldoc = { title: doc.title, Description: doc.description, start: doc.startDate, end: doc.endDate }
      Events.push(totaldoc)
      }
      setAllEvents(Events)
    })
    setShow(false)
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col my-3">
            <h1 >Calender</h1>
            {show ? <button className='btn btn-primary text-white' onClick={getFun} >Show Task</button> : <div></div>}

            <div className="my-3">
              <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
              />
            </div>
          </div>
        </div>
      </div>


    </>
  )
}
