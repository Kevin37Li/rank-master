import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import './listInfo.css';
import axios from 'axios';

function ListInfo() {
    let id = window.location.pathname.split('/').at(-1);
    const [listItems, setListItems] = React.useState([]);
    const [listObj, setListObj] = React.useState({});

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios(
                '/myApp/get/lists/?id=' + id,
            )
            setListObj(res.data.payload);

            // from: https://www.educative.io/answers/how-can-we-sort-a-dictionary-by-value-in-javascript
            // Step - 1
            // Create the array of key-value pairs
            let dict = res.data.payload.items
            var items = Object.keys(dict).map(
                (key) => { return [key, dict[key]] });
            // Step - 2
            // Sort the array based on the second element (i.e. the value)
            items.sort(
                (first, second) => { return second[1] - first[1] }
            );
            // Step - 3
            // Obtain the list of keys in sorted order of the values.
            var keys = items.map(
                (e) => { return e[0] });
            setListItems(keys);
        };

        fetchData();
    }, []);

    let navigate = useNavigate();
    const routeChange = (link) =>{
        navigate(link);
    }

    return (
        <div className="listobj">
            <h1 className="listobjtitle">{listObj.title}</h1>
                <h2>Category: {listObj.category}</h2>
                <h2>ID: {listObj._id}</h2>
                <h2>Created by: {listObj.user}</h2>
                <h2>Created on: {new Date(listObj.createdAt/1000000).toLocaleDateString()}</h2>
                <div>
                    <h2>Global Ranking: </h2>
                    <ol>
                        {listItems.map(c => <li key={c}>{c}</li>)}
                    </ol>
                </div>
                <button className="ranklistbutton" onClick={() => routeChange(`/myApp/lists/rank/${listObj._id}`)}>
                Rank This List!
                </button>
            </div>
        );

}

export default ListInfo;