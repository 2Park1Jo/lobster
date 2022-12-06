import React from 'react';
import './Spinner.css'
import SpinnerGif from './spinner.gif';

const Spinner = () => {
    return (
        <div className='spinner'>
            {/* <img src={SpinnerGif} alt="로딩중" width="10%" style={{border:'none'}}/> */}
        </div>
    );
};

export default Spinner;