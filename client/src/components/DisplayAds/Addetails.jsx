import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import axios from "axios";
// import { fetchMovie, setLoading } from '../../actions/searchActions';

// import Spinner from '../layout/Spinner';
class Movie extends Component {
  
  constructor(props){
    super(props);
    this.state = {Title: "", Category:"", BookImages:"", Author:"", Description:"", PostedBy:"", Price:"", Condition: "", Contact:"", Location:""};
  }

  componentDidMount() {
     axios.get("/bookads/books/" + this.props.location.title.title)
     .then((res) => {
       console.log(res.data.book.PostedBy);
       axios.get("/user/details/" + res.data.book.PostedBy)
       .then((pos) => {
         console.log(pos)
        this.setState({
          Title: res.data.book.Title,
          Category: res.data.book.Category,
          BookImages: res.data.book.BookImages,
          Description: res.data.book.Description,
          Price: res.data.book.Price,
          Condition: res.data.book.Condition,
          Location:res.data.book.Location,
          Author: res.data.book.Author,
          PostedBy: pos.data.username,
          Contact: pos.data.contactNumber
        });
       })

      
     })
  }


  render() {
    // const { loading, movie } = this.props;
    console.log(this.state.Title);
    let movieInfo = (
      <>
      <div class="breacrumb-section">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="breadcrumb-text">
                    <a href="#"><i class="fa fa-home"></i> Home</a>
                    <span>Book Details</span>
                </div>
            </div>
        </div>
    </div>
</div>
      <div className="container"><br></br>
        <div className="row">
          <div className="col-md-4 card card-body">
            <img src={this.state.BookImages ? this.state.BookImages : "https://st2.depositphotos.com/4185411/8501/i/600/depositphotos_85015512-stock-photo-still-life-with-a-pile.jpg"} className="thumbnail" alt="Poster" />
          </div>
          <div className="col-md-8">
            <h2 className="mb-4">{this.state.Title}</h2>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Ad description:</strong> {this.state.Description}
              </li>
              <li className="list-group-item">
                <strong>Author Name:</strong> {this.state.Author}
              </li>
              <li className="list-group-item">
                <strong>Category:</strong>{this.state.Category}
              </li>
              <li className="list-group-item">
                <strong>Price:</strong> &#8377; {this.state.Price}
              </li>
              <li className="list-group-item">
                <strong>Condition:</strong> {this.state.Condition}
              </li>
              <li className="list-group-item">
                <strong>Location:</strong> {this.state.Location}
              </li><li className="list-group-item">
              <button className="btn btn-success" style={{width:"100px"}}><WhatsAppIcon />{this.state.Contact}</button>&nbsp; &nbsp;
              <span>posted by:{this.state.PostedBy}</span></li>
        </ul>
        
             
          </div>
          
          
        </div><br></br><br></br>
        {/* <div className="row">
          <div className="card card-body bg-dark my-5 text-light">
            <div className="col-md-12">
              <h3>About </h3>
              book is very muc used in exams and authors also.
              <hr />
              
              <Link to="/" className="btn btn-default text-light">
                Go Back To Search
              </Link>
            </div>
          </div>
        </div> */}
      </div>
        </>
    );
return movieInfo;
    // let content = loading ? <Spinner /> : movieInfo;
    // return <div>return homepage</div>;
  }
}

export default Movie;
// const mapStateToProps = state => ({
//   loading: state.movies.loading,
//   movie: state.movies.movie
// });

// export default connect(
//   mapStateToProps,
//   { fetchMovie, setLoading }
// )(Movie);
