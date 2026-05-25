import React from 'react';

function Footer() {
    return (
        <footer style={{ backgroundColor: "rgb(240,240,240)" }}>
            <div className='container border-top mt-5'>
                <div className='row mt-5 '>
                    <div className='col'>
                        <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "#4184f3", letterSpacing: "0.5px" }}>TradeDash</span>
                        <p>&copy; 2010 - 2026, TradeDash Broking Ltd. All rights reserved.</p>
                    </div>
                    <div className='col'>
                        <p>Company</p>
                        <a href="/about" style={{ textDecoration: "None" }}>About</a><br></br>
                        <a href="/products" style={{ textDecoration: "None" }}>Products</a><br></br>
                        <a href="/pricing" style={{ textDecoration: "None" }}>Pricing</a><br></br>
                        <a href="/" style={{ textDecoration: "None" }}>Referral programme</a><br></br>
                        <a href="/" style={{ textDecoration: "None" }}>Careers</a><br></br>
                        <a href="/" style={{ textDecoration: "None" }}>TradeDash.tech</a><br></br>
                        <a href="/" style={{ textDecoration: "None" }}>Press & media</a><br></br>
                        <a href="/" style={{ textDecoration: "None" }}>TradeDash cares (CSR)</a><br></br>
                    </div>
                    <div className='col'>
                        <p>Support</p>
                        <a href="/" style={{ textDecoration: "None" }}>Contact</a><br></br>
                        <a href="/support" style={{ textDecoration: "None" }}>Support portal</a><br></br>
                        <a href="/" style={{ textDecoration: "None" }}>T-Connect blog</a><br></br>
                        <a href="/" style={{ textDecoration: "None" }}>List of charges</a><br></br>
                        <a href="/" style={{ textDecoration: "None" }}>Download & resources</a><br></br>
                    </div>
                    <div className='col'>
                        <p>Account</p>
                        <a href="/signup" style={{ textDecoration: "None" }}>Open an account</a><br></br>
                        <a href="/" style={{ textDecoration: "None" }}>Fund transfer</a><br></br>
                        <a href="/" style={{ textDecoration: "None" }}>60 day challenge</a><br></br>
                    </div>
                </div>
                <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>
                    <p>
                        TradeDash Broking Ltd.: Member of NSE​ &​ BSE – SEBI Registration no.:
                        INZ000031633 CDSL: Depository services through TradeDash Securities
                        Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading
                        through TradeDash Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration
                        no.: INZ000038238 Registered Address: TradeDash Broking Ltd.,
                        #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
                        J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
                        complaints pertaining to securities broking please write to
                        complaints@tradedash.com, for DP related to dp@tradedash.com. Please
                        ensure you carefully read the Risk Disclosure Document as prescribed
                        by SEBI | ICF
                    </p>

                    <p>
                        Procedure to file a complaint on SEBI SCORES: Register on SCORES
                        portal. Mandatory details for filing complaints on SCORES: Name,
                        PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
                        Communication, Speedy redressal of the grievances
                    </p>

                    <p>
                        Investments in securities market are subject to market risks; read
                        all the related documents carefully before investing.
                    </p>

                    <p>
                        "Prevent unauthorised transactions in your account. Update your
                        mobile numbers/email IDs with your stock brokers. Receive
                        information of your transactions directly from Exchange on your
                        mobile/email at the end of the day. Issued in the interest of
                        investors. KYC is one time exercise while dealing in securities
                        markets - once KYC is done through a SEBI registered intermediary
                        (broker, DP, Mutual Fund etc.), you need not undergo the same
                        process again when you approach another intermediary." Dear
                        Investor, if you are subscribing to an IPO, there is no need to
                        issue a cheque. Please write the Bank account number and sign the
                        IPO application form to authorize your bank to make payment in case
                        of allotment. In case of non allotment the funds will remain in your
                        bank account. As a business we don't give stock tips, and have not
                        authorized anyone to trade on behalf of others. If you find anyone
                        claiming to be part of TradeDash and offering such services, please
                        create a ticket here.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;