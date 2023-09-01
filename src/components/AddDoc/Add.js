import React, {  useState } from 'react'
import { Modal } from 'antd';
import { DatePicker, Space } from 'antd'
import { useAuthContext } from '../../pages/Context/AuthContext'
import { doc, setDoc, } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import { UesDoxContext } from '../../pages/Context/DoxContext';
const initialdate = { startDate: "", endDate: "" };
const initialState = { title: "", description: "", list:'' };
const colorArr = ["#FDF2B3", "#D1EAED", "#FFDADA", "#FFD4A9", "#f5ebe0", "#b8dbd9", "#FDF2B3", "#b7e4c7"]
const { RangePicker } = DatePicker;

export default function Add() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(initialState)
  const { user } = useAuthContext()
  const { listDocuments } = UesDoxContext()
  const [confirmLoading, setConfirmLoading] = useState(false);



  // --------------------- handle date ------------------
  const [date, setDate] = useState([]);
  const [objdate, setObjDate] = useState(initialdate);
  const handleDate = (_, dateString) => {
    setDate(dateString)

  }
  // -------------------------handle date end

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }
  // ---------------------- add task modle -------------------
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setConfirmLoading(false);
    setObjDate(initialState)
    setDate([])
    setState(initialState)
    window.notify("You Cancel the task", "info")
    setOpen(false);
  };


  const handleOk = async () => {
    let { title, description ,list} = state
    let todo = { title, description ,list }
    let { startDate, endDate } = objdate
    startDate = date[0]
    endDate = date[1]
    todo.startDate = startDate
    todo.endDate = endDate
    todo.randumId = Math.random().toString(36).slice(2)
    todo.bgColor = colorArr[Math.floor(Math.random() * (7 + 1))]
    todo.dateCreated = new Date().getTime()
    todo.createdBy = {
      email: user.email,
      uid: user.uid,
    }
    if (title.length < 3) {
      return window.notify("Plz enter title!", "info")
    }
    if (description.length < 10) {
      return window.notify("Plz enter description!", "info")
    }
    setConfirmLoading(true);
    try {
      await setDoc(doc(firestore, "todos", todo.randumId), todo);
      setConfirmLoading(false);
      setOpen(false);
      window.notify("Add Task Successuly", "success")
    } catch (err) {
      window.notify("Task is not added", "error")
      setConfirmLoading(false);
    }
    setState(initialState)
    setObjDate(initialState)
    setDate([])
  };
  return (
    <>

      <div className="col-12 col-md-6 col-lg-4">
        <div className="box1 my-3 mx-sm-0 mx-md-0 mx-lg-3" onClick={showModal}>
          <a className='Plus nav-link'>+</a>
        </div>
      </div>


      {/* --------------- Modal --------------- */}
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="row">
          <div className="col">
            <label htmlFor="title" className='fw-bold'>title</label> <br />
            <input type="text" placeholder='Enter title' id='title' className='w-100 form-control' value={state.title} name='title' onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="floatingTextarea2" className='fw-bold'>Description</label> <br />
            <div className="form-floating">
              <textarea className="form-control" id="floatingTextarea2" style={{ height: "100px" }} name='description' value={state.description} onChange={handleChange}></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6 mt-3">
            <label className='fw-bold '>Select Date</label> <br />
            <Space direction="vertical" size={12}>
              <RangePicker
                allowClear
                onChange={handleDate}
              />
            </Space>
          </div>
          <div className="col-6 mt-4">
            <select className="form-select form-select-lg mb-3" name='list' onChange={handleChange} >
              <option  value='personal'>Personal</option>
              {
                listDocuments.map((doc, i) => {
                  if (doc.createdBy.email === user.email) {
                  return (
                    <option value={doc.listName} key={i}>{doc.listName}</option>
                  )
                  }
                })

              }
             
            </select>
          </div>

        </div>
      </Modal>
    </>
  )
}
