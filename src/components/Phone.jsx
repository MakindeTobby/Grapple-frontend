import { useState } from 'react';
import PhoneInput from 'react-phone-number-input'

const Phone = () => {
    const [value, setValue] = useState("")
    // console.log(value);
    return (
        <PhoneInput
            defaultCountry='NG'
            international
            countryCallingCodeEditable={false}
            placeholder="Enter phone number"
            value={value}
            onChange={setValue}
            className='border-none'
        />

    );
}

export default Phone;