import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Movie from "./Addetails";

export class AdCard extends Component {
  render() {
    const { movie } = this.props;
    return (
      <div className="col-md-3 mb-5">
        <br></br>
        <div className="card card-body bg-dark text-center h-100">
          <img
            className="w-100 mb-2"
            src="https://st2.depositphotos.com/4185411/8501/i/600/depositphotos_85015512-stock-photo-still-life-with-a-pile.jpg"
            alt="Movie Cover"
          />
          <h5 className="text-light card-title">Ad title</h5>
          <h5 className="text-light card-title">Ad Description</h5>
          <Link className="btn btn-primary" to="/addetails">
            Ad Details
            <i className="fas fa-chevron-right" />
          </Link>
        </div>
        <div className="card card-body bg-dark text-center h-100">
          <img
            className="w-100 mb-2"
            src="https://st2.depositphotos.com/4185411/8501/i/600/depositphotos_85015512-stock-photo-still-life-with-a-pile.jpg"
            alt="Movie Cover"
          />
          <h5 className="text-light card-title">Ad title</h5>
          <h5 className="text-light card-title">Ad Description</h5>
          <Link className="btn btn-primary" to="/addetails">
            Ad Details
            <i className="fas fa-chevron-right" />
          </Link>
        </div>
      </div>
    );
  }
}

export default AdCard;
