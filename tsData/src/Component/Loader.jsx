import React from 'react';
import LoaderImg from '../Assets/LoadGIf.gif'

function Loader() {
    return (
        <div style={{ position:'absolute',top:'0px',left:'0px',width: '100%', height: '100dvh', zIndex: '9999' ,backgroundColor:'gray',textAlign:'center'}}>
            <img height='500px' width='500px' src={LoaderImg} alt='loader' />
        </div>
    )
}

export default Loader