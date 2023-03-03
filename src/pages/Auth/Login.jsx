import { useState, useEffect } from 'react'
import axios from "axios";
import Form from '../../components/Form';
import http from '../Api/http';
import { useNavigate } from "react-router-dom";


const Login = () => {
    let navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)

    const auth = () =>{
        const jwt = localStorage.getItem("jwt")
        if (jwt) {
            return true
        }else{
            return false
        }
    }
    const userD = auth()
    
        useEffect(()=>{
            if (userD) {
                navigate("/dashboard")
            }
        },[])
    // const user = {
    //     email, password, rememberMe: checked
    // }
      
    const handleLogin = async (e) => {
        e.preventDefault();

        const newLogin ={
            Email: email,
            Password: password,
        }
        try {
			setLoading(true)
            const {data} = await http.post('/login', newLogin)
            console.log(data);
            if (data.errors) {
               console.log(errors);
            }else{
               window.location = "/dashboard"
			console.log("successful log"); 
                localStorage.setItem("jwt", data.token)
            }
        } catch (error) {
			return  console.log(error);
        }
		finally{
			setLoading(false)
		  }
    }

    return (

        <section className="h-[100vh] gradient-form bg-slate-200 md:h-screen">
            <div>
                <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-pink-500 mb-3">
                    <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                        <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
                            <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#pablo">
                                
                            </a>
                            <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
                                <span className="block relative w-6 h-px rounded-sm bg-white" />
                                <span className="block relative w-6 h-px rounded-sm bg-white mt-1" />
                                <span className="block relative w-6 h-px rounded-sm bg-white mt-1" />
                            </button>
                        </div>
                        <div className="lg:flex flex-grow items-center" id="example-navbar-warning">
                            <ul className="flex flex-col lg:flex-row list-none ml-auto">
                                <li className="nav-item">
                                    <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                                        <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75">
                                        </i></a><i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75">
                                    </i></li><i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75">
                                    <li className="nav-item">
                                        <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                                            <i className="fab fa-twitter text-lg leading-lg text-white opacity-75">
                                            </i></a><i className="fab fa-twitter text-lg leading-lg text-white opacity-75">
                                        </i></li><i className="fab fa-twitter text-lg leading-lg text-white opacity-75">
                                        <li className="nav-item">
                                            <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                                                <i className="fab fa-instagram text-lg leading-lg text-white opacity-75">
                                                </i></a><i className="fab fa-instagram text-lg leading-lg text-white opacity-75">
                                            </i></li><i className="fab fa-instagram text-lg leading-lg text-white opacity-75">
                                            <li className="nav-item">
                                                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                                                    <i className="fab fa-github text-lg leading-lg text-white opacity-75">
                                                    </i></a><i className="fab fa-github text-lg leading-lg text-white opacity-75">
                                                </i></li><i className="fab fa-github text-lg leading-lg text-white opacity-75">
                                            </i></i></i></i></ul><i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"><i className="fab fa-twitter text-lg leading-lg text-white opacity-75"><i className="fab fa-instagram text-lg leading-lg text-white opacity-75"><i className="fab fa-github text-lg leading-lg text-white opacity-75">
                                            </i></i></i></i></div><i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"><i className="fab fa-twitter text-lg leading-lg text-white opacity-75"><i className="fab fa-instagram text-lg leading-lg text-white opacity-75"><i className="fab fa-github text-lg leading-lg text-white opacity-75">
                                            </i></i></i></i></div><i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"><i className="fab fa-twitter text-lg leading-lg text-white opacity-75"><i className="fab fa-instagram text-lg leading-lg text-white opacity-75"><i className="fab fa-github text-lg leading-lg text-white opacity-75">
                                            </i></i></i></i>
                </nav>
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"><i className="fab fa-twitter text-lg leading-lg text-white opacity-75"><i className="fab fa-instagram text-lg leading-lg text-white opacity-75"><i className="fab fa-github text-lg leading-lg text-white opacity-75">
                </i></i></i></i>
            </div>

            <div className="w-full py-14 px-0">

                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <div className="xl:w-[70%] md:w-[80%] sm:w-[100%]" >
                        <div className="block bg-white">

                            <div className="lg:flex lg:flex-wrap g-0">

                                <div className="lg:w-6/12 flex items-center bg-[#F1F0FF] sm:bg-none">
                                    <div className="flex w-full justify-center px-4 py-6 md:p-12 md:mx-6">
                                        {/* <img src="/images/promax_logo 1.png" alt="" width={'50%'} /> */}
                                
                                        <h4 className="text-xl mb-4 mt-1 pb-1 font-bold">Grapple</h4>

                                    </div>
                                </div>

                                <div className="lg:w-6/12 px-4 md:px-0">
                                    <br />
                                    <br />


                                    <Form
                                        email={email}
                                        setEmail={setEmail}
                                        password={password}
                                        setPassword={setPassword}
                                        checked={checked}
                                        setChecked={setChecked}
                                        handleLogin={handleLogin} 
                                        loading={loading}
                                
                                    />
                                </div>

                                {loading ? <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg> : "Login"} 

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    );
}

export default Login;