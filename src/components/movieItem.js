import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class MovieItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false,
      title: '',
      genre: '',
      poster_img: '',
      mpaa_rating: '',
    }

    this.deleteMovie = this.deleteMovie.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.editMovie = this.editMovie.bind(this);
  }


  deleteMovie(event) {
    let currentId = this.props.movie.id
    axios.delete(`http://127.0.0.1:5000/movie/delete/${currentId}`)
      .then(res => res.JSON())
      .catch(err => { console.error(err) })
  }

  editMovie(event) {
    let currentId = this.props.movie.id
    let data = {
      title: `${this.state.title ? this.state.title : this.props.movie.title}`,
      genre: `${this.state.genre ? this.state.genre : this.props.movie.genre}`,
      poster_img: `${this.state.poster_img ? this.state.poster_img : this.props.movie.poster_img}`,
      mpaa_rating: `${this.state.mpaa_rating ? this.state.mpaa_rating : this.props.mpaa_rating}`
    }
    axios.put(`http://127.0.0.1:5000/movie/edit/${currentId}`, data)
      .then(res => { console.log(res) })
      .catch(err => { console.error(err) })
    this.handleEditClick()
  }

  handleEditClick() {
    this.setState({ isEditMode: !this.state.isEditMode })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { id, title, genre, mpaa_rating, poster_img } = this.props.movie
    return (
      <Fragment>
        <div className="movie-card">
          <h3>{title}</h3>
          <p>Genre: {genre}</p>
          <img src={poster_img} crossOrigin="anonymous" alt={id} />
          <p>MPAA Rating: {mpaa_rating}</p>
          {this.state.isEditMode ? (
            <div className="edit-form">
              <form onSubmit={this.editMovie}>
                <label>Title:</label>
                <input onChange={this.handleChange} name="title" />

                <label>Genre:</label>
                <input onChange={this.handleChange} name="genre" />

                <label>Rating:</label>
                <input onChange={this.handleChange} name="mpaa_rating" />

                <label>Image:</label>
                <input onChange={this.handleChange} name="poster_img" />

                <button type="submit">Edit Movie</button>
              </form>
            </div>
          ) :
            <div className="hover-btns">
              <button onClick={this.handleEditClick}>Edit</button>
              <button type="button" onClick={this.deleteMovie}>Delete</button>
            </div>
          }
          <Link to={`/${id}`} className="review-button">Reviews</Link>
        </div >

      </Fragment>
    )
  }
}