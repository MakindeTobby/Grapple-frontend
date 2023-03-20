import { useEffect } from "react";
import { useContext, useState } from "react";
import { FaEdit, FaEye, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import http from "../../Auth/Api/http";
import Card from "../../components/card";
import { ThemeContext } from "../../context";
import DocLayout from "../../layouts/DocLayout";

const Schedule = () => {
    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const { docUser } = useContext(ThemeContext)
    const id = localStorage.getItem('DocId')

    const [formData, setFormData] = useState(
        {
            DoctorId: id,
            Days: "",
            FromTimeOfDay: "",
            ToTimeOfDay: "",
            Activities: ""
        }
    )
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSave = async (e) => {
        e.preventDefault()
        try {
            const { data } = await http.post("book_appointment", formData)
            toast.success(data.message)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        async function FetchSchedule() {
            try {
                const response = http.get(`/appointments/${id}`)
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        FetchSchedule()
    }, [])

    return (

        <DocLayout>

            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                <form
                    onSubmit={handleSave}
                    className="relative flex flex-col flex-auto min-w-0 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3 ">
                            <label htmlFor="city" className="block text-sm font-bold text-gray-700">DAYS</label>
                            <select id="country" name="Days"
                                onChange={handleChange}
                                autoComplete="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option hidden>...Select day...</option>
                                <option>Sunday</option>
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                <option>Saturday</option>

                            </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="city" className="block text-sm font-bold text-gray-700">ACTIVITY</label>
                            <input type="text" name="Activities"
                                onChange={handleChange}
                                className="mt-1 focus:ring-indigo-500  focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="state" className="block text-sm font-bold text-gray-700">FROM TIME OF DAY</label>
                            <input type="time" name="FromTimeOfDay"
                                onChange={handleChange}
                                className="mt-1 focus:ring-indigo-500  focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="postal_code" className="block text-sm font-bold text-gray-700">TO TIME OF DAY</label>
                            <input type="time" name="ToTimeOfDay"
                                onChange={handleChange}

                                id="postal_code" autoComplete="postal-code" className="mt-1  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <button
                            type="submit"
                            className="bg-cyan-700 flex items-center justify-center gap-3 hover:bg-cyan-800 text-white font-semibold py-2 px-4 border border-cyan-400 rounded shadow">
                            <FaSave /> Save
                        </button>
                    </div>
                </form>

                <div className="w-full overflow-hidden rounded-lg shadow-xs">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <th className="px-4 py-3">S/N</th>
                                    <th className="px-4 py-3">DAYS</th>
                                    <th className="px-4 py-3">ACTIVITY</th>
                                    <th className="px-4 py-3">FROM TIME OF DAY</th>
                                    <th className="px-4 py-3">TO TIME OF DAY</th>
                                    <th className="px-4 py-3">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                <tr className="text-gray-700 dark:text-gray-400">
                                    <td className="px-4 py-3 text-sm font-bold">
                                        1
                                    </td>
                                    <td className="px-4 py-3 text-sm font-bold">
                                        Monday
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        Dancing in the hallway
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        6/10/2020
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        6/10/2020
                                    </td>

                                    <td className="px-4 py-3 text-sm">
                                        <div className="flex items-center space-x-4 text-sm">
                                            <button className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                                <FaEdit className='text-sky-500 text-xl' />
                                            </button>
                                            <button className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>

                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                        <span className="flex items-center col-span-3">
                            Showing 1-10 of 100
                        </span>
                        <span className="col-span-2" />
                        {/* Pagination */}
                        <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                            <nav aria-label="Table navigation">
                                <ul className="inline-flex items-center">
                                    <li>
                                        <button className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous">
                                            <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd" />
                                            </svg>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                            1
                                        </button>
                                    </li>
                                    <li>
                                        <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                            2
                                        </button>
                                    </li>
                                    <li>
                                        <button className="px-3 py-1 text-white transition-colors duration-150 bg-cyan-600 border border-r-0 border-cyan-600 rounded-md focus:outline-none focus:shadow-outline-purple">
                                            3
                                        </button>
                                    </li>
                                    <li>
                                        <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                            4
                                        </button>
                                    </li>
                                    <li>
                                        <span className="px-3 py-1">...</span>
                                    </li>
                                    <li>
                                        <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                            8
                                        </button>
                                    </li>
                                    <li>
                                        <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                                            9
                                        </button>
                                    </li>
                                    <li>
                                        <button className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next">
                                            <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                                <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd" />
                                            </svg>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </span>
                    </div>
                </div>
            </div>


        </DocLayout>
    );
}

export default Schedule;