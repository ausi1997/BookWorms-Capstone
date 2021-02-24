import axios from 'axios';
import React, {useEffect, useState } from 'react';
import { Link, Route, NavLink } from 'react-router-dom';
import "./index.css";

const Wishlist = ()=>{

    const [data,setData] = useState([]);

    useEffect(()=>{
        var bookData = [];
        axios.get("/wishList/view")
        .then(result=>{
            var bookIds = result.data.Wishlist[0].wishlistItem.map(b => {
               return b.bookAds
             });
             bookIds.forEach(b => {
                axios.get("/bookads/view/" + b)
                .then(result => {
                   setData(o => [...o, result.data.book]);
                })
                
             })
          //  localStorage.getItem("wishList");
        }).catch(err=>{})
},[]);
if(data == null){
  return(
    <div><h2>My WishList</h2></div>
  )
}
else{
        return (
                 data && 
                data.map((item)=>{
                    return (
                        <div className="col-md-3 mb-5"><br></br>
                        <div className="card card-body bg-dark text-center h-100">
                        <img id="img" className="w-100 mb-2" src={item.BookImages} alt="Movie Cover" />
                        <h5 className="text-light card-title">
                          {item.Title}
                        </h5>
                        <h5 className="text-light card-title">
                          Rs {item.Price}
                        </h5>
                        <NavLink className="btn btn-primary" to={{ pathname: "/addetails", title: {title : item.Title}}}>
                        Ad Details
                          <i className="fas fa-chevron-right" />
              </NavLink>
              
                        </div>
                        </div>
                    )    
                    
                    
                })
          )
    }
}; 

export default Wishlist;
