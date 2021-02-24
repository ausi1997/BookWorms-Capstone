import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, Route, NavLink } from 'react-router-dom';

const Store = ()=>{

    const [data,setData] = useState([]);

    const addToWishlist = (id)=>{
      axios.post("/wishList/add-to-wishlist" , {
        bookAds:id
      })
      .then(result=>{
        console.log(result.data);
      }).catch(err=>{
        alert(err);
      })
    }

    useEffect(()=>{
        axios.get("/bookads/allAds")
        .then(result=>{
            console.log(result.data);
            setData(result.data.book);
        }).catch(err=>{alert(err)})
    },[data]);
    if(data == null){
      return(
        <div><h2>My Ads</h2></div>
      )
    }
    else{
return(
                data &&
                data.map((item)=>{
                    return (
                        <div className="col-md-3 mb-5"><br></br>
                        <div className="card card-body bg-dark text-center h-100">
                        <img id='img' className="w-100 mb-2" src={item.BookImages} alt="Movie Cover" />
                        <h5 className="text-light card-title">
                          {item.Title}
                        </h5>
                        <h5 className="text-light card-title">
                          Rs {item.Price}
                        </h5>
                          
                        <NavLink className="btn btn-primary" to={{ pathname: "/addetails", title: {title : item.Title}}}>
                        Ad Details
                          <i className="fas fa-chevron-right" />
              </NavLink><br></br>
              <Link className="btn btn-primary" onClick={()=>addToWishlist(item._id)}>
              Add to Wishlist
              <i className="fas fa-chevron-right" />
            </Link>
                        </div>
                        </div>
                    )    
            })
                )}
            }
   

export default Store;
