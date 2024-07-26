import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { MusicLayout } from '../qrContent/LayoutsQr/stylePhoneMusicLayout';
import { SocialLayout } from '../qrContent/LayoutsQr/stylePhoneSocialLayout';

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
