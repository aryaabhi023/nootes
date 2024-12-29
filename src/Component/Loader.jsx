import {useEffect,useState} from 'react'
import ScreenLoader from '../SharedComponent/ScreenLoader'
import { use } from 'react';

export default function Loader({children}) {
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);
    },2000);
  },[])
  return (
    <div className='h-screen flex justify-center items-center'>
      {loading ? <ScreenLoader/> : children}
    </div>
  )
}
