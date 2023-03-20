import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ThemeContext, useAuth } from "../context";
import { useState, useEffect } from "react";
import http from "./Api/http";
import { useContext } from "react";


const Register = () => {
    const [loading, setLoading] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [surName, setSurName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')
    const { docUser } = useContext(ThemeContext)

    const navigate = useNavigate()
    const auth = () => {
        const jwt = localStorage.getItem("jwt")
        if (jwt) {
            return true
        } else {
            return false
        }
    }
    const userD = auth()

    useEffect(() => {
        if (userD) {
            navigate("/dashboard")
        }
    }, [])

    // useEffect(() => {
    //     if (docUser) {
    //         navigate(-1)
    //     }
    // }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // toast.success('wow this works')
        const newSign = {
            FirstName: firstName,
            SurName: surName,
            Email: email,
            PhoneNumber: phoneNumber,
            Password: password,
            ConfirmPassword: confirmPassword,

        }
        try {
            setLoading(true)
            const { data } = await http.post("/doctorSignup", newSign)
            console.log(data);
            if (data.errors) {
                console.log(errors);
                setLoading(false)
            } else {
                // localStorage.setItem("jwt", data.token)
                localStorage.setItem("email", data.email)
                toast.success("Registration Successful")
                navigate("/verifyotp");
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setLoading(false)
            return toast.error(error.response.data.error);

        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-[100vh] mx-auto lg:p-4 md:p-4 sm:p-0 bg-slate-200">
            <NavLink to={'/login'} className="flex w-full justify-center mb-2">
                {/* <img src="/images/promax_logo 1.png" alt="" width={'10%'} /> */}

            </NavLink>
            <div className="mx-auto max-w-lg">
                <div className="bg-white rounded ">
                    <div className="border-b py-6 text-black text-center flex flex-col gap-2">
                        <small className=" font-bold text-xl">CREATE YOUR ACCOUNT</small>
                        <small >Set up your new account to get started</small>
                    </div>
                    <form className="bg-grey-lightest px-10 py-8">
                        <div className="relative mb-4">
                            <input type="text" id="floating_outlined"
                                onChange={e => setFirstName(e.target.value)}
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_outlined"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                Firstname</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" id="floating_outlined"
                                onChange={e => setSurName(e.target.value)}
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                Surname</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="email" id="floating_outlined"
                                onChange={e => setEmail(e.target.value)}
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                Email</label>
                        </div>
                        <div className="relative mb-4">
                            {/* <Phone /> */}
                            <input type="number" id="floating_outlined"
                                onChange={e => setphoneNumber(e.target.value)}
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Phone Number</label>

                        </div>



                        <div className="relative mb-4">
                            <input type="password" id="floating_outlined"
                                onChange={e => setPassword(e.target.value)}
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                Password</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="password" id="floating_outlined"
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                Confirm Password</label>
                        </div>
                        {/* <Autophone /> */}


                        {/* <div>
                            
                        </div> */}
                        {/* <div className="flex items-start mb-4">
                            <input defaultChecked type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="disabled-checked-checkbox" className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                                I consent to the collection and processing of my personal data in line with data regulations as described in our Privacy Policy</label>
                        </div> */}

                        <div className="flex">
                            <button type="button"
                                onClick={handleSubmit}
                                disabled={firstName.trim() === "" || surName.trim === ""
                                    || email.trim() === "" || loading
                                    ? true : false}
                                className="w-full text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 font-medium rounded  px-5 py-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">

                                {loading ? <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg> : " Proceed"}
                            </button>
                        </div>
                    </form>
                    <div className="border-t px-10 py-4">
                        <div className="flex gap-2">
                            <span>Already have an account ?</span>
                            <NavLink to={'/'} className="font-bold text-cyan-500 hover:text-cyan-700 no-underline">Sign in here</NavLink>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Register;