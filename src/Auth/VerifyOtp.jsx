import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { useCompanyContext } from "../../context";
import http from "./Api/http";


const VerifyOtp = () => {
    // const { email, companyId } = useCompanyContext();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index) ? element.value : d)])

        //focus on next element
        if (element.nextSibling) {
            element.nextSibling.focus()
        }

        element.addEventListener('keydown', function (event) {
            if (event.key === 'Backspace' || event.keyCode === 8) {

            }
        });

    };
    const email = localStorage.getItem("email")
    const handleSubmit = async (event) => {

        const postData = {
            Email: email,
            otp: otp.join('')
        }
        if (postData.otp < 5 || postData.Email === '') {
            return
        } else {

            try {
                setLoading(true)
                // const res = await axios.post(' http://profitmax-001-site8.ctempurl.com/api/Account/post_otp', postData)
                const { data } = await http.post("/verify-otp", postData)
                console.log(data);
                toast.success(data.response.data.message)
                setLoading(false)
                window.location.href = `/dashboard`

            } catch (error) {
                toast.error(error.response.data.message)
                setLoading(false)
            }

        }

    }

    return (

        <>


            <section className="relative z-10 py-[120px]">
                <div className="flex w-full justify-center mb-12">
                    <img src="/images/promax_logo 1.png" alt="" width={'10%'} />

                </div>
                <div className="container mx-auto">
                    <div className="-mx-4 flex">
                        <div className="w-full px-4">
                            <div className="mx-auto max-w-[80%] text-center">
                                <h2 className="mb-4 text-[20px] font-bold leading-none text-blue-900 sm:text-[60px] md:text-[50px]">
                                    Check your email for a code
                                </h2>
                                <h4 className="mb-4 text-[13px] font-semibold leading-tight text-black">
                                    We've sent a 6-digit code to <span className="text-gray-500">email. </span>
                                    The code expires shortly

                                </h4>
                                <div className="flex gap-2 max-w-full justify-center">
                                    {
                                        otp.map((value, i) =>

                                            <input
                                                type="text"
                                                maxLength={1}
                                                className="form-control text-2xl mb-2 rounded-sm border bg-transparent"
                                                style={{ width: '3rem', height: "3rem", textAlign: "center" }}
                                                key={i}
                                                value={value}
                                                onChange={(e) => handleChange(e.target, i)}
                                                onFocus={e => e.target.select()}
                                                onKeyDown={e => e.target.select()}
                                            />
                                        )
                                    }
                                </div>
                                <div className="flex flex-col gap-4 pt-4 justify-center items-center">


                                    <button type="button" className="bg-blue-900 block rounded-md  items-center 
                                justify-center py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                        onClick={handleSubmit}
                                        disabled={loading ? true : false}
                                    >
                                        {loading ? <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg> : "Verify OTP"}
                                    </button>

                                    <button className="bg-white  rounded-md inline-flex items-center 
                                justify-center py-4 px-10 text-center text-base font-normal hover:bg-opacity-90 lg:px-8 xl:px-10"
                                        onClick={e => setOtp([...otp.map(v => "")])}
                                    >Clear Input</button>

                                </div>
                                <p className="mt-8 text-lg text-slate-800">
                                    Can't find your code? Check your spam folder.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 left-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
                    <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
                    <div className="flex h-full w-1/3">
                        <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
                        <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
                    </div>
                    <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
                </div>
            </section>


        </>
    );
}

export default VerifyOtp