import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsPlusLg, BsXLg } from 'react-icons/bs';
import { FaStar, FaStarHalf, FaTrashAlt, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

function AMovie() {
  const { id } = useParams();
  const [deleteRev, setDeleteRev] = useState(false);
  const [movie, setMovie] = useState({
    title: '',
    genre: '',
    poster_img: '',
    mpaa_rating: 0,
    all_reviews: [],
    avg_rating: 0,
  })
  const [isEditMode, setIsEditMode] = useState(false)
  const [newReview, setNewReview] = useState({
    star_rating: 0,
    review_text: '',
    movie_id: id
  })

  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:5000/movie/get/${id}`)
      .then(response => {
        setMovie({
          title: response.data.movie.title,
          genre: response.data.movie.genre,
          poster_img: response.data.movie.poster_img,
          mpaa_rating: response.data.movie.mpaa_rating,
          all_reviews: response.data.movie.all_reviews,
          avg_rating: response.data.avg_rating,
        })
      })
      .catch(err => {
        console.error(err);
      })
  }, [id, isEditMode, deleteRev])

  const handleEditClick = () => {
    setIsEditMode(!isEditMode)
  }

  const handleChange = (event) => {
    setNewReview({
      ...newReview,
      [event.target.name]: event.target.value
    })

    console.log(newReview)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/review/add', newReview)
      .then(response => {
        console.log(response);
        setIsEditMode(false);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setNewReview({
          star_rating: 0,
          review_text: '',
          movie_id: id
        });
      })
  }

  const backToHome = () => {
    navigate('/');
  }
  const handleDeleteReview = (reviewId) => {
    axios.delete(`http://localhost:5000/review/delete/${reviewId}`)
      .then(response => {
        setDeleteRev(!deleteRev);
      })
      .catch(err => {
        console.error(err);
      })
  }


  const getStars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar key={i} />);
    }
    if (rating % 1 !== 0) {
      stars.push(<FaStarHalf key={rating} />);
    }
    return stars;
  }

  console.log(movie)


  const getReviews = () => {
    return movie.all_reviews.map((review) => {
      return (
        <div className="a-review">
          <div className="stars">
            {getStars(review.star_rating)}
          </div>
          <h4>{review.review_text}</h4>
          <div className="delete-review">
            <button onClick={() => handleDeleteReview(review.id)}><FaTrashAlt /></button>
          </div>
        </div>)
    })
  }

  return (
    <div className="a-movie-container">
      <button className="back-btn" onClick={backToHome}>
        <FaArrowLeft /> Back
      </button>
      <div className="a-movie-box">
        <h1>{movie.title}</h1>
        <h2>{movie.genre}</h2>
        <img src={movie.poster_img} alt={movie.title} crossOrigin="anonymous" />
        <h3>{movie.mpaa_rating}</h3>
        <h4>Average Rating</h4>
        <div className="stars">
          {getStars(movie.avg_rating)}
        </div>
      </div>
      <div className="movie-review-container">
        <h1>Reviews</h1>
        <button className="add-review-btn" onClick={handleEditClick}>
          <BsPlusLg />Add A Review
        </button>
        {isEditMode ? (
          <div className="edit-form">

            <form className="review-form" onSubmit={handleSubmit}>
              <BsXLg className="x-button" onClick={handleEditClick} />
              <label>Rating:</label>
              <input onChange={handleChange} name="star_rating" type="number" min="0" max="5" />

              <label>Review:</label>
              <textarea rows="3" onChange={handleChange} name="review_text" type="text" />

              <button type="submit">Submit</button>
            </form>
          </div>
        ) : null}
        <div className="movie-review">
          {getReviews()}
        </div>
      </div>
    </div>
  )
}

export default AMovie