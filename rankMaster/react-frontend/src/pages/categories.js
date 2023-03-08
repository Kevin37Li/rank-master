import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import {list_of_lists} from "../lists"
import { useNavigate } from "react-router-dom";
import './categories.css';

function Categories() {
    // const [items, setItems] = React.useState([]);
    // const [selected, setSelected] = React.useState([]);

    const handleClick = (id) => { console.log(String(id), ' clicked!')};

    let navigate = useNavigate();
    const routeChange = (link) =>{
        navigate(link);
    }

    let movie_items = list_of_lists;
    let music_items = list_of_lists;
    let sport_items = list_of_lists;
    let tv_items = list_of_lists;
    let others_items = list_of_lists;

    return (
        <div className="containercat">
            <meta charset="UTF-8"></meta>
            <div className="categoriesscreen">
                <div className="categories">
                    <h1 className="title">Categories</h1>
                    <div>
                        <h3>Movies</h3>
                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                            {movie_items.map((item) => (
                                <button className="catbutton" onClick={() => routeChange(`/myApp/lists/rank/${item.id}`)} style={{width: '20vw',}}>
                                    <p className="titletext">{item.title}</p>
                                </button>
                            ))}
                        </ScrollMenu>
                    </div>
                    <div>
                        <h3>Music</h3>
                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                            {music_items.map((item) => (
                                <button className="catbutton" onClick={() => routeChange(`/myApp/lists/rank/${item.id}`)} style={{width: '20vw',}}>
                                    <p className="titletext">{item.title}</p>
                                </button>
                            ))}
                        </ScrollMenu>
                    </div>
                    <div>
                        <h3>Sports</h3>
                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                            {sport_items.map((item) => (
                                <button className="catbutton" onClick={() => routeChange(`/myApp/lists/rank/${item.id}`)} style={{width: '20vw',}}>
                                    <p className="titletext">{item.title}</p>
                                </button>
                            ))}
                        </ScrollMenu>
                    </div>
                    <div>
                        <h3>TV</h3>
                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                            {tv_items.map((item) => (
                                <button className="catbutton" onClick={() => routeChange(`/myApp/lists/rank/${item.id}`)} style={{width: '20vw',}}>
                                    <p className="titletext">{item.title}</p>
                                </button>
                            ))}
                        </ScrollMenu>
                    </div>
                    <div>
                        <h3>Others</h3>
                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                            {others_items.map((item) => (
                                <button className="catbutton" onClick={() => routeChange(`/myApp/lists/rank/${item.id}`)} style={{width: '20vw',}}>
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

