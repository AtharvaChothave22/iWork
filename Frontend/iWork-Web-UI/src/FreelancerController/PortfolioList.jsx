import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PortfolioList() {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.get('http://localhost:9091/freelancing/api/Portfolio/allPortfolio');
        setPortfolios(response.data);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      }
    };

    fetchPortfolios();
  }, []);

  const handleContactClick = (id) => {
    console.log(`Contact button clicked for portfolio with ID: ${id}`);
    // Implement contact functionality as per your requirement
  };

  const handleReviewClick = async (id) => {
    console.log(`Review button clicked for portfolio with ID: ${id}`);
    try {
      const response = await axios.get(`http://localhost:9091/freelancing/api/comment/getAllbyPortFolio/${id}`);
      setComments(response.data);
      setSelectedPortfolio(id);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCloseComments = () => {
    setSelectedPortfolio(null);
    setComments([]);
    setReviewSuccess(false);
  };

  const handleReviewSubmit = async () => {
    try {
      await axios.post(`http://localhost:9091/freelancing/api/comment/createComment/${selectedPortfolio}/1`, { content: newComment });
      setReviewSuccess(true);
      setNewComment('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {portfolios.map(portfolio => (
          <div className="col-md-4 mb-4" key={portfolio.id}>
            <div className={`card ${selectedPortfolio === portfolio.id ? 'border-primary' : ''}`}>
              <div className="card-body">
                <h5 className="card-title">{portfolio.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{portfolio.category.title}</h6>
                <p className="card-text">{portfolio.description}</p>
                <p className="card-text">Hourly Charges: ${portfolio.hourlyCharges}</p>
                <div className="d-flex justify-content-center align-items-center mb-3" style={{ height: '200px' }}>
                  <img src={portfolio.image} alt={portfolio.title} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </div>
                <button className="btn btn-primary me-2" onClick={() => handleContactClick(portfolio.id)}>Contact</button>
                <button className="btn btn-danger" onClick={() => handleReviewClick(portfolio.id)}>Review</button>
              </div>
            </div>
            {selectedPortfolio === portfolio.id && (
              <div className="mt-3">
                <h5>Comments:</h5>
                <ul className="list-group">
                  {comments.map(comment => (
                    <li key={comment.commentId} className="list-group-item">{comment.content}</li>
                  ))}
                </ul>
                <div className="mt-2">
                  <textarea 
                    value={newComment} 
                    onChange={(e) => setNewComment(e.target.value)} 
                    className="form-control" 
                    rows="3" 
                    placeholder="Enter your review" 
                  />
                  <button className="btn btn-primary mt-2" onClick={handleReviewSubmit}>Add Review</button>
                  {reviewSuccess && <div className="text-success">Review added successfully!</div>}
                </div>
                <button className="btn btn-secondary mt-2" onClick={handleCloseComments}>Close Comments</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PortfolioList;
