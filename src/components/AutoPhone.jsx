import countryData from './countryCode.json'
import { useState } from 'react';

const Autophone = () => {
    const [countries, setCountries] = useState(countryData)
    const [searchCode, setSearchCode] = useState()

    const searchCountry = countries.find((obj) => {
        if (obj.code === searchCode) {
            return true;
        }
        return false;
    })
    return (
        <>
            <div>
                <div>
                    <div>
                        <select className="block w-full px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={searchCode}
                            onChange={(e) => setSearchCode(e.target.value)}
                        >
                            <option value="" hidden>--Select Country--</option>
                            {
                                countries.map((item, index) =>
                                    <option value={item.code} key={index}>{item.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="w-full mt-4 mb-4 grid grid-cols-4 gap-2">
                        <input
                            value={searchCountry && searchCountry.dial_code || ""}
                            type="tel"
                            readOnly
                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="code" />

                        <input type="tel"
                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer col-span-3"
                            placeholder="Phone Number" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Autophone;