import React, {useState} from 'react';
import './search.css';
import {list_of_lists} from "../lists";
import { useNavigate } from "react-router-dom";

// function SearchEntries(props) {
//     let link1 = "/myApp/lists/rank";
//     // return <a to={link1} className="btn btn-primary">{props.title} - {props.category} - {props.id}</a>
//     return <button>{props.title} - {props.category} - {props.id}</button>;
// }

function Search() {
    const [searchInput, setSearchInput] = useState("");
    const [finSearchInput, setFinSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    const submitSearch = (e) => {
        setFinSearchInput(searchInput);
        setSearchResults(list_of_lists)
        e.preventDefault();
    }

    let navigate = useNavigate();
    const routeChange = (link) =>{
        navigate(link);
    }

    return (
        <div className="searchscreen">
            <div className="search">
                <div className="searchtitle">
                    <h1>Search</h1>
                </div>
                <div className="searchBar">
                    <form>
                        <input
                            type="text2"
                            placeholder='Search here'
                            onChange={(event) => handleChange(event)}
                            // value={searchInput}
                        />
                        <button className="submitSearch" onClick={(event) => submitSearch(event)}>Search</button>
                    </form>
                </div>
                <div className="searchResults">
                    <h3>Search results for {finSearchInput}:</h3>
                    <ol>
                        {searchResults.map((item) => <button onClick={() => routeChange(`/myApp/lists/rank/${item.id}`)}>{item.title} - {item.category} - {item.id}</button>)}
                    </ol>
                </div>
            </div>
        </div> 
    );
}

export default Search;