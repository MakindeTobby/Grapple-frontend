import { useState } from "react";
import { useEffect } from "react";
import http from "../../Auth/Api/http";
import DocLayout from "../../layouts/DocLayout";

const DocProfile = () => {
    const [doctor, setDoctor] = useState({})
    const id = localStorage.getItem('DocId')
    useEffect(() => {
        async function getDoctor() {
            const { data } = await http.get(`/getDoctorById/${id}`)
            setDoctor(data)
            console.log(data);
        }

        getDoctor()
    }, [])
    console.log(doctor.SurName);
    return (
        <DocLayout>
            <div className="w-full px-3 py-6 mx-auto loopple-min-height-78vh text-slate-500">
                <div className="relative flex flex-col flex-auto min-w-0 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4">
                    <div className="flex flex-wrap -mx-3">
                        <div className="flex-none w-auto max-w-full px-3">
                            <div className="text-size-base ease-soft-in-out h-16 w-16 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
                                <img src={doctor.ImageUrl} alt="profile_image" className="w-full shadow-soft-sm rounded-xl" />
                            </div>
                        </div>
                        <div className="flex-none w-auto max-w-full px-3 my-auto">
                            <div className="h-full">
                                <h5 className="mb-1 font-semibold">{doctor.SurName} {doctor.FirstName} {doctor.MiddleName}</h5>
                                <p className="mb-0  leading-normal text-size-sm">{doctor.Qualification}</p>
                            </div>
                        </div>
                        <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12 text-right">
                            <button className="bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-2 px-4 border border-cyan-400 rounded shadow">
                                Edit Profile
                            </button>

                        </div>
                    </div>
                </div>
                <div className="w-full p-3 mt-6 mx-auto removable">
                    <div className="flex flex-wrap -mx-3">




                        <div className="w-full max-w-full px-2 lg-max:mt-6 xl:w-4/12 mb-4">
                            <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                                    <div className="flex flex-wrap -mx-3">
                                        <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                                            <h6 className="mb-0 font-bold">Profile Information</h6>
                                        </div>
                                        <div className="w-full max-w-full px-3 text-right shrink-0 md:w-4/12 md:flex-none">
                                            <a href="javascript:;" data-target="tooltip_trigger" data-placement="top">
                                                <i className="leading-normal fas fa-user-edit text-size-sm text-slate-400" aria-hidden="true" />
                                            </a>
                                            <div data-target="tooltip" className="px-2 py-1 text-center text-white bg-black rounded-lg text-size-sm hidden" role="tooltip" data-popper-placement="top" style={{ position: 'absolute', inset: 'auto auto 0px 0px', margin: 0, transform: 'translate3d(869.5px, -417.5px, 0px)' }}>
                                                Edit Profile
                                                <div className=" absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow style={{ position: 'absolute', left: 0, transform: 'translate3d(0px, 0px, 0px)' }} />
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="flex-auto p-4">
                                    <p className="leading-normal text-size-sm">{doctor.AboutMe}</p>
                                    <hr className="h-px my-6 bg-transparent bg-gradient-horizontal-light" />
                                    <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                        <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-size-sm text-inherit"><strong className="text-slate-700">Full Name:</strong> &nbsp; {doctor.SurName} {doctor.FirstName} {doctor.MiddleName}</li>
                                        <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit"><strong className="text-slate-700">Mobile:</strong> &nbsp; {doctor.PhoneNumber}</li>
                                        <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit"><strong className="text-slate-700">Email:</strong> &nbsp; {doctor.Email}</li>
                                        <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit"><strong className="text-slate-700">Location:</strong> &nbsp; {doctor.Country}</li>
                                        <li className="relative block px-4 py-2 pb-0 pl-0 bg-white border-0 border-t-0 rounded-b-lg text-inherit">
                                            <strong className="leading-normal text-size-sm text-slate-700">Social:</strong> &nbsp;
                                            <a className="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center text-blue-800 align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-soft-in bg-none" href="javascript:;">
                                                <i className="fab fa-facebook fa-lg" aria-hidden="true" />
                                            </a>
                                            <a className="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-soft-in bg-none text-sky-600" href="javascript:;">
                                                <i className="fab fa-twitter fa-lg" aria-hidden="true" />
                                            </a>
                                            <a className="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-soft-in bg-none text-sky-900" href="javascript:;">
                                                <i className="fab fa-instagram fa-lg" aria-hidden="true" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                        <div className="w-full max-w-full px-3 lg-max:mt-6 xl:w-4/12 mb-4">
                            <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                                    <h6 className="mb-0">Conversations</h6>
                                </div>
                                <div className="flex-auto p-4">
                                    <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                        <li className="relative flex items-center px-0 py-2 mb-2 bg-white border-0 rounded-t-lg text-inherit">
                                            <div className="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-size-base ease-soft-in-out rounded-xl">
                                                <img src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/kal-visuals-square.jpg" alt="kal" className="w-full shadow-soft-2xl rounded-xl" />
                                            </div>
                                            <div className="flex flex-col items-start justify-center">
                                                <h6 className="mb-0 leading-normal text-size-sm">Sophie B.</h6>
                                                <p className="mb-0 leading-tight text-size-xs">Hi! I need more information..</p>
                                            </div>
                                            <a className="inline-block py-3 pl-0 pr-4 mb-0 ml-auto font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100" href="javascript:;">Reply</a>
                                        </li>
                                        <li className="relative flex items-center px-0 py-2 mb-2 bg-white border-0 border-t-0 text-inherit">
                                            <div className="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-size-base ease-soft-in-out rounded-xl">
                                                <img src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/marie.jpg" alt="kal" className="w-full shadow-soft-2xl rounded-xl" />
                                            </div>
                                            <div className="flex flex-col items-start justify-center">
                                                <h6 className="mb-0 leading-normal text-size-sm">Anne Marie</h6>
                                                <p className="mb-0 leading-tight text-size-xs">Awesome work, can you..</p>
                                            </div>
                                            <a className="inline-block py-3 pl-0 pr-4 mb-0 ml-auto font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100" href="javascript:;">Reply</a>
                                        </li>
                                        <li className="relative flex items-center px-0 py-2 mb-2 bg-white border-0 border-t-0 text-inherit">
                                            <div className="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-size-base ease-soft-in-out rounded-xl">
                                                <img src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/ivana-square.jpg" alt="kal" className="w-full shadow-soft-2xl rounded-xl" />
                                            </div>
                                            <div className="flex flex-col items-start justify-center">
                                                <h6 className="mb-0 leading-normal text-size-sm">Ivanna</h6>
                                                <p className="mb-0 leading-tight text-size-xs">About files I can..</p>
                                            </div>
                                            <a className="inline-block py-3 pl-0 pr-4 mb-0 ml-auto font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100" href="javascript:;">Reply</a>
                                        </li>
                                        <li className="relative flex items-center px-0 py-2 mb-2 bg-white border-0 border-t-0 text-inherit">
                                            <div className="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-size-base ease-soft-in-out rounded-xl">
                                                <img src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/team-4.jpg" alt="kal" className="w-full shadow-soft-2xl rounded-xl" />
                                            </div>
                                            <div className="flex flex-col items-start justify-center">
                                                <h6 className="mb-0 leading-normal text-size-sm">Peterson</h6>
                                                <p className="mb-0 leading-tight text-size-xs">Have a great afternoon..</p>
                                            </div>
                                            <a className="inline-block py-3 pl-0 pr-4 mb-0 ml-auto font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100" href="javascript:;">Reply</a>
                                        </li>
                                        <li className="relative flex items-center px-0 py-2 bg-white border-0 border-t-0 rounded-b-lg text-inherit">
                                            <div className="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-size-base ease-soft-in-out rounded-xl">
                                                <img src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/team-3.jpg" alt="kal" className="w-full shadow-soft-2xl rounded-xl" />
                                            </div>
                                            <div className="flex flex-col items-start justify-center">
                                                <h6 className="mb-0 leading-normal text-size-sm">Nick Daniel</h6>
                                                <p className="mb-0 leading-tight text-size-xs">Hi! I need more information..</p>
                                            </div>
                                            <a className="inline-block py-3 pl-0 pr-4 mb-0 ml-auto font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-soft-in hover:scale-102 hover:active:scale-102 active:opacity-85 text-fuchsia-500 hover:text-fuchsia-800 hover:shadow-none active:scale-100" href="javascript:;">Reply</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </DocLayout>
    );
}

export default DocProfile;