import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import books from "../../utils/books.js";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookDetail, cleanDetail } from "../../actions/index";
import "./Details.css";

function Details(props) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const details = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(cleanDetail());
    dispatch(getBookDetail(id));
  }, [dispatch, id]);

  return (
    <div key={id} className="Details">
      <Navbar />
      <div className="book-container">
        {details.image ? <img className="book-img" src={details.image} alt="imagen-libro" /> :
          <svg className="loading-svg" viewBox="25 25 50 50">
            <circle className="loading-circle" r="20" cy="50" cx="50"></circle>
          </svg>}
        {details ?
          <div className="book-info">
            <div className="book-info__info">
              {details.name && <h4>{details.name}</h4>}
            </div>
            <div className="book-info__info">
              {<h4>Author:</h4>}
              {<h4>{details.Autor?.nombre}</h4>}
            </div>
            <div className="book-info__info">
              {details.editorial && <h4>Editorial: </h4>}
              {details.editorial && <p>{details.editorial}</p>}
            </div>
            <div className="book-info__info">
              {details.genero && <h4>Genre: {details.genero}</h4>}
            </div>
            <div className="book-info__info">
              {details.price && <h4 className="book-info__price">${details.price}</h4>}
            </div>
            <div className="">
              <button className="book-btn__buy">Add To Cart <i className="fa-solid fa-cart-shopping"></i></button>
            </div>
          </div> :
          <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        }
      </div>
      <Footer />
    </div>
  );
}

export default Details;
