import { useState } from 'react';

export const useSetAmount = (initial: string) => {
    const [amount, setAmount] = useState(initial);

    const setInputAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/\s/g, '');

        if (!isNaN(+inputValue)) {
            setAmount(inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
        }
    };

    return { amount, setAmount, setInputAmount };
};
