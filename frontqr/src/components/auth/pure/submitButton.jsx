import React from 'react';
import "./btns.css"

export const SubmitButton = ({text}) => {
    return(
        <div style={{width:'100%'}}>
            <button type="submit" className='btnSubmit'>{text}</button>
        </div>
    )
}
