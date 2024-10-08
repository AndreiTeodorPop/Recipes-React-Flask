import React, {useState} from 'react';
import {Button, Form, Alert} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

const SignUpPage = () => {

    const {register, clearErrors, handleSubmit, reset, formState: {errors}} = useForm();
    const [show, setShow] = useState(false);
    const [serverResponse, setServerResponse] = useState("");

    const submitForm = (data) => {

        const body = {
            username: data.username,
            email: data.email,
            password: data.password
        }

        if (data.password === data.confirmPassword) {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            }


            fetch("/auth/signup", requestOptions)
                .then(response => response.json())
                .then(data => {
                    setServerResponse(data.message);
                    setShow(true)
                })
                .catch(error => console.log(error));

            reset()
        } else {
            alert("Passwords don't match");
        }
    }

    return (
        <div className="container">
            <div className="form">
                {show ?
                    <>
                        <Alert variant="success" onClose={() => setShow(false)} dismissible>
                            <p>
                                {serverResponse}
                            </p>
                        </Alert>
                        <h1>Sign Up Page</h1>
                    </>
                    :
                    <h1>Sign Up Page</h1>
                }
                <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Your username"
                            // value={username}
                            // name="username"
                            // onChange={(e) => setUsername(e.target.value)}
                                      {...register("username", {required: true, maxLength: 25})}
                        />
                        {errors.username && <p style={{color: "red"}}><small>Username is required</small></p>}
                        {errors.username?.type === "maxLength" &&
                            <p style={{color: "red"}}><small>Max characters should be 25</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                                      placeholder="Your email"
                            // value={email}
                            // name="email"
                            // onChange={(e) => setEmail(e.target.value)}
                                      {...register("email", {required: true, maxLength: 80})}
                        />
                        {errors.email && <p style={{color: "red"}}><small>Email is required</small></p>}
                        {errors.email?.type === "maxLength" &&
                            <p style={{color: "red"}}><small>>Max characters should be 80</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                                      placeholder="Your password"
                            // value={password}
                            // name="password"
                            // onChange={(e) => setPassword(e.target.value)}
                                      {...register("password", {required: true, minLength: 8})}
                                      onChange={() => clearErrors("password")}
                        />
                        {errors.password?.type === "required" &&
                            <p style={{color: "red"}}><small>Password is required</small></p>}
                        {errors.password?.type === "minLength" &&
                            <p style={{color: "red"}}><small>Min characters should be 8</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"
                                      placeholder="Your password"
                            // value={confirmPassword}
                            // name="confirmPassword"
                            // onChange={(e) => setConfirmPassword(e.target.value)}
                                      {...register("confirmPassword", {required: true, minLength: 8})}
                                      onChange={() => clearErrors("confirmPassword")}
                        />
                        {errors.confirmPassword?.type === "required" &&
                            <p style={{color: "red"}}><small>Confirm password is required</small></p>}
                        {errors.confirmPassword?.type === "minLength" &&
                            <p style={{color: "red"}}><small>Min characters should be 8</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={handleSubmit(submitForm)}>Sign Up</Button>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <small>Already have an account? <Link to="/login">Log In</Link></small>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage;