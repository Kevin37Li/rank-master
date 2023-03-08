import React, {useEffect} from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import {list_of_lists} from "../lists"
import { useNavigate } from "react-router-dom";
import './categories.css';
import axios from 'axios';

function Categories() {
    const [items, setItems] = React.useState({movies: null, music: null});
    // const [selected, setSelected] = React.useState([]);
    const [movieItems, setMovieItems] = React.useState([]);
    const [musicItems, setMusicItems] = React.useState([]);
    const [sportsItems, setSportsItems] = React.useState([]);
    const [tvItems, setTVItems] = React.useState([]);
    const [otherItems, setOtherItems] = React.useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const moviesResults = await axios(
    //             '/myApp/get/lists/?category=Movies',
    //         );
    //         const musicResults = await axios(
    //             '/myApp/get/lists/?category=Music',
    //         );
    //
    //         // setGitData({ data: respGlobal.data, repos: respGlobal.data });
    //         setItems({movies: moviesResults.data.payload, music: musicResults.data.payload});
    //     };
    //
    //     fetchData();
    // }, []);

    const getCategoryData = () => {
        let endpoints = [
            '/myApp/get/lists/?category=Movies',
            '/myApp/get/lists/?category=Music',
            '/myApp/get/lists/?category=Sports',
            '/myApp/get/lists/?category=TV',
            '/myApp/get/lists/?category=Other',
        ];
        Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([{data: movies}, {data: music}, {data: sports}, {data: tv}, {data: other}] )=> {
            setMovieItems(movies.payload);
            setMusicItems(music.payload);
            setSportsItems(sports.payload);
            setTVItems(tv.payload);
            setOtherItems(other.payload);
        });
    }

    useEffect(() => {
        getCategoryData();
    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const moviesResults = await axios(
    //             '/myApp/get/lists/?category=Movies',
    //         );
    //         const musicResults = await axios(
    //             '/myApp/get/lists/?category=Music',
    //         );
    //
    //         console.log(moviesResults.data.payload);
    //         setMovieItems(moviesResults.data.payload);
    //         setMusicItems(musicResults.data.payload);
    //     };
    //
    //     fetchData();
    // }, []);

    const handleClick = (id) => { console.log(String(id), ' clicked!')};

    let navigate = useNavigate();
    const routeChange = (link) =>{
        navigate(link);
    }

    return (
        <div className="containercat">
            <meta charset="UTF-8"></meta>
            <div className="categoriesscreen">
                <div className="categories">
                    <h1 className="title">Categories</h1>
                    <div>
                        <h3>Movies</h3>
                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                            {movieItems.map((item) => (
                                <button className="catbutton" onClick={() => routeChange(`/myApp/lists/view/${item._id}`)} style={{width: '20vw',}}>
                                    <p className="titletext">{item.title}</p>
                                </button>
                            ))}
                        </ScrollMenu>
                    </div>
                    <div>
                        <h3>Music</h3>
                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                            {musicItems.map((item) => (
                                <button className="catbutton" onClick={() => routeChange(`/myApp/lists/view/${item._id}`)} style={{width: '20vw',}}>
                                    <p className="titletext">{item.title}</p>
                                </button>
                            ))}
                        </ScrollMenu>
                    </div>
                    <div>
                        <h3>Sports</h3>
                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                            {sportsItems.map((item) => (
                                <button className="catbutton" onClick={() => routeChange(`/myApp/lists/view/${item._id}`)} style={{width: '20vw',}}>
                                    <p className="titletext">{item.title}</p>
                                </button>
                            ))}
                        </ScrollMenu>
                    </div>
                    <div>
                        <h3>TV</h3>
                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                            {tvItems.map((item) => (
                                <button className="catbutton" onClick={() => routeChange(`/myApp/lists/view/${item._id}`)} style={{width: '20vw',}}>
                                    <p className="titletext">{item.title}</p>
                                </button>
                            ))}
                        </ScrollMenu>
                    </div>
                    <div>
                        <h3>Others</h3>
                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                            {otherItems.map((item) => (
                                <button className="catbutton" onClick={() => routeChange(`/myApp/lists/view/${item._id}`)} style={{width: '20vw',}}>
                                    <p className="titletext">{item.title}</p>
                                </button>
                            ))}
                        </ScrollMenu>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
        React.useContext(VisibilityContext);

    return (
        <button className="leftarr" disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
            &#x25C0;
        </button>
    );
}

function RightArrow() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

    return (
        <button className="rightarr" disabled={isLastItemVisible} onClick={() => scrollNext()}>
            &#x25B6;
        </button>
    );
}

export default Categories;

