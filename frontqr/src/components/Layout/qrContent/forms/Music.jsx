import React, { useState } from 'react';
import axios from 'axios';

const SpotifyPlaylistComponent = () => {
    const [playlistUrl, setPlaylistUrl] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [playlistData, setPlaylistData] = useState(null);
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [error, setError] = useState(null);

    const clientId = '18098b15ae484da3b8a5245ecb6727fc';
    const clientSecret = 'b8dfc66fb17643eaaa47586a4e2cb8e2';

    const handleInputChange = (event) => {
        setPlaylistUrl(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Obtener el token de acceso
            const authString = btoa(`${clientId}:${clientSecret}`);
            const response = await axios.post(
                'https://accounts.spotify.com/api/token',
                'grant_type=client_credentials',
                {
                    headers: {
                        Authorization: `Basic ${authString}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            const accessToken = response.data.access_token;
            setAccessToken(accessToken);

            // Obtener los datos de la playlist
            const playlistId = playlistUrl.split('/').pop();
            const playlistResponse = await axios.get(
                `https://api.spotify.com/v1/playlists/${playlistId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setPlaylistData(playlistResponse.data);
            console.log(playlistResponse)

            // Obtener los tracks de la playlist
            const tracksResponse = await axios.get(
                `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setPlaylistTracks(tracksResponse.data.items);
        } catch (error) {
            setError(error.response.data);
        }
    };

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-gray-100 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="mb-4">
                <label className="block mb-2">
                    Ingresa el enlace:
                    <input
                        type="text"
                        value={playlistUrl}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                >
                    Submit
                </button>
            </form>
            {playlistData && (
                <div>
                    <h2>Información de la Playlist:</h2>
                    <p>Nombre: {playlistData.name}</p>
                    <p>Descripción: {playlistData.description}</p>
                    <p>Propietario: {playlistData.owner.display_name}</p>
                    {/* Agrega más información de la playlist según tus necesidades */}
                </div>
            )}

            <div className="mb-4 max-h-60 overflow-y-auto">
                {playlistData && playlistData.tracks && (
                    <div>
                        <h2>Canciones de la Playlist:</h2>
                        <ul>
                            {playlistData.tracks.items.map((track, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <img src={track.track.album.images[0].url} alt={track.track.album.name} style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                                    <div style={{ flexGrow: '1' }}>
                                        <p>{track.track.name}</p>
                                        <p>{track.track.album.name}</p>
                                        <p>{convertMillisecondsToMinutes(track.track.duration_ms)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>


            {error && (
                <div>
                    <h2 className="text-lg font-semibold mb-1">Error:</h2>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

function convertMillisecondsToMinutes(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export default SpotifyPlaylistComponent;
