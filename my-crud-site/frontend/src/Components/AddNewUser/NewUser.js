import React, { useEffect, useState } from "react";
import Header from "../CommonHeader/Header";
import Message from "../Message";
import { register } from "../../Actions/registerAction";
import { useDispatch } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";

const NewUser = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState(null);
  let [error, setError] = useState(null);
  const dispatch = useDispatch();

  if (message !== null) {
    setTimeout(() => {
      history.push("/");
    }, 1000);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !gender || !age) {
      setError("Please fill all fields");
    } else if (!isEmail(email)) {
      setError("Please enter valid email");
    } else {
      // console.log(error);
      setError("");
      dispatch(register(name, email, age, gender));
      setMessage("User registered successfully");
    }
  };
  function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== "" && email.match(emailFormat)) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <Container>
      <Header />
      <Form onSubmit={submitHandler}>
        {message && <Message variant="success">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Date of birth</Form.Label>
          <Form.Control
            type="date"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
          />
        </Form.Group>
        <Form.Label>Gender</Form.Label>
        <select
          className="custom-select"
          onChange={(e) => setGender(e.target.value)}
        >
          <option>--select--</option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
        <Button type="submit" className="mt-3">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default NewUser;
