
import { useState, useEffect } from 'react';
import { VehicleModel } from '@/types/types';

export default function useBrandModels(brand_id: number | "") {
    const [modelsState, setModelsState] = useState<VehicleModel[]>([]);

    useEffect(() => {
        if (!brand_id) {
            setModelsState([]);
            return;
        }
        fetch(`/api/brands/${brand_id}/models`)
            .then(res => res.json())
            .then(data => {
                setModelsState(data);
            });
    }, [brand_id]);

    return {
        modelsState,
    }
}
