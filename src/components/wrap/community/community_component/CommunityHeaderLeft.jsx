import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './scss/c_header_left.scss';
import $ from 'jquery';
import {useNavigate}  from 'react-router-dom';
export default function CommunityHeaderLeft(){

    const navigate = useNavigate();
    const location = useLocation();
    const [isNav, setIsNav] = React.useState(false);

    const onClickQuestion = (e) => {
        e.preventDefault();
        navigate('/question');
        setIsNav(true);
    };
    const onClickFind = (e) => {
        e.preventDefault();
        navigate('/find');
    };
    const onClickHowmuch = (e) => {
        e.preventDefault();
        navigate('/howMuch');
    };
    const onClickTogether = (e) => {
        e.preventDefault();
        navigate('/together');
    };
    const onClickCommumity = (e) => {
        e.preventDefault();
        navigate('/community');
    };
    React.useEffect(() => {
        const path = location.pathname;
        $('.nav-list').removeClass('on');

        if (path === '/community') {
            $('.nav-list1').addClass('on');
        } else if (path === '/question') {
            $('.nav-list2').addClass('on');
        } else if (path === '/howMuch') {
            $('.nav-list3').addClass('on');
        } else if (path === '/find') {
            $('.nav-list4').addClass('on');
        } else if (path === '/together') {
            $('.nav-list5').addClass('on');
        }
    }, [location.pathname]);

    return (
        <ul className="topic">
            <li className='nav-list nav-list1'><Link to='community' onClick={onClickCommumity}><img src="./images/community/header/634d181f-f6cc-470c-9a1a-cfed6d9c909a.png" alt="" /><span>전체</span></Link></li>
            <li className='nav-list nav-list2'><Link to='question' onClick={onClickQuestion}><img src="./images/community/header/f1e39209-9357-4412-b962-99a9d62e6cc5.png" alt="" /><span>궁금해요</span></Link></li>
            <li className='nav-list nav-list3'><Link to='howMuch' onClick={onClickHowmuch}><img src="./images/community/header/a283e912-b56e-4310-8fa1-2c619bd0332d.png" alt="" /><span>얼마예요</span></Link></li>
            <li className='nav-list nav-list4'><Link to='find' onClick={onClickFind}><img src="./images/community/header/b3326101-bf1e-4004-8fa1-b5a0724f9e62.png" alt="" /><span>고수찾아요 </span></Link></li>
            <li className='nav-list nav-list5'><Link to ='together' onClick={onClickTogether}><img src="./images/community/header/ea04ebe5-4787-4b56-99a7-308c6310d972.png" alt="" /><span>함께해요</span></Link></li>
            {/* <li className='nav-list'><a href="!#"><img src="http://localhost:3000/images/community/header/8dbafccb-92f6-4be2-b50c-a4eade43585f.png" alt="" /><span>고수소식</span></a></li>
            <li className='nav-list'><a href="!#"><img src="http://localhost:3000/images/community/header/edf5376e-573c-4eac-8f2f-8608a004089b.png" alt="" /><span>숨고이야기</span></a></li> */}
        </ul>
       
    );
};

