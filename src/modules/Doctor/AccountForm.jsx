import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import http from "../../Auth/Api/http";
import DocLayout from "../../layouts/DocLayout";

const AccountForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const [gender, setGender] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [surName, setSurName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [address, setAddress] = useState('');
    const [postCode, setPostcode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [qualification, setQualification] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const navigate = useNavigate()


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setSelectedFile(event.dataTransfer.files[0]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const Posted = (e) => {
        e.preventDefault();

        if (
            !gender ||
            !firstName ||
            !surName ||
            !aboutMe ||
            !address ||
            !postCode ||
            !phoneNumber ||
            !qualification ||
            !selectedFile ||
            !country ||
            !state ||
            !city ||
            !dateOfBirth
        ) {
            toast.error("Please fill all the fields.");
            return;
        }
        else {
            postForm()

        };
    }

    const id = localStorage.getItem('DocId')

    const postForm = async () => {

        const formData = new FormData()
        // Add input field values to formData
        formData.append("Gender", gender);
        formData.append("FirstName", firstName);
        formData.append("MiddleName", middleName);
        formData.append("SurName", surName);
        formData.append("AboutMe", aboutMe);
        formData.append("Address", address);
        formData.append("PostCode", postCode);
        formData.append("PhoneNumber", phoneNumber);
        formData.append("Qualification", qualification);
        formData.append("image", selectedFile);
        formData.append("Country", country);
        formData.append("State", state);
        formData.append("City", city);
        formData.append("DateOfBirth", dateOfBirth);

        try {
            setLoading(true)
            const { data } = await http.post(`/editdoctor/${id}`, formData)
            console.log(data);
            toast.success(data.message)

            setLoading(false)
            navigate('/setup')

        } catch (error) {
            console.log(error);
            setLoading(false)

        }
    }


    return (

        <DocLayout>

            <div className="mt-2 sm:mt-0">
                <div className="mx-auto max-w-5xl">

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={Posted}>

                            <div className="shadow overflow-hidden sm:rounded-md mt-10">

                                <div className="px-4 py-5 bg-white sm:p-6 ">
                                    <h2 className="text-2xl font-bold mb-4 text-center">Profile Information</h2>

                                    <label htmlFor="first_name" className="block text-sm mb-1 font-medium text-gray-700">Upload Profile Image</label>

                                    <label htmlFor="dropzone-file" className="flex mb-4 flex-col items-center justify-center w-full h-60 overflow-hidden border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"

                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                    >

                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            {selectedFile ? (
                                                <img
                                                    src={URL.createObjectURL(selectedFile)}
                                                    alt="Selected file"
                                                    className="w-24 h-24 object-contain mb-2"
                                                />
                                            ) : (
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-10 h-10 mb-3 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    />
                                                </svg>
                                            )}
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">
                                                    {selectedFile ? selectedFile.name : "Click to upload profile picture or drag and drop"}
                                                </span>{" "}

                                            </p>
                                            {selectedFile && (
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {selectedFile.name}
                                                </div>
                                            )}
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                                    </label>


                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Surname</label>
                                            <input type="text" name="SurName"
                                                value={surName}
                                                onChange={e => setSurName(e.target.value)}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">First Name</label>
                                            <input type="text" name="FirstName"
                                                value={firstName}
                                                onChange={e => setFirstName(e.target.value)}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">Middle Name</label>
                                            <input type="text" name="MiddleName"
                                                value={middleName}
                                                onChange={e => setMiddleName(e.target.value)}
                                                id="postal_code" autoComplete="postal-code" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>


                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                            <input type="date" name="DateOfBirth"
                                                value={dateOfBirth}
                                                onChange={e => setDateOfBirth(e.target.value)}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Gender</label>
                                            <select id="country" name="Gender"
                                                value={gender}
                                                onChange={e => setGender(e.target.value)}
                                                autoComplete="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Others</option>
                                            </select>
                                        </div>
                                        <div className="col-span-6">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country / Region</label>
                                            <select id="country" name="Country"
                                                value={country}
                                                onChange={e => setCountry(e.target.value)}
                                                autoComplete="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <option hidden>Select Country</option>
                                                <option>Australia</option>
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>Nigeria</option>
                                                <option>Mexico</option>
                                            </select>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">State</label>
                                            <input type="text" name="State"
                                                value={state}
                                                onChange={e => setState(e.target.value)}
                                                id="email_address" autoComplete="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">City</label>
                                            <input type="text" name="City"
                                                value={city}
                                                onChange={e => setCity(e.target.value)}
                                                id="email_address" autoComplete="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div className="col-span-6">
                                            <label htmlFor="street_address" className="block text-sm font-medium text-gray-700">Street address</label>
                                            <input type="text" name="Address"
                                                value={address}
                                                onChange={e => setAddress(e.target.value)}
                                                id="street_address" autoComplete="street-address" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Postal Code</label>
                                            <input type="text" name="PostCode"
                                                value={postCode}
                                                onChange={e => setPostcode(e.target.value)}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                            <input type="text" name="PhoneNumber"
                                                value={phoneNumber}
                                                onChange={e => setPhoneNumber(e.target.value)}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                        </div>


                                        <div className="col-span-6">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Qualification</label>
                                            <select id="country" name="Qualification"
                                                value={qualification}
                                                onChange={e => setQualification(e.target.value)}
                                                autoComplete="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <option>Lorem</option>
                                                <option>Ipsum</option>
                                                <option>Dolor</option>
                                            </select>
                                        </div>

                                        <div className="col-span-6">

                                            <label for="message" name="AboutMe" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About Me</label>
                                            <textarea id="message" rows="4"
                                                value={aboutMe}
                                                onChange={e => setAboutMe(e.target.value)}
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Short description of yourself..."></textarea>

                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button type="submit" className="inline-flex w-full justify-center py-4 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        {loading ? <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg> : "Continue"}
                                    </button>
                                    <br />
                                    <br />
                                    <br />
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DocLayout>


    );
}

export default AccountForm;