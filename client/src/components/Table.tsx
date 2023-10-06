import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { token } from "../token";
import { formatGender } from "../helpers/formatGender";
import { formatCreatedAt } from "../helpers/formatCreatedAt";
import { formatBornDate } from "../helpers/formatBornDate";
import Swal from "sweetalert2";

const Table: React.FC = () => {

    interface iUserData {
        id: number;
        name: string;
        address: string;
        gender: string;
        born_date: string;
        created_at: string;
    }

    const navigate = useNavigate();
    const [datas, setDatas] = useState<iUserData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const addUser = () => {
        navigate("/add");
    }

    const edit = (idUser: number) => {
        navigate(`/edit/${idUser}`);
    }

    const viewUser = (idUser: number) => {
        navigate(`/${idUser}`);
    }

    const deleteUser = async (idUser: number) => {
        try {
            await axios.delete(`${BASE_URL}/${idUser}`, {
                headers: {
                    "accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(BASE_URL, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "accept": "application/json"
                }
            });
            setDatas(data.data);
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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mx-auto max-w-7xl x-4 sm:px-8">
            <div className="py-8">
                {loading ? (
                    <Loading />
                ) : (
                    <div className="container mx-auto max-w-7xl x-4 sm:px-8">
                        <div className="py-8">
                            <button
                                onClick={addUser}
                                type="button"
                                className="px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md w-36 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                            >
                                Tambah User
                            </button>
                            <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                                <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                                    <table className="min-w-full leading-normal">
                                        <thead>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                                >
                                                    No.
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                                >
                                                    Nama
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                                >
                                                    Alamat
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                                >
                                                    P/W
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                                >
                                                    Tanggal Lahir
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                                >
                                                    Tanggal Input
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-5 py-3 text-sm font-normal text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                                                >
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datas?.map((el, idx) => {
                                                return (
                                                    <tr key={el.id}>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="text-gray-900 whitespace-no-wrap">{idx + 1}</p>
                                                        </td>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="text-gray-900 whitespace-no-wrap">{el.name}</p>
                                                        </td>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="text-gray-900 whitespace-no-wrap">{el.address}</p>
                                                        </td>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="text-gray-900 whitespace-no-wrap">{formatGender(el.gender)}</p>
                                                        </td>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="text-gray-900 whitespace-no-wrap">{formatBornDate(el.born_date)}</p>
                                                        </td>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="text-gray-900 whitespace-no-wrap">{formatCreatedAt(el.created_at)}</p>
                                                        </td>
                                                        <td className="flex gap-2 px-5 text-sm bg-white border-b border-gray-200 py-9">
                                                            <button onClick={() => viewUser(el.id)}
                                                                type="button"
                                                                className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                                                            >
                                                                View
                                                            </button>
                                                            <button
                                                                onClick={() => edit(el.id)}
                                                                type="button"
                                                                className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                                                            >
                                                                Edit
                                                            </button>
                                                            <button onClick={(e: React.MouseEvent<Element, MouseEvent>) => {
                                                                e.preventDefault();
                                                                deleteUser(el.id)
                                                                navigate('/')
                                                            }}
                                                                type="button"
                                                                className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:ring-red-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>



    )
}

export default Table