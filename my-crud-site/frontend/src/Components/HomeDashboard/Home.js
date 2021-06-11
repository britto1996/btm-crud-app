import React, { useEffect } from "react";
import "./Home.css";
import { Container, Button, Table } from "react-bootstrap";
import Header from "../CommonHeader/Header";
import { Link } from "react-router-dom";
import { getAllUsers, deleteUsers } from "../../Actions/registerAction";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, successDelete]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you wan't to delete it ?")) {
      dispatch(deleteUsers(id));
    }
  };
  return (
    <Container>
      <Header />
      <Link to="/register">
        <button className="add__button">Add New Person</button>
      </Link>
      <Table className="content__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of birth</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>
                <Link to={`/edit/${user._id}`}>
                  <Button className="editButton">Edit</Button>
                </Link>

                <Button
                  variant="danger"
                  onClick={() => deleteHandler(user._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
