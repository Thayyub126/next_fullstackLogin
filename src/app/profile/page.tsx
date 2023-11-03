
"use client"
import React,{useState} from 'react'
import axios from "axios"
import Link from "next/link"
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'


const Profile = () => {

  const router = useRouter();
  const [data, setData] = useState("nothing")

  const logout = async()=>{
    try{
      await axios.get("/api/users/logout");
      toast.success("Logout successfull");
      router.push("/login")
    }catch(error:any){
      console.log(error.message);
      toast.error(error.message)
    }
  }

  const getUserDetalis = async ()=>{

    const res = await axios.get('/api/users/me');
    console.log(res.data);
    setData(res.data.data._id)
  }
  return (
    <div>
      <h1>this is profile Page</h1>
        <h2>{data === "nothing"? "Nothing" : <Link href={`profile/${data}`}>{data}</Link>}</h2>
      <div>
        <button className='btn btn-warning' onClick={logout}>
          Logout
        </button>
      </div>
      <div>
        <button className='btn btn-warning' onClick={getUserDetalis}>
          Get User Details
        </button>
      </div>
    </div>
  )
}

export default Profile;
