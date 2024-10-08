import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useAuth} from "../auth";
import Recipe from "./Recipe";
import {Button, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";


const LoggedInHome = () => {

    const {register, handleSubmit, setValue, formState: {errors}} = useForm();

    const [recipeId, setRecipeId] = useState(0);

    const [recipes, setRecipes] = useState([]);

    const [show, setShow] = useState(false);

    useEffect(
        () => {
            getAllRecipes();
        }, [])

    const getAllRecipes = () => {
        fetch("/recipe/recipes")
            .then(res => res.json())
            .then(data => {
                setRecipes(data)
            })
            .catch(err => console.log(err));
    }

    const closeModal = () => {
        setShow(false)
    }

    const showModal = (id) => {
        console.log(id);
        setShow(true)
        setRecipeId(id)
        recipes.forEach(
            (recipe) => {
                if (recipe.id === id) {
                    setValue("title", recipe.title);
                    setValue("description", recipe.description);
                }
            }
        )
    }

    const updateRecipe = (data) => {
        console.log(data.id)
        let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        const requestOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data)
        }

        fetch(`/recipe/recipe/${recipeId}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    const deleteRecipe = (id) => {
        console.log(id);

        let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');

        const requestOptions = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        }
        fetch(`/recipe/recipe/${id}`, requestOptions)
            .then(res => res.json())
            .then(() => {
                getAllRecipes();
            })
            .catch(err => console.log(err));

    }

    return (
        <div className="recipes">
            <Modal show={show} size="lg" onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"
                                          {...register("title", {required: true, maxLength: 25})}
                            />
                        </Form.Group>
                        {errors.title?.type === "required" &&
                            <p style={{color: "red"}}><small>Title is required</small></p>}
                        {errors.title?.type === "maxLength" &&
                            <p style={{color: "red"}}><small>Title should be less than 25 characters</small></p>}
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={5}
                                          {...register("description", {required: true, maxLength: 255})}
                            />
                        </Form.Group>
                        {errors.description?.type === "required" &&
                            <p style={{color: "red"}}><small>Description is required</small></p>}
                        {errors.description?.type === "maxLength" &&
                            <p style={{color: "red"}}><small>Description should be less than 255 characters</small></p>}
                        <br/>
                        <Form.Group>
                            <Button variant="primary" onClick={handleSubmit(updateRecipe)}>Save</Button>
                        </Form.Group>
                    </form>
                </Modal.Body>
            </Modal>
            <h1 className="list-of-recipes">List of Recipes</h1>
            {
                recipes.sort((recipe1, recipe2) => recipe1.id > recipe2.id ? 1 : -1)
                    .map((recipe, index) => (
                            <Recipe key={index} title={recipe.title} description={recipe.description}
                                    onClick={() => {
                                        (showModal(recipe.id))
                                    }}
                                    onDelete={() => {
                                        deleteRecipe(recipe.id)
                                    }}
                            />

                        )
                    )
            }
        </div>
    )
}

const LoggedOutHome = () => {
    return (
        <div className="home container">
            <h1 className="heading">Welcome to the Recipes</h1>
            <Link to="/signup" className="btn btn-primary btn-lg">Get Started</Link>
        </div>
    )
}

const HomePage = () => {

    const [logged] = useAuth()
    return (
        <div>
            {logged ? <LoggedInHome/> : <LoggedOutHome/>}
        </div>
    )
}

export default HomePage;