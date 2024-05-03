import { useEffect } from 'react';

const useLoadScript = (src, id) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.defer = true;
        script.id = id;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [src, id]);
};

export default useLoadScript;
