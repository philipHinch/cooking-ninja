import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { useFetch } from '../../hooks/useFetch';
import './Create.css';

const Create = () => {

    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [newIngredient, setNewIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const ingredientInput = useRef(null)
    const history = useHistory()

    const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST')

    const handleSubmit = (e) => {
        e.preventDefault()
        postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' })
        console.log(title, method, cookingTime, ingredients);
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const ing = newIngredient.trim()

        if (ing && !ingredients.includes(ing)) {
            setIngredients(prevIngredients => [...prevIngredients, ing])
        }
        setNewIngredient('')
        ingredientInput.current.focus()
    }

    //redirect user to homepage after post request
    useEffect(() => {
        if (data) {
            history.push('/')
        }
    }, [data, history])

    return (

        <div className="create">
            <h2 className="page-title">Add a New Recipe</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipe Title:</span>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} required />
                </label>

                <label>
                    <span>Recipe Ingredients:</span>
                    <div className="ingredients">
                        <input type="text" onChange={(e) => setNewIngredient(e.target.value)} value={newIngredient} ref={ingredientInput} />
                        <button className="btn" onClick={handleAdd}>Add</button>
                    </div>
                </label>
                <p>Current Ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

                <label>
                    <span>Recipe Method:</span>
                    <textarea onChange={(e) => setMethod(e.target.value)} value={method} required />
                </label>
                <label>
                    <span>Cooking time (minutes):</span>
                    <input type="number" onChange={(e) => setCookingTime(e.target.value)} value={cookingTime} required />
                </label>
                <button className="btn">Submit</button>
            </form>
        </div >

    );
}

export default Create;