import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DoubleRightOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Input, Divider, Space } from 'antd';

import { Link } from 'react-router-dom';
import Routes from './Routes';
import { signOut } from 'firebase/auth';
import { useAuthContext } from '../../pages/Context/AuthContext'
import { auth, firestore } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { UesDoxContext } from '../Context/DoxContext';
const { Header, Sider, Content } = Layout;
const initalState = { listName: "", listColor: "#bc6c25" ,search:""}

export default function Sidbar() {
  const [state, setState] = useState(initalState)
  const [isSpiner, setisSpiner] = useState(false)
  const [collapsed, setCollapsed] = useState(true);
  const { user, dispatch } = useAuthContext()
  const { listDocuments, documents ,setDocuments} = UesDoxContext()

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleAddList = async () => {

    const { listName, listColor } = state
    let list = { listName, listColor }
    list.randumId = Math.random().toString(36).slice(2)
    list.createdBy = {
      email: user.email,
      uid: user.uid,
    }
    if (listName < 3) {
      return window.notify("Plz enter List Name!", "info")
    }
    if (!listColor) {
      return window.notify("Plz Select color!", "info")
    }
    try {
      setisSpiner(true)
      await setDoc(doc(firestore, "list", list.randumId), list);
      window.notify("Add List Successuly", "success")
    } catch (err) {
      window.notify("List is not added", "error")

    }
    setState(initalState)
    setisSpiner(false)
  }
// ------------------------------- handle search 
const filterBySearch = () => {
  // Access input value
  const {search} = state
  const query = search
  console.log(query);
  // Create copy of item list
 ;
  // Include all elements which includes the search query
  let updatedList = documents.filter((doc) => {
    return doc.title.toLowerCase().includes(query.toLowerCase())|| doc.description.toLowerCase().includes(query.toLowerCase());
  });
  // Trigger render with updated values
  setDocuments(updatedList);
};

  // -------------------------- logout function -----------
  const HandleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" })
        window.notify("SignOut User successfuly!", "Success")
      })
      .catch((err) => {
        window.notify("Something wants wrong", "error")
      })
  }

  return (




    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className='bg-white p-3'>
        <div className="demo-logo-vertical" />
        <p className='ps-3 fw-bold mt-4' >Menu</p>
        <Input addonBefore={<SearchOutlined onClick={filterBySearch} />} value={state.search} name='search' placeholder="Search"  onChange={handleChange}/>


        <p className='ps-3 mt-4  fs-6' >Task</p>

        <Menu
          theme="light"
          mode="inline"
          style={{
            border: "none"
          }}
          defaultSelectedKeys={["/"]}


          items={[

            {
              key: '/upcoming',
              icon: <DoubleRightOutlined />,
              label: <Link to="/upcoming" className='nav-link'>Upcoming</Link>,
            },
            {
              key: '/today',
              icon: <UnorderedListOutlined />,
              label: <Link to="/today" className='nav-link'>Today</Link>,
            },
            {
              key: '/calendar',
              icon: <CalendarOutlined />,
              label: <Link to="/calender" className='nav-link'>Calender</Link>,
            },
            {
              key: '/',
              icon: <FileTextOutlined />,
              label: <Link to="/" className='nav-link'>Sticky Wall</Link>,
            },
          ]}
        />

        <Divider />

        <p className='ps-3 mt-4 fs-6' >List</p>

        <div className="d-flex  align-items-center">
          <div className='bg-danger' style={{ width: "10px", height: "10px", borderRadius: "3px" }}>
          </div>
          <Link to="/personal" className='nav-link ms-2'>Personal</Link>
        </div>
        {
          listDocuments.map((doc, i) => {
            if (doc.createdBy.email === user.email) {

              return <>
                <div className="d-flex  align-items-center" >
                  <div style={{ width: "10px", height: "10px", borderRadius: "3px", backgroundColor: `${doc.listColor}` }} key={i}>
                  </div>
                  <Link to={"/" + doc.listName} className='nav-link ms-2'>{doc.listName}</Link>
                </div>
              </>
            }

          })
        }




        {isSpiner ? <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div> : <>
          <Input placeholder='Add List' style={{ border: 'none' }} value={state.listName} name='listName' onChange={handleChange} />
          <input type='color' className="form-control form-control-color" style={{ border: 'none', outline: 'none' }} value={state.listColor} name='listColor' onChange={handleChange} />
          <button type="button" className='btn btn-primary fw-bold w-100 text-white' onClick={handleAddList} >Add</button>
        </>
        }



        <Divider />
        <Menu
          theme="light"
          mode="inline"
          style={{
            border: "none"
          }}

          items={[

            {
              key: '3',
              icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
              label: <a className=' nav-link' onClick={HandleLogout} > Sign Out</a>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}

          />
          <span className='fs-3 fw-bold ms-2'>Sticky Wall</span>
        </Header>
        <Content
          style={{
            margin: '24px 16px',

            minHeight: 280,
            background: colorBgContainer,
          }}
        >

          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
}

