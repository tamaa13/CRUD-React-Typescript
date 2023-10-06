import { useEffect, useState } from "react";
import { BASE_URL } from "../api";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { token } from "../token";
import { formatGender } from "../helpers/formatGender";
import Swal from 'sweetalert2'

const Form = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const gender: string[] = ["p", "w"]

    interface iUser {
        name: string;
        address: string;
        gender: string;
        born_date: any;
    }

    const [user, setUser] = useState<iUser>({
        name: "",
        address: "",
        gender: "",
        born_date: ""
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e?.target;
        return setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addUser()
        fetchData()
        setUser({
            name: "",
            address: "",
            gender: "",
            born_date: new Date()
        });
        navigate("/")
    }

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        editUser()
        fetchData()
        navigate("/")
    }

    const addUser = async () => {
        try {
            await axios.post(`${BASE_URL}`, user, {
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Add User Successfully`,
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something went wrong!`
            })
        }
    }

    const editUser = async () => {
        try {
            await axios.put(`${BASE_URL}/${id}`, user, {
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Edit User Successfully`,
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something went wrong!`
            })
        }
    }

    const fetchData = async () => {
        try {
            await axios.get(BASE_URL, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "accept": "application/json"
                }
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Retry'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            })
        }
    };

    const fetchDetailUser = async () => {
        try {
            if (id) {
                const { data } = await axios.get(`${BASE_URL}/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "accept": "application/json"
                    }
                })
                setUser(data.data);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Retry'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            })
        }
    }

    useEffect(() => {
        fetchDetailUser()
    }, [])

    return (
        <div className="flex items-center justify-center mt-32">
            <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <div className="p-6 mt-8">
                    <form onSubmit={!id ? handleSubmit : handleEdit}>
                        <div className="flex flex-col mb-2">
                            <div className="relative ">
                                <input
                                    type="text"
                                    id="create-account-pseudo"
                                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="name"
                                    value={user.name}
                                    placeholder="Name"
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className="relative ">
                                <input
                                    type="text"
                                    id="create-account-email"
                                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="address"
                                    value={user.address}
                                    placeholder="Alamat"
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                        <label htmlFor="create-account-tl" className="text-sm font-medium text-gray-500">Jenis Kelamin</label>
                        <div className="flex items-center gap-8">
                            {gender.map((gender, idx) => {
                                return (
                                    <label
                                        key={idx}
                                        htmlFor="create-account-gender"
                                        className="inline-flex items-center"
                                    >
                                        <input
                                            className="w-5 h-5 text-red-600"
                                            type="radio"
                                            id="create-account-gender"
                                            name="gender"
                                            value={gender}
                                            onChange={handleInput}
                                            checked={user.gender === gender}
                                        />
                                        <span className="ml-2 text-gray-400">{formatGender(gender)}</span>
                                    </label>
                                )
                            })}
                        </div>
                        <div className="relative flex flex-col my-2">
                            <label htmlFor="create-account-tl" className="text-sm font-medium text-gray-500">Tanggal Lahir</label>
                            <input type="date"
                                name="born_date"
                                onChange={handleInput}
                                value={user.born_date}
                                className="mt-2 rounded-md" />
                        </div>
                        <div className="flex w-full my-4">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form