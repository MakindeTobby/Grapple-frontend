import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useEffect } from "react";

const Form = ({ email, setEmail, password, setPassword, handleLogin, checked, setChecked, loading, errorss }) => {
    const [pwdVisible, setPwdVisible] = useState(false)
    const [current, setCurrent] = useState("")
    useEffect(() => {
        setCurrent(window.location.pathname);
    }, []);
    return (
        <div className="md:p-16  md:mx-6">

            <form >
                <div className="flex justify-between mb-4">
                    {/* <select name="lang" className="border border-gray-300 rounded w-32 outline-none text-xs px-2 py-1">
                    <option value="" hidden>English (US)</option></select> */}
                    <NavLink to={'/'} className={`${current === "/" && "color"} bg-cyan-500 hover:bg-red-500 hover:border-red-700 border-cyan-700  text-white font-bold py-2 px-4 border-b-4  rounded`}>
                        Doctor
                    </NavLink>

                    <NavLink to={'/patient-login'} className={`${current === "/patient-login" && "color"} bg-cyan-500 hover:bg-red-500 hover:border-red-700 border-cyan-700  text-white font-bold py-2 px-4 border-b-4  rounded`}>
                        Patient
                    </NavLink>
                    <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-2 px-4 border-b-4 border-cyan-700 hover:border-cyan-500 rounded">
                        Pharm
                    </button>
                    <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-2 px-4 border-b-4 border-cyan-700 hover:border-cyan-500 rounded">
                        Health
                    </button>


                </div>


                <h4 className="text-xl mb-4 mt-1 pb-1 font-bold"></h4>

                <p className="mb-4 text-gray-400">Login to your account</p>




                <div>
                    <label className="form-check-label inline-block mb-3 mt-3 text-gray-800">Email</label>
                    <div className={`${errorss.email && "border-red-600 border-2"} border-2 border-solid  transition ease-in-out
                focus:shadow-lg  rounded focus:outline-none  focus:border-2 `}>

                        <input
                            type="email"
                            value={email}

                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email"
                            className=" block  focus:shadow-lg w-full  px-3  py-3 
                        text-sm font-normal text-gray-700 bg-white 
                        bg-clip-padding border-none outline-none  m-0
                         focus:text-gray-700 focus:bg-white focus:outline-none"
                        />

                    </div>
                </div>
                {errorss.email && <span className="text-red-500 text-left text-xs">{errorss.email}</span>}

                <div>
                    <label className="form-check-label inline-block mb-3 mt-3 text-gray-800">Password</label>
                    <div className={`${errorss.password && "border-red-600 border-2"} grid grid-cols-12 border-2 border-solid  transition ease-in-out
                focus:shadow-lg  rounded focus:outline-none focus:border-red-600 focus:border-2`}>

                        <input
                            type={pwdVisible ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className=" block  focus:shadow-lg w-full col-span-11 px-3  py-3 
                        text-sm font-normal text-gray-700 bg-white 
                        bg-clip-padding border-none outline-none  m-0
                         focus:text-gray-700 focus:bg-white focus:outline-none focus:border-0"
                            placeholder="Enter Password" />

                        <button onClick={() => setPwdVisible(!pwdVisible)} type='button'>
                            {pwdVisible ? <FaEye /> : <FaEyeSlash />}

                        </button>
                    </div>
                </div>
                {errorss.password && <span className="text-red-500 text-left text-xs">{errorss.password}</span>}






                <div className="text-center pt-1 mt-3 mb-3 pb-1">

                    <div className="flex justify-between items-center mb-3">
                        <div className="form-group form-check">
                            <input type="checkbox"
                                onChange={() => { setChecked(true) }}
                                className="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-cyan-600 checked:border-cyan-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" id="exampleCheck2" />
                            <label className="form-check-label inline-block text-gray-800">Remember me</label>
                        </div>
                        <a href="#!" className="text-gray-800">Forgot password?</a>
                    </div>
                    <button
                        onClick={handleLogin}
                        disabled={loading ? true : false}
                        className="inline-block px-6 py-4 text-white font-medium  leading-tight rounded shadow-md bg-cyan-700 hover:bg-cyan-800 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3" type="button" data-mdb-ripple="true" data-mdb-ripple-color="light">
                        {loading ? <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg> : "Login"}
                    </button>
                    <div className="flex items-center gap-0 pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <NavLink to={'/register'} className="text-cyan-700">Sign up</NavLink>
                    </div>


                </div>

            </form>
        </div>

    );
}

export default Form;