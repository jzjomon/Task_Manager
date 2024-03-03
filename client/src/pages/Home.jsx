import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { AxiosInstance } from '../config/axiosConfig'
import { Alert } from '../constants/sweetAlert'

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    AxiosInstance.get('/user/getTasks').then((result) => {
      setTasks(result?.data?.data)
    }).catch((err) => {
      Alert({
        title : "cannot get tasks",
        icon : "error"
      });
    });
  }, [tasks])
  return (
    <>
      <div className=''>
        <div className='z-40 sticky top-0 bg-[#4a1b7a]'>
          <Navbar />
        </div>
        <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mx-4 my-2 '>
          { tasks.map((task, i) => (
            <Card task={task} key={i}/>
          ))}
          <div className='flex justify-center'>
            <div  onClick={() => navigate(`/addTask/${0}`)} className='bg-[#6e36a5] relative h-[200px] w-[300px] flex items-center transition-all justify-center rounded-xl'>
              <PlusCircleIcon className='w-12 h-12' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home