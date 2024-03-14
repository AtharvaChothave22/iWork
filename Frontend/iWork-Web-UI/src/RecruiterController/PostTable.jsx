import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
function PostTable() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  async function handleFinish(item) {
    item.status = false;
    const response = await axios.put(
      `http://localhost:9091/freelancing/api/updatePost/${item.id}`,
      item
    );

    if (response.status == 200) {
      navigate("/my-posts");
    }
  }

  async function handleDelete(item) {
    item.status = false;
    const response = await axios.delete(
      `http://localhost:9091/freelancing/api/deleteById/${item.id}`
    );

    if (response.status == 200) {
      setData((prevData) => prevData.filter((post) => post.id !== item.id));
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await axios
      .get(`http://localhost:9091/freelancing/api/allPostsByUser/${userId}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleAddNew = () => {
    navigate("/add-work");
  };

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <Container style={{ marginTop: "10px", padding: "10px" }}>
      <h1><b>Posts</b></h1>
      <br />
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand style={{}}></Navbar.Brand>
        <Navbar.Collapse
          style={{ padding: "10px" }}
          className="justify-content-between"
        >
          <Button variant="outline-info" onClick={handleAddNew}>
            Add New
          </Button>
          <Button variant="outline-light" onClick={handleBack}>
            Back
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Row className="mt-0">
        <Col>
          <Table variant="bordered" className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                {/* <th>status</th> */}
                <th>Budget</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  {/* <td>{item.status ? "INCOMPLETE" : "COMPLETED"}</td> */}
                  <td>{item.budget}</td>
                  <td
                    const
                    style={{
                      maxHeight: "100%",
                      gap: "20px",
                      height: 'auto',
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "space-around",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "stretch",
                      background: 'white'
                    }}
                  >
                    <Link
                      to={{
                        pathname: `/edit-post/${item.id}`,
                      }}
                      className="btn btn-success"
                    >
                      Edit
                    </Link>
                    {/* <button
                      className="btn btn-warning"
                      onClick={() => handleFinish(item)}
                    >
                      Mark as Finished
                    </button> */}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default PostTable;
