import React, { Component } from 'react';
import axios from 'axios';

import MovieItem from './movieItem';

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    }
    this.getMovies = this.getMovies.bind(this);
    this.renderMovies = this.renderMovies.bind(this);
  }

  componentDidMount() {
    this.getMovies();

  }
  getMovies() {
    axios.get('https://moviebackendcapstone.herokuapp.com/movie/get')
      .then(response => {
        this.setState({
          movies: response.data
        })
        console.log(this.state.movies)
      }).catch(err => {
        console.error(err);
      });
  }

  renderMovies() {
    return this.state.movies.map(movie => {
      return (<MovieItem key={movie.id} movie={movie} getMovies={this.getMovies} />)
    })
  }

  render() {
    return (
      <div className="movies-container">
        <div className="movies-box">
          {this.renderMovies()}
        </div>
      </div >
    )
  }

}
