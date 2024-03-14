import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import { useSelector } from "react-redux";
const WorkCard = () => {
  const [posts, setPosts] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    pageSize: 6,
    totalPages: 0,
    lastPage: false,
  });
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(false); // Define showMore state variable


  useEffect(() => {
    fetchData();
  }, [pageInfo.pageNumber]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9091/freelancing/api/allPosts?pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}&sortBy=Id&sortDirection=descending`
      );
      const jsonData = response.data;
      setPosts(jsonData.content);
      setPageInfo({
        ...pageInfo,
        totalPages: jsonData.totalPages,
        lastPage: jsonData.lastPage,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleNextPage = () => {
    if (!pageInfo.lastPage) {
      setPageInfo({
        ...pageInfo,
        pageNumber: pageInfo.pageNumber + 1,
      });
    }
  };

  const handlePreviousPage = () => {
    if (pageInfo.pageNumber > 0) {
      setPageInfo({
        ...pageInfo,
        pageNumber: pageInfo.pageNumber - 1,
      });
    }
  };

  const handleContactClick = async (id) => {
    try {
      // const response = await axios.get(`http://localhost:9091/freelancing/api/users/posts/${id}`);
      const response = await axios.get(`http://localhost:9091/freelancing/api/posts/${id}`);
      setUserData(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseComments = () => {
    setSelectedPost(null);
    setComments([]);
    setReviewSuccess(false);
  };

  const handleReviewSubmit = async () => {
    try {
      await axios.post(`http://localhost:9091/freelancing/api/comment/createComment/${selectedPost}/1`, { content: newComment });
      setReviewSuccess(true);
      setNewComment('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };
  const handleReviewClick = async (id) => {
    console.log(`Review button clicked for post with ID: ${id}`);
    try {
      const response = await axios.get(`http://localhost:9091/freelancing/api/comment/getAllbyPost/${id}`);
      setComments(response.data);
      setSelectedPost(id);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };


  return (
    <div className="container mt-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="row">
            {posts.map((post) => (
              <div className="col-md-4 mb-4" key={post.id}>
                <div className="card">
                  <img src={post.image} alt={post.title} className="card-img-top" height={'350px'} width={'100px'} />
                  <div className="card-body">
                    <h5 className="card-title" style={{ height: '100px' }}>{post.title}</h5>
                    {/* <p className="card-text">{post.description}</p> */}
                    <p className="card-text">
                      {post.description.length > 200 ? (
                        <>
                          {showMore ? post.description : post.description.slice(0, 200) + '... '}
                          <button className="btn btn-link" onClick={() => setShowMore(!showMore)}>
                            {showMore ? 'Read Less' : 'Read More'}
                          </button>
                        </>
                      ) : post.description}
                    </p>
                    <p className="card-text" style={{ backgroundColor: 'rgb(255 181 181)', width: 'max-content', padding: '3px', fontWeight: 'bold', borderRadius: '5px' }}>{post.budget} ₹/hr</p>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-primary" style={{ borderRadius: '5px' }}
                        onClick={() => handleContactClick(post.id)}
                      >
                        Contact
                      </button>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <button
                        className="btn btn-success" style={{ borderRadius: '5px' }}
                        onClick={() => handleReviewClick(post.id)}
                      >
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-3" style={{ marginBottom: '20px' }}>
            <button
              className="btn btn-outline-primary me-2"
              onClick={handlePreviousPage}
              disabled={pageInfo.pageNumber === 0}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={handleNextPage}
              disabled={pageInfo.lastPage}
            >
              Next
            </button>
          </div>
          {selectedPost && (
            <div className="modal" style={{ display: selectedPost !== null ? 'block' : 'none' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Reviews</h5>
                    <button type="button" className="btn btn-danger" aria-label="Close" onClick={handleCloseComments}>
                      X
                    </button>
                  </div>
                  <div className="modal-body">
                    <ul>
                      {comments.map((comment) => (
                        <li key={comment.id}>{comment.content}</li>
                      ))}
                    </ul>
                    <div style={{ borderRadius: '5px' }}>
                      <TextareaAutosize value={newComment} style={{ width: '100%' }} onChange={(e) => setNewComment(e.target.value)} /></div>
                    &nbsp;&nbsp;<div><button className="btn btn-primary" style={{ marginTop: '0px', alignContent: 'center' }} onClick={handleReviewSubmit} >
                      Submit Review
                    </button>
                    </div>
                    {reviewSuccess && <p>Review added successfully!</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {showModal && userData && (
            <div className="modal" style={{ display: 'block' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Recruiter Information</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                  </div>
                  <div className="modal-body">
                    <p><b>Name: </b> {userData.name}</p>
                    <p><b>Email: </b> {userData.email}</p>
                    {/* <p>Mobile Number: {userData.mobileNumber}</p> */}
                    {/* <p>City: {userData.city}</p>
                    <p>Country: {userData.country}</p> */}
                    {/* Additional user information fields */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>



      )}
    </div>
  );
};

export default WorkCard;