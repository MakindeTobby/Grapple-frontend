import { useState } from "react";
import { useContext } from "react";
import http from "../../Auth/Api/http";
import { ThemeContext } from "../../context";

const ThankYou = () => {
    const { docUser } = useContext(ThemeContext);
    const [id, setId] = useState(Number(docUser.DoctorId));
    const logOut = async (e) => {
        e.preventDefault();

        const out = {
            DoctorId: id
        }
        try {
            const { data } = await http.post('/logout', out)
            console.log(out);
            if (data.errors) {
                console.log(errors);
            } else {
                localStorage.removeItem("jwt");
                window.location = "/"
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>


            <section className="relative z-10 py-[120px]">

                <div className="container mx-auto">
                    <div className="-mx-4 flex">
                        <div className="w-full px-4">
                            <div className="mx-auto max-w-[80%] text-center">
                                <h2 className="mb-4 text-[20px] font-bold leading-none text-cyan-700 sm:text-[60px] md:text-[50px]">
                                    Thank You
                                </h2>
                                <h4 className="mb-4 text-[13px] font-semibold leading-tight text-black">
                                    For being a part of this wonderful project, we assure you the best experience


                                </h4>

                                <div className="flex flex-col gap-4 pt-4 justify-center items-center">


                                    <button type="button" className="bg-cyan-700 block rounded-md  items-center 
                            justify-center py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                        onClick={logOut}

                                    >
                                        Back to Homepage
                                    </button>


                                </div>


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

export default ThankYou;