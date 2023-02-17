import React from 'react';
import './home.css';
import image from './5039684.jpg'

function Home() {
    return (
        <div className="home">
            {/*<img className="back" src={image}></img>*/}
            <div className="welcome">
                <h1>Welcome to Rank Master!</h1>
            </div>
            <div className="about">
                <p>Have you ever been asked what your favorite restaurant in Sawtelle was, but couldn't decide? Or maybe you </p>
            </div>
        </div>
    );
}

export default Home;