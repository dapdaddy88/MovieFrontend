import React, { Component } from 'react';
import axios from 'axios';

export class AddMovie extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      genre: '',
      poster_img: '',
      mpaa_rating: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    // console.log(this.state.title, this.state.genre, this.state.mpaa_rating, this.state.poster_img);
  }

  // Add A Movie

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      title: `${this.state.title}`,
      genre: `${this.state.genre}`,
      poster_img: `${this.state.poster_img}`,
      mpaa_rating: `${this.state.mpaa_rating}`
    }

    axios.post('https://moviebackendcapstone.herokuapp.com/movie/add', data)
      .then(res => { console.log(res) })
      .catch(err => { console.error(err) })
  }
  render() {
    //'id','title','genre','mpaa_rating','poster_img','all_reviews'
    return (
      <div className="add-movie-container">
        <form onSubmit={this.handleSubmit}>
          <label>Title:</label>
          <input onChange={this.handleChange} name="title" />

          <label>Genre:</label>
          <input onChange={this.handleChange} name="genre" />

          <label>Rating:</label>
          <input onChange={this.handleChange} name="mpaa_rating" />

          <label>Image:</label>
          <input onChange={this.handleChange} name="poster_img" />

          <button type="submit">Add Movie</button>
        </form>
      </div>
    )
  }
}

export default AddMovie