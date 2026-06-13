/**
 * hook para obtener provincias y municipios de argentina
 * 
* las provincias de santa cruz y santiago del estero no funcionan (desde la API vienen vacias, sin municipios)
* 
* 
*/

import { useState, useEffect } from 'react';
import { Municipio } from '@/types/types';

export default function useProvinciaMunicipio() {
    const [provinciaId, setProvinciaId] = useState<number | ''>('');
    const [municipiosState, setMunicipiosState] = useState<Municipio[]>([]);
    const [municipioId, setMunicipioId] = useState<number | ''>('');

    const altProvinciaMunicipio = () => {
        if (!provinciaId) {
            setMunicipiosState([]);
            setMunicipioId('');
            return;
        }
        fetch(`/api/municipios/${provinciaId}`)
            .then(res => res.json())
            .then(data => {
                setMunicipiosState(data);
                setMunicipioId('');
            });
    }

    useEffect(() => {
        altProvinciaMunicipio();
    }, [provinciaId]);

    // importo tanto los datos como las funciones para poder usarlos en cualquier componente
    return {
        provinciaId,
        setProvinciaId,
        municipioId,
        setMunicipioId,
        municipiosState,
    };
}