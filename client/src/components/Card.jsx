import React from 'react'
import { AxiosInstance } from '../config/axiosConfig'
import { Toast } from '../constants/sweetAlert'
import { useNavigate } from 'react-router-dom'

const Card = ({ task }) => {
  const navigate = useNavigate();
  const deleteTask = (task) => {
    try {
      AxiosInstance.post('/user/deleteTask', { id : task._id} ).then((result) => {
        Toast({
          title : "successfully deleted task",
          icon : "success"
        })
      }).catch((err) => {
        Toast({
          title : "failed to delete task",
          icon : "error"
        })
      });
    } catch (error) {
      Toast({
        title : 'task not deleted',
        icon : "error"
      })
    }
  }
  return (
    <div className='flex justify-center '>
        <div className='bg-[#6e36a5] relative  duration-300 transition-all h-[200px] w-[300px] rounded-xl shadow-lg shadow-gray-900'>
        <h1 className='flex justify-center font-bold my-3'>{task?.title} <span className='absolute right-3 font-light text-sm'>{task?.dueDate}</span></h1>
        <p className='mx-3 italic'>{task?.description}</p>
        <div className='flex justify-around absolute bottom-3 w-full '>
            <button className='bg-[#4a1b7a] text-sm font-semibold px-5 py-1 rounded-xl' onClick={() => navigate(`/addTask/${task._id}`)}>edit</button>
            {/* <button className='bg-[#4a1b7a] text-sm font-semibold px-5 py-1 rounded-xl'>done</button> */}
            <button className='bg-[#4a1b7a] text-sm font-semibold px-5 py-1 rounded-xl' onClick={() => deleteTask(task)}>delete</button>
        </div>
    </div>
    </div>
  )
}

export default Card