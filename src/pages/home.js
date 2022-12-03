import React, { Component } from 'react';
import { BsPlusLg, BsXLg } from 'react-icons/bs';

import Movies from '../components/movies';
import AddMovie from '../components/addMovie';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      addMovieModal: false
    };

    this.toggleAddMovieModal = this.toggleAddMovieModal.bind(this);
  }

  toggleAddMovieModal() {
    this.setState({
      addMovieModal: !this.state.addMovieModal
    });
  }

  componentDidUpdate() {
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <Movies />
        <div className="add-movie-btn">
          {this.state.addMovieModal ? (
            <BsXLg onClick={this.toggleAddMovieModal} />
          ) : (
            <BsPlusLg onClick={this.toggleAddMovieModal} />
          )}

        </div>
        {this.state.addMovieModal && <AddMovie />}
      </div>
    )
  }
}
