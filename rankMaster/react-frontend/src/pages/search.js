import React, {useState} from 'react';
import './search.css';
import {list_of_lists} from "../lists";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Search() {
    const [searchInput, setSearchInput] = useState("");
    const [finSearchInput, setFinSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [hasResults, setHasResults] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    var rules = (
        <div>
            <p>- Please separate search terms with spaces</p>
            <p>- All lists with names that include any search term will be displayed</p>
            <p>- Prefixes and Suffixes would be ignored (ex. "string" would display all lists with title that contains the word "string", but not "hamstring")</p>
            <p>- Correct capitalization is not necessary</p>
        </div>
    );

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    const submitSearch = (e) => {
        setFinSearchInput(searchInput.trim());
        let search_string = searchInput.trim().replaceAll(' ','+');
        console.log(search_string);
        let endpoint = '/myApp/get/lists/?contains=' + search_string;
        axios
            .get(endpoint)
            .then(function (response) {
                if (response.data.hasOwnProperty('error')){
                    console.log('no results');
                    setErrorMsg(response.data.error.message);
                    setHasResults(false);
                } else {
                    setHasResults(true);
                    setSearchResults(response.data.payload);
                    console.log(response);
                }
            });
        e.preventDefault();
    }

    let navigate = useNavigate();
    const routeChange = (link) =>{
        navigate(link);
    }

    if (!hasResults) {
        return (
            <div className="containersearch">
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
                            <h4>{errorMsg}</h4>
                        </div>
                        <hr></hr>
                        {rules}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="containersearch">
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
                            <div>
                                <ul className="resultslist">
                                    {searchResults.map((item) =>
                                        <button className="searchresultsbutton" onClick={() => routeChange(`/myApp/lists/view/${item._id}`)}>
                                            <p className="itemtitle">{item.title}</p>
                                            <br></br>
                                            <p className="itemcat">Created by: {item.user} | Date: {new Date(item.createdAt/1000000).toLocaleDateString()}</p>
                                        </button>)}
                                </ul>
                            </div>
                        </div>
                        <hr></hr>
                        {rules}
                    </div>
                </div>
            </div>
        );
    }

}

export default Search;