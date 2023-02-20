import React, {useState} from 'react';
import './search.css';
import {list_of_lists} from "../lists";

function SearchEntries(props) {
    return <li>{props.title} - {props.category} - {props.id}</li>;
}

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

    return (
        <div className="searchscreen">
            <div className="search">
                <div className="searchtitle">
                    <h2>Search</h2>
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
                        {searchResults.map((item) => <SearchEntries title={item.title} category={item.category} id={item.id} />)}
                    </ol>
                </div>
            </div>
        </div> 
    );
}

export default Search;