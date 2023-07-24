import React from 'react';
import axios from 'axios';

export default function Section14Component() {

    const [state, setState] = React.useState({
        location: [],
        locationLength: 0
    });

    const locationWrap = React.useRef();

    React.useEffect(() => {
        axios({
            url: './data/home/section14.json',
            method: 'GET'
        })
        .then((res) => {
            if(res.status === 200){
                setState({
                    ...state,
                    location: res.data.location,
                    locationLength: res.data.location.length
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }, [state]);

    React.useEffect(() => {}, []);

  return (
    <section id="section14">
        <div className="container">
            <div className="title"></div>
            <div className="content">
                <ul className="location__wrap" ref={locationWrap}>
                    {
                        state.location.map((item, idx) => {
                            return(
                                <li className="location__item" key={idx}>
                                    <a href="!#" className="location__link">
                                        {item.name}
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    </section>
  )
}
