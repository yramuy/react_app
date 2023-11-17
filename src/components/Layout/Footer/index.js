import userImg from '../../../images/user1.jpg';

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div style={{color: 'grey'}}>Sample React App <br /> <img src={userImg} alt="Image" width="50px"/>RAMU YERRAMSETTI. All rights reserved.</div>
            </div>
        </>
    );
}

export default Footer;