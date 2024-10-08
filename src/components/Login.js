import React from 'react';
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {login} from "../auth";
import {useNavigate} from "react-router-dom";


const LoginPage = () => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const navigate = useNavigate();

    const loginUser = (data) => {
        console.log(data)

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch("/auth/login", requestOptions)
            .then(response => response.json())
            .then(data => {
                // console.log(data.access_token)
                login(data.access_token)
                navigate("/")
            })
        reset()
    }

    return (
        <div className="container">
            <div className="form">
                <h1>Login Page</h1>
                <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Your username"
                                      {...register("username", {required: true, maxLength: 25})}
                        />
                    </Form.Group>
                    {errors.username?.type === "required" &&
                        <p style={{color: "red"}}><small>Username is required</small></p>}
                    {errors.username?.type === "maxLength" &&
                        <p style={{color: "red"}}><small>Max characters should be 25</small></p>}
                    <br/>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                                      placeholder="Your password"
                                      {...register("password", {required: true, minLength: 8})}
                        />
                    </Form.Group>
                    {errors.password?.type === "required" &&
                        <p style={{color: "red"}}><small>Password is required</small></p>}
                    {errors.password?.type === "minLength" &&
                        <p style={{color: "red"}}><small>Min characters should be 8</small></p>}
                    <br/>
                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={handleSubmit(loginUser)}>Log In</Button>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <small>Do not have an account? <Link to="/signup">Create One</Link></small>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;