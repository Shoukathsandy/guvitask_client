import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import "./logout.css";
import 'react-toastify/dist/ReactToastify.css';

export default function Logout() {
    const navigate = useNavigate();
  return (
    <>
    <div >
        <div>
      <p><b>Profile saved successfully.</b></p>
      </div>
      <div><Button type="submit" variant="contained"
            color="primary"
                onClick={()=>navigate("/login")}>logout</Button></div>
    </div>

    </>
  )
}
