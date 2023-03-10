import { useState, useEffect } from 'react'
import axios from "axios";
import Form from '../components/Form';
import http from './Api/http';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const Login = () => {
    let navigate = useNavigate()
    const [email, setEmail] = useState('makindetobiloba9@gmail.com');
    const [password, setPassword] = useState('1234567');
    const [checked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    let errorsObj = { email: '', password: '' };
    const [errorss, setErrorss] = useState(errorsObj);

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
            // navigate("/dashboard")
        }
    }, [])
    // const user = {
    //     email, password, rememberMe: checked
    // }

    const handleLogin = async (e) => {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email.trim() === '') {
            errorObj.email = 'Email cannot be empty';
            error = true;
        }
        if (password.trim() === '') {
            errorObj.password = 'Password cannot be empty';
            error = true;
        }

        setErrorss(errorObj);
        if (error) return;

        const newLogin = {
            Email: email,
            Password: password,
        }
        try {
            setLoading(true)
            const { data } = await http.post('/login', newLogin)
            console.log(data);
            if (data.errors) {
                console.log(data?.errors);
                toast.success("Login Failed")

            } else if (data.message === "Email not verified") {
                toast.error(data.message)
                localStorage.setItem("email", data?.email)
                navigate("/verifyotp")

            }

            else {
                window.location = "/dashboard"
                toast.success("Login Successful")
                localStorage.setItem("jwt", data?.token)
            }
        } catch (error) {

            toast.error(error.response?.data);
            toast.error(error.response?.message);

            console.log(error);
        }
        finally {
            setLoading(false)
        }
    }

    return (

        <section className="h-[100vh] gradient-form bg-slate-200 md:h-screen">

            <div className="w-full py-5 px-0">

                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <div className="xl:w-[80%] md:w-[90%] sm:w-[100%]" >
                        <div className="block bg-white">

                            <div className="lg:flex lg:flex-wrap g-0">

                                <div className="lg:w-6/12 flex items-center bg-cyan-50 sm:bg-none">
                                    <div className="flex  w-full justify-center xl:block lg:block md:hidden xs:hidden sm:hidden">
                                        <img src="/images/health-insurance.png" alt="health-insurance" width={'100%'} height={'100%'} />
                                    </div>
                                </div>

                                <div className="lg:w-6/12 px-4 md:px-0">
                                    <br />
                                    <br />

                                    <Form
                                        errorss={errorss}
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


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    );
}

export default Login;