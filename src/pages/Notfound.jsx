import { NavLink } from "react-router-dom";

const NotFound = () => {
    return (
        <section className="relative z-10 py-[120px]">
            <div className="container mx-auto">
                <div className="-mx-4 flex">
                    <div className="w-full px-4">
                        <div className="mx-auto max-w-[550px] text-center">
                            <h2 className="mb-2 text-[50px] font-bold leading-none text-blue-500 sm:text-[80px] md:text-[100px]">
                                404
                            </h2>
                            <h4 className="mb-3 text-[22px] font-semibold leading-tight text-black">
                                Oops!  The page you were looking for is not found!
                            </h4>
                            <p className="mb-8 text-lg text-slate-800">
                                You may have mistyped the address or the page may have moved.
                            </p>
                            <NavLink to={'/'} href="javascript:void(0)" className="bg-blue-700 rounded-md inline-flex items-center justify-center py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                                Go to Homepage
                            </NavLink>

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

    );
}

export default NotFound;