import axios from "axios"
import { BASE_URL } from "../api"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { token } from "../token"
import { formatGender } from "../helpers/formatGender"
import { formatCreatedAt } from "../helpers/formatCreatedAt"
import { formatBornDate } from "../helpers/formatBornDate"
import Swal from "sweetalert2"

const Detail = () => {
    const navigate = useNavigate()

    const backHome = () => {
        navigate('/')
    }

    const { id } = useParams()

    interface iUserData {
        id: number;
        photo: string;
        name: string;
        address: string;
        gender: string;
        born_date: string;
        created_at: string;
    }

    const [users, setUser] = useState<iUserData | null>(null)

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "accept": "application/json"
                }
            })
            setUser(data.data);
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
        fetchData()
    }, [])



    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-2xl overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        User database
                    </h3>
                    <p className="max-w-2xl mt-1 text-sm text-gray-500">
                        Details and informations about user.
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl >
                        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Nama</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {users?.name}
                            </dd>
                        </div>
                        <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Alamat</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {users?.address}
                            </dd>
                        </div>
                        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Gender</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {formatGender(users?.gender)}
                            </dd>
                        </div>
                        <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Tanggal Lahir</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {formatBornDate(users?.born_date)}
                            </dd>
                        </div>
                        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Tanggal Input</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {formatCreatedAt(users?.created_at)}
                            </dd>
                        </div>
                    </dl>
                </div>
                <button
                    onClick={backHome}
                    type="button"
                    className="px-4 py-2 my-4 ml-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md w-36 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                    Kembali
                </button>
            </div>
        </div>
    )
}

export default Detail