import React from 'react';

function Hero() {
    return (
        <section className='container-fluid' id='support-hero'>
            <div className='p-3' id='support-wrapper'>
                <h4 className='fs-5'>
                    Support Portal
                </h4>
                <a href="/" className='fs-5'>Track Tickets</a>
            </div>
            <div className='row p-3 m-3'>
                <div className='col-6 p-3'>
                    <h1 className='fs-4'>Search for an answer or browse help topics <br></br>to create a ticket</h1>
                    <br></br>
                    <input placeholder='Eg. how do I acitivate F&O'></input>
                    <br />
                    <br></br>
                    <a href="/">Track account opening</a> &nbsp;
                    <a href="/">Track segment activation</a> &nbsp;
                    <a href="/">Intraday <br></br>margins</a> &nbsp;
                    <a href="/">Kite user manual</a>
                </div>
                <div className='col-6 p-5'>
                    <h1 className='fs-4'>Featured</h1>
                    <ol>
                        <li> <a href="/">Current Takeovers and Delisting - January 2024</a></li>
                        <li><a href="/">Latest Intraday leverages - MIS & CO</a></li>
                    </ol>
                </div>

            </div>
        </section>
    );
}

export default Hero;