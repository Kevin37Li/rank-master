import { useState } from 'react';
import './listmaker.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useSelector} from "react-redux";

function ListMaker() {
    const curr_user = useSelector(state => state.username);
    // console.log(curr_user);
    const login = useSelector(state => state.checkLogin);
    // console.log(login);
    const curr_jwt = useSelector(state => state.jwt);
    // console.log(curr_jwt);

    const [formItemFields, setFormItemFields] = useState([
        { },
    ])

    const [listName, setListName] = useState([
        { name: '' },
    ])

    const [category, setCategory] = useState('Other')

    const [isPublic, setPublic] = useState('private');

    let navigate = useNavigate();
    const routeChange = (link) =>{
        navigate(link);
    }

    const handleNameChange = (event) => {
        setListName(event.target.value);
    }

    const handleItemFormChange = (event, index) => {
        let data = [...formItemFields];
        data[index][event.target.name] = event.target.value;
        setFormItemFields(data);
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }

    const handlePrivacy = () => {
        setPublic(!isPublic);
    }

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("user", curr_user);
        formData.append("title", listName);
        formData.append("category", category);
        if (isPublic) {
            formData.append("public", 'private');
        }
        for (let i = 0; i < formItemFields.length; i++) {
            for (const key in formItemFields[i]) {
                let nkey = 'item' + i;
                formData.append(nkey, formItemFields[i][key]);
            }
        }
        console.log(formData);
        console.log(JSON.parse(curr_jwt));
        console.log(JSON.parse(curr_jwt).access);
        axios.post('/myApp/lists/create/', formData, {
            headers: {
                "Authorization": "Bearer " + JSON.parse(curr_jwt).access
            }
        }).then(res => {
            routeChange(`/myApp/lists/view/${res.data.id}`);
        });
    }

    const submitList = (e) => {
        const list = {
            name: listName,
            category: category,
            public: isPublic,
            items: formItemFields
        }
        console.log('Submitted: ', list);
    }

    const addItemFields = () => {
        let object = { }

        setFormItemFields([...formItemFields, object])
    }

    const removeItemFields = (index) => {
        let data = [...formItemFields];
        data.splice(index, 1)
        setFormItemFields(data)
    }

    if (login) {
        return (
            <div className="container">
                <div className="createscreen">
                    <div className="ListMaker">
                        <div className="title">
                            <h1>Create Your Own List</h1>
                        </div>
                        {/*<form method="post" onSubmit={submit}>*/}
                        <form onSubmit={submit}>
                            <div className="ListNameForm">
                                <input
                                    type="text"
                                    name='title'
                                    placeholder='List Name'
                                    onChange={event => handleNameChange(event)}
                                />
                            </div>
                            <div className="PubPriv">
                                <label>
                                    Public List:
                                    <input
                                        name="public"
                                        type="checkbox"
                                        checked={isPublic}
                                        value={isPublic}
                                        onChange={handlePrivacy}/>
                                </label>
                            </div>
                            <div className="Category" onChange={event => handleCategoryChange(event)}>
                                <input type="radio" value="Movies" name="category"/> Movie
                                <input type="radio" value="Music" name="category"/> Music
                                <input type="radio" value="Sports" name="category"/> Sports
                                <input type="radio" value="TV" name="category"/> TV
                                <input type="radio" value="Other" name="category" defaultChecked /> Other
                            </div>
                            <div className="ItemList">
                                {formItemFields.map((form, index) => {
                                    return (
                                        <div key={index}>
                                            <input
                                                type="text"
                                                name={'item' + index}
                                                placeholder='Item'
                                                onChange={event => handleItemFormChange(event, index)}
                                                value={form['item' + index]}
                                            />
                                            <button className="remove" onClick={() => removeItemFields(index)}>Remove</button>
                                        </div>
                                    )
                                })}
                                <button type="button" className="add" onClick={addItemFields}>Add More Items</button>
                                <button className="submit" onClick={submitList}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return(
            <div className="container">
                Please log in to create lists.
            </div>
        )
    }

}

export default ListMaker;