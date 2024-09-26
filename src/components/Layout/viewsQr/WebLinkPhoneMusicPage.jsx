import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { MusicLayout } from '../qrContent/LayoutsQr/stylePhoneMusicLayout';
import { SocialLayout } from '../qrContent/LayoutsQr/stylePhoneSocialLayout';

/*
 * @Author : Cristian Escobar, @date 2024-09-03 21:00:00
 * @description: Componentes para renderizar páginas de contenido en vista de teléfono móvil para música y redes sociales. Ambos componentes realizan una solicitud para obtener datos basados en un `id` de la URL y muestran un diseño específico según el tipo de contenido.
 * 
 * `WebLinkPhoneMusicPage`: 
 *   - Obtiene datos de música utilizando el `id` de la URL.
 *   - Muestra un componente `MusicLayout` con los datos de música obtenidos.
 *   - Maneja estados de carga y error durante la solicitud de datos.
 * 
 * `WebLinkPhoneSocialPage`: 
 *   - Obtiene datos de redes sociales utilizando el `id` de la URL.
 *   - Muestra un componente `SocialLayout` con los datos de redes sociales obtenidos.
 *   - Maneja estados de carga y error durante la solicitud de datos.
 * 
 * @Props:
 *   - `id`: Parámetro de la URL que se utiliza para obtener los datos específicos.
 * @State:
 *   - `musicFormValues`: Estado para almacenar los datos de música en `WebLinkPhoneMusicPage`.
 *   - `socialFormValues`: Estado para almacenar los datos de redes sociales en `WebLinkPhoneSocialPage`.
 *   - `loading`: Estado para controlar la visualización del mensaje de carga.
 *   - `error`: Estado para almacenar cualquier error que ocurra durante la solicitud de datos.
 * @Effect:
 *   - `fetchData`: Función asíncrona que solicita datos y actualiza los estados correspondientes.
 * @Return:
 *   - `WebLinkPhoneMusicPage`: Un div que muestra el estado de carga, error, o el componente `MusicLayout` con los datos de música.
 *   - `WebLinkPhoneSocialPage`: Un div que muestra el estado de carga, error, o el componente `SocialLayout` con los datos de redes sociales.
 */

export const WebLinkPhoneMusicPage = () => {
    const { id } = useParams();
    const [musicFormValues, setMusicFormValues] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getStoreData } = useAuth();

    const fetchData = async () => {
        setLoading(true);
        console.log("Fetching data for music ID:", id);
        try {
            const result = await getStoreData(id);
            setMusicFormValues(result.data);
            console.log("Data fetched:", result.data);
        } catch (error) {
            setError(error.message);
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // empty dependency array means this effect runs only once, on mount

    return (
        <div className='flex items-center justify-center min-h-screen'>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {musicFormValues && <MusicLayout musicFormValues={musicFormValues}/>}
        </div>
    );
};


export const WebLinkPhoneSocialPage = () => {
    const { id } = useParams();
    const [socialFormValues, setSocialFormValues] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getStoreData } = useAuth();

    const fetchData = async () => {
        setLoading(true);
        console.log("Fetching data for social ID:", id);
        try {
            const result = await getStoreData(id);
            setSocialFormValues(result.data);
            console.log("Data fetched:", result.data);
        } catch (error) {
            setError(error.message);
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // empty dependency array means this effect runs only once, on mount

    return (
        <div className='flex items-center justify-center min-h-screen'>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {socialFormValues && <SocialLayout   socialFormValues={socialFormValues}/>}
        </div>
    );
};
