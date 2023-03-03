import { NavLink } from "react-router-dom";
import Autophone from "../../components/AutoPhone";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from "react";
import Phone from "../../components/Phone";
import http from "../Api/http";

const AdminAuth = () => {
    const [pwdVisible, setPwdVisible] = useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)


    const handleLogin = async (e) => {
        e.preventDefault();

        const newLogin ={
            username: username,
            password: password,
        }
        try {
			setLoading(true)
            const {data} = await http.post('/admin/login', newLogin)
            console.log(data);
            if (data.errors) {
               console.log(errors);
            }else{
               window.location = "/adminDashboard"
			console.log("successful log"); 
                localStorage.setItem("token", data.token)
            }
        } catch (error) {
			return  console.log(error);
        }
		finally{
			setLoading(false)
		  }
    }
    return (
        <div className="w-full  mx-auto lg:p-4 md:p-4 sm:p-0 bg-slate-200 border-2  " >
         <div className="pt-32">
         <div className="   mb-2">
                {/* <img src="/images/promax_logo 1.png" alt="" width={'10%'} /> */}

            </div>
            <div className="mx-auto max-w-lg">
                <div className="bg-white rounded ">
                    <div className="border-b py-6 text-black text-center flex flex-col gap-2">
                        <small className=" font-bold text-xl">ADMIN LOGIN</small>
                        {/* <small >Set up your new account to get started</small> */}
                    </div>
                    <form className="bg-grey-lightest px-10 py-8">
                        <div className="relative mb-4">
                            <input type="text" id="floating_outlined"
                              required
                             value={username}
                             onChange={(e) => setUsername(e.target.value)}
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_outlined"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                Username</label>
                        </div>

                        <div className="relative mb-4 grid grid-cols-12 border-2 rounded-lg">
                            <input id="floating_outlined"
                                type={pwdVisible ? "text" : "password"}
                                name="password"
                                minLength="6"
                                value={password}
                        onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block col-span-11 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                Password</label>
                            <button onClick={() => setPwdVisible(!pwdVisible)} type='button'>
                                {pwdVisible ? <FaEye /> : <FaEyeSlash />}


                            </button>
                        </div>

                        <div className="flex">
                            <button type="button" 
                            onClick={handleLogin}
                            disabled={loading ? true : false}
                            className="w-full text-white bg-blue-900 hover:bg-blue-800 
                            focus:ring-4 focus:ring-blue-300 font-medium rounded  px-5 py-4  
                             dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
                              dark:focus:ring-blue-800">
                               {loading ? <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg> : "Login"}</button>
                        </div>
                    </form>
                </div>
            </div>
         </div>
            <br />
            <br />
        </div>
    );
}

export default AdminAuth;