import { useState } from 'react';

function ListMaker() {
    const [formItemFields, setFormItemFields] = useState([
        { item: '' },
    ])

    const [listName, setListName] = useState([
        { name: '' },
    ])

    const [category, setCategory] = useState([
        { name: 'Other' },
    ])

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

    const submit = (e) => {
        e.preventDefault();
        // const list = {
        //     name: listName,
        //     category: category,
        //     items: formItemFields
        // }
        // console.log(list)
    }

    const submitList = (e) => {
        e.preventDefault();
        const list = {
            name: listName,
            category: category,
            items: formItemFields
        }
        console.log('Submitted:', list)
    }

    const addItemFields = () => {
        let object = {
            item: ''
        }

        setFormItemFields([...formItemFields, object])
    }

    const removeItemFields = (index) => {
        let data = [...formItemFields];
        data.splice(index, 1)
        setFormItemFields(data)
    }

    return (
        <div className="ListMaker">
            <form onSubmit={submit}>
                <div className="ListName">
                    ListName:
                    <input
                        name='listName'
                        placeholder='List Name'
                        onChange={event => handleNameChange(event)}
                    />
                </div>
                <div className="Category" onChange={event => handleCategoryChange(event)}>
                    <input type="radio" value="Movies" name="category"/> Movie
                    <input type="radio" value="Music" name="category"/> Music
                    <input type="radio" value="Sports" name="category"/> Sports
                    <input type="radio" value="TV" name="category"/> TV
                    <input type="radio" value="Other" name="category"/> Other
                </div>
                <div className="ItemList">
                    {formItemFields.map((form, index) => {
                        return (
                            <div key={index}>
                                <input
                                    name='item'
                                    placeholder='Item'
                                    onChange={event => handleItemFormChange(event, index)}
                                    value={form.item}
                                />
                                <button onClick={() => removeItemFields(index)}>Remove</button>
                            </div>
                        )
                    })}
                    <button onClick={addItemFields}>Add More Items</button>
                </div>
                <button onClick={submitList}>Submit</button>
            </form>
        </div>
    );
}

export default ListMaker;