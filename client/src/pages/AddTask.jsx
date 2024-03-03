import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Toast } from '../constants/sweetAlert';
import { AxiosInstance } from '../config/axiosConfig';

const AddTask = () => {
    const { id } = useParams();
    const [task, setTask] = useState({
        title: "",
        description: "",
        dueDate: ""
    })
    const navigate = useNavigate();

    useEffect(() => {
        if (id != 0) {
            handleGetTask(id)
        }
    }, [])

    const handleGetTask = (id) => {
        try {
            AxiosInstance.post("/user/getTask", { id }).then((result) => {
                setTask({
                    title: result?.data?.data?.title,
                    description: result?.data?.data?.description,
                    dueDate: result?.data?.data?.dueDate,
                });
            }).catch((err) => {
                Toast({
                    title: "Task not found",
                    icon: "error"
                })
            });
        } catch (error) {
            Toast({
                title: "Something went wrong",
                icon: "error"
            })
        }
    }

    const handleSubmit = () => {
        try {
            AxiosInstance.post("/user/setTask", task).then((result) => {
                Toast({
                    title: "successfully set task",
                    icon: "success"
                }).then(() => {
                    navigate('/home')
                })
            }).catch((err) => {
                Toast({
                    title: "cannot set task",
                    icon: "error"
                })
            });
        } catch (error) {
            Toast({
                title: "Something went wrong",
                icon: "error"
            })
        }
    }

    const handleUpdate = (id) => {
        try {
            AxiosInstance.post("/user/updateTask", { id, task }).then((result) => {
                Toast({
                    title: "successfully updated task",
                    icon: "success"
                }).then(() => {
                    navigate('/home')
                })
            }).catch((err) => {
                Toast({
                    title: "cannot set task",
                    icon: "error"
                })
            });
        } catch (error) {
            Toast({
                title: "somethin went wrong",
                icon: "warning"
            })
        }
    }

    const handleClick = () => {
        if (task.title && task.description && task.dueDate) {
            if (id != 0) {
                handleUpdate(id)
            } else {
                handleSubmit();
            }
        } else {
            Toast({
                title: "inputs cannot be blank",
                icon: "warning"
            })
        }
    }
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='sm:w-3/4 flex flex-col  w-full md:w-2/3 lg:w-1/2 mx-3 px-10 py-10 gap-3 rounded-lg h-3/4 bg-[#6e36a5]  '>
                <ArrowLeftCircleIcon className='w-10' onClick={() => navigate("/home")} />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input type="text" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} className='bg-gray-700 px-5 rounded-lg py-3 text-lg font-medium text-center' />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your description here..."></textarea>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
                <input value={task.dueDate}  min={new Date().toISOString().split('T')[0]} type="date" onChange={(e) => setTask({ ...task, dueDate: e.target.value })} className='bg-gray-700 px-5 rounded-lg py-3 font-medium' />
                <div className='flex justify-center items-center h-20'>
                    <button className='bg-gray-700 p-2 rounded-lg text-sm font-medium' onClick={handleClick}>Add Task</button>
                </div>
            </div>
        </div>
    )
}

export default AddTask