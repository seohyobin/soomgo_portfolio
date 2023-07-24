import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Section2Component() {

    const [state, setState] = React.useState({
        category: []
    });
    
    React.useEffect(() => {
        axios({
            url: './data/home/section2.json',
            method: 'GET'
        })
        .then((res) => {
            if(res.status === 200) {
                setState({
                    ...state,
                    category: res.data.category
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, [state]);

  return (
    // main-section2 main category
    <section id="section2">
        <div className="container">
            <ul className="main-category__wrap">
                {
                    state.category.map((item, idx) => {
                        return(
                            <li className="main-category__item" key={idx}>
                                <Link to="/" className="main-category__link">
                                    <div className="main-category__icon">
                                        <img src={item.imgSrc} alt={item.kind} />
                                        <p>{item.kind}</p>
                                    </div>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    </section>
  )
}
