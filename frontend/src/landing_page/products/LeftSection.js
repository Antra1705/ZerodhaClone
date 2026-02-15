import React from 'react';

function LeftSection({ imageURL, productName, productDescription, tryDemo, learnMore, googlePlay, appStore }) {
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-6'>
                    <img src={imageURL} alt="" />
                </div>
                <div className='col-6 p-5 mt-5'>
                    <h1>{productName}</h1>
                    <p>{productDescription}</p>
                    <div>
                        <a href={tryDemo} style={{ textDecoration: "None" }}>Try Demo <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                        <a href={learnMore} style={{ marginLeft: "50px", textDecoration: "None" }}>Learn More <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
                    <div className='mt-3'>
                        <a href={googlePlay}><img src="media/googlePlayBadge.svg" alt="google play store" /></a>
                        <a href={appStore}><img src="media/appstoreBadge.svg" style={{ marginLeft: "30px" }} alt="app store" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftSection;