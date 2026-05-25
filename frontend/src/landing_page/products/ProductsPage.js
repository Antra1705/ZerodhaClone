import React from 'react';
import Hero from './Hero';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import Universe from './Universe';

function ProductsPage() {
    return (
        <>
            <Hero />
            <LeftSection imageURL="media/kite.png" productName="TradeDash Terminal" productDescription="Our ultra-fast flagship trading platform with streaming US market data, advanced TradingView charts, an elegant UI, and more. Enjoy the TradeDash experience seamlessly." tryDemo="" learnMore="" googlePlay="" appStore="" />
            <RightSection imageURL="media/console.png" productName="Console" productDescription="The central dashboard for your TradeDash account. Gain insights into your trades and investments with in-depth reports and visualisations." learnMore="" />
            <LeftSection imageURL="media/coin.png" productName="Coin" productDescription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience dynamically." tryDemo="" learnMore="" googlePlay="" appStore="" />
            <RightSection imageURL="media/kiteconnect.png" productName="TradeDash API" productDescription="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase." learnMore="" />
            <LeftSection imageURL="media/varsity.png" productName="Varsity mobile" productDescription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go." tryDemo="" learnMore="" googlePlay="" appStore="" />
            <p className='text-center mt-5 mb -5'>Want to know more about our technology stack? Check out the TradeDash.techblog.</p>
            <Universe />
        </>
    );
}

export default ProductsPage;