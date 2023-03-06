import React from 'react';
import './home.css';
import red_ellipse from './images/ellipse-red.svg';
import purple_ellipse from './images/ellipse-purple.svg';

function Home() {
    return (
        <div className="containerhome">
            <div className="homescreen">
                <div className="home">
                    <div className="welcome">
                        <h1>Welcome to Rank Master!</h1>
                    </div>
                    <div className="about">
                        <p>Have you ever been asked what your favorite restaurant was, but couldn't decide? Or maybe you want to rank your favorite movies but can't find a site online. Either way, we're is here for you.
                            With Rank Master, you can create your own customizable lists to rank to your heart's content. 
                        </p>
                    </div>
                    <ul className="featurelist">
                        <li className="features">
                            <div className="featurestext">
                                <p>Fully Customizable</p>
                            </div>
                        </li>
                        <li className="features">
                            <div className="featurestext">
                                <p>Head-to-head Comparisons</p>
                            </div>
                        </li>
                        <li className="features">
                            <div className="featurestext">
                                <p>Share with Your Friends!</p>
                            </div>
                        </li>
                    </ul>
                    <div className="second">
                        <h1>About Us</h1>
                    </div>
                    <div className="about">
                        <p>Rank Master uses the quicksort algorithm, allowing you to pick your preferred option from two choices at a time.
                            The algorithm updates as you select, giving you an accurate and quick ranking.
                        </p>
                        <p>This application was developed by Ethan Chen, Justin Chao, Anson Chung, Weiyuan Li, and Jeremy Tsai as a part of 
                            the CS 130: Software Engineering course at UCLA.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;