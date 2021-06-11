import React, { useEffect, useState } from "react";
import Header from "../CommonHeader/Header";
import Message from "../Message";
import { Link, useParams } from "react-router-dom";
import { getUserDetails } from "../../Actions/registerAction";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { USER_UPDATE_RESET } from "../../Constants/registerContants";
import { updateUsers } from "../../Actions/registerAction";

const EditUser = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdate } = userUpdate;

  if (message !== null) {
    setTimeout(() => {
      history.push("/");
    }, 1000);
  }

  function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== "" && email.match(emailFormat)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
    } else if (
      user.name ||
      user.email ||
      user.age ||
      user.gender ||
      user._id == userId
    ) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setAge(user.age);
      setGender(user.gender);
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !age || !gender) {
      setError("Please fill all the fields");
    } else if (!isEmail(email)) {
      setError("Please enter valid email");
    } else if (
      dispatch(updateUsers({ _id: userId, name, email, age, gender }))
    ) {
      setError("");
      setMessage("User updated successfully");
    }
  };

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
          Update
        </Button>
      </Form>
    </Container>
  );
};

export default EditUser;
