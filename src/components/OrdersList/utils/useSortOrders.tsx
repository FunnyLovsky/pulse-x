import { useState } from 'react';
import { SortType, VariantSort } from '../../../api/Enums';
import { useActions } from '../../../store/hooks/useActions';

export const useSortOrders = (type: SortType) => {
    const { sortCreate } = useActions();
    const [variant, setVariant] = useState(VariantSort.max_min);

    const sortHandler = () => {
        if (variant === VariantSort.max_min) {
            sortCreate(variant, type);
            setVariant(VariantSort.min_max);
        } else {
            sortCreate(variant, type);
            setVariant(VariantSort.max_min);
        }
    };

    return sortHandler;
};
