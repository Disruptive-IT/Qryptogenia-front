import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserHome = () => {
    return (
        <div className='container'>
            <h1 className='display-4'>USUARIO!</h1>
            <a href='/user/profile'>User</a>
        </div>
    );
};

export default UserHome;
