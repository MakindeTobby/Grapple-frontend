import React, { useState } from 'react';

export const CreditCardForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const splitCreditCardNumber = (cardNumber) => {
        const arr = cardNumber.split('');
        const firstFour = arr.slice(0, 4).join('');
        const secondFour = arr.slice(4, 8).join('');
        const thirdFour = arr.slice(8, 12).join('');
        const fourthFour = arr.slice(12, 16).join('');

        return `${firstFour} ${secondFour} ${thirdFour} ${fourthFour}`;
    }

    const handleCardNumberChange = (event) => {
        let value = event.target.value.replace(/[^\d]/g, '');
        if (value.length > 16) {
            value = value.slice(0, 16);
        }
        setCardNumber(value);
    }

    const handleCardNameChange = (event) => {
        setCardName(event.target.value);
    }

    const handleExpiryDateChange = (event) => {
        let value = event.target.value.replace(/[^\d]/g, '');
        if (value.length > 4) {
            value = value.slice(0, 4);
        }
        value = value.replace(/^(\d{2})/, '$1/');
        setExpiryDate(value);
    }

    const handleCvvChange = (event) => {
        let value = event.target.value.replace(/[^\d]/g, '');
        if (value.length > 3) {
            value = value.slice(0, 3);
        }
        setCvv(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formattedCardNumber = splitCreditCardNumber(cardNumber);
        alert(`Card Number: ${formattedCardNumber}\nName on Card: ${cardName}\nExpiry Date: ${expiryDate}\nCVV: ${cvv}`);
    }

    return (
        <div className="container">
            <div className="wrapper">
                <div className="outer-card">
                    <form onSubmit={handleSubmit}>
                        <div className="forms">
                            <div className="input-items">
                                <span>Card Number</span>
                                <input
                                    placeholder=".... .... .... ...."
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    data-slots="."
                                    data-accept="\d"
                                    size="19"
                                    maxLength="16"
                                />
                            </div>
                            <div className="input-items">
                                <span>Name on card</span>
                                <input
                                    placeholder="Samuel Iscon"
                                    value={cardName}
                                    onChange={handleCardNameChange}
                                />
                            </div>
                            <div className="one-line">
                                <div className="input-items">
                                    <span>Expiry Date</span>
                                    <input
                                        placeholder="mm/yyyy"
                                        value={expiryDate}
                                        onChange={handleExpiryDateChange}
                                        data-slots="my"
                                        maxLength="5"
                                    />
                                </div>
                                <div className="input-items">
                                    <span>CVV</span>
                                    <input
                                        placeholder="..."
                                        value={cvv}
                                        onChange={handleCvvChange}
                                        data-slots="."
                                        data-accept="\d"
                                        size="3"
                                        maxLength="3"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
