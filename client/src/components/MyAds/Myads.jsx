import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, Route, NavLink } from 'react-router-dom';
import './Myads.css';

const MyAds = ()=>{

    const [data,setData] = useState([]);

    const deleteAds = (id)=>{
      axios.delete(`/bookads/deleteAds/${id}`)
      .then(result=>{
        console.log(result)
        const newdata = result.data.book
        setData(newdata)
      })
     }

    useEffect(()=>{
        axios.get("/bookads/myAds")
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
                         
              <Link className="btn btn-primary"  onClick={()=>deleteAds(item._id)}>
              Delete Ad
              <i className="fas fa-chevron-right" />
            </Link>
                        </div>
                        </div>
                    )    
            })
                )}
            }
   

export default MyAds;
