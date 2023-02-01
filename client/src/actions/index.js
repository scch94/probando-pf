import axios from "axios";
import Api from "../Global";
// HOME
export const GET_ALL_BOOKS = "GET_ALL_BOOKS";
export const FILTER_BY_ALPHABET = "FILTER_BY_ALPHABET";
export const FILTER_BY_PRICE = "FILTER_BY_PRICE";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const FILTER_ALL = "FILTER_ALL";
// DETAILS
export const GET_BOOK_DETAIL = "GET_BOOK_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
// DASHBOARD
export const GET_ALL_BOOKS_DASHBOARD = "GET_ALL_BOOKS_DASHBOARD";
export const ADD_NEW_BOOK = "ADD_NEW_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const EMPTY_MESSAGE = "EMPTY_MESSAGE";
// DASHBOARD FILTERS
export const FILTER_BY_ALPHABET_DASH = "FILTER_BY_ALPHABET_DASH";
export const FILTER_BY_PRICE_DASH = "FILTER_BY_PRICE_DASH";
export const SEARCH_BY_NAME_DASH = "SEARCH_BY_NAME_DASH";
export const FILTER_ALL_DASH = "FILTER_ALL_DASH";
// OTHERS
export const GET_ALL_AUTHORS = "GET_ALL_AUTHORS";
export const SEARCH_BY_AUTHOR = "SEARCH_BY_AUTHOR";
export const ADD_SHOPPING_CART = "ADD_SHOPPING_CART";
export const REMOVE_SHOPPING_CART = "REMOVE_SHOPPING_CART";
export const ADD_REVIEW = "ADD_REVIEW";
export const PUT_TOKEN = "PUT_TOKEN";
export const DELETE_TOKEN = "DELETE_TOKEN";
export const REPORT_REVIEW = "REPORT_REVIEW";

const url = Api.Url;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HOME
// Obtener Libros HOME
export const getAllBooks = () => {
  return async function (dispatch) {
    try {
      fetch(url + "/book")
        .then((data) => data.json())
        .then((data) => dispatch({ type: GET_ALL_BOOKS, payload: data.book }));
    } catch {
      console.log("error");
    }
  };
};

// Filtrar por nombre
export const findBook = (name) => {
  return { type: SEARCH_BY_NAME, payload: name };
};

// Filtrar por alfabeto
export const filterByAlphabet = (typeAlphabet) => {
  return { type: FILTER_BY_ALPHABET, payload: typeAlphabet };
};

// Filtrar por precio
export const filterByPrice = (typePrice) => {
  return { type: FILTER_BY_PRICE, payload: typePrice };
};

// Filtros
export const filterAll = (category, editorial, author) => {
  return {
    type: FILTER_ALL,
    payload: {
      category,
      editorial,
      author,
    },
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DASHBOARD
// Obtener Libros DASHBOARD
export const getAllBooksDashboard = () => {
  return async function (dispatch) {
    try {
      fetch(url + "/book")
        .then((data) => data.json())
        .then((data) =>
          dispatch({ type: GET_ALL_BOOKS_DASHBOARD, payload: data.book })
        );
    } catch {
      console.log("error");
    }
  };
};

// Crear nuevo libro
export const addNewBook = (payload) => {
  return async function (dispatch) {
    try {
      const response = await fetch(url + "/book", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return dispatch({
        type: ADD_NEW_BOOK,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

// Editar Libro
export const editBook = (id, input) => async (dispatch) => {
  try {
    const response = await fetch(url + `/book/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    dispatch({ type: UPDATE_BOOK, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_BOOK, payload: error });
  }
};

// Vacíar mensaje
export const emptyMessage = () => {
  return { type: EMPTY_MESSAGE };
};

// Filtrar por nombre
export const findBookDash = (name) => {
  return { type: SEARCH_BY_NAME_DASH, payload: name };
};

// Filtrar por alfabeto
export const filterByAlphabetDash = (typeAlphabet) => {
  return { type: FILTER_BY_ALPHABET_DASH, payload: typeAlphabet };
};

// Filtrar por precio
export const filterByPriceDash = (typePrice) => {
  return { type: FILTER_BY_PRICE_DASH, payload: typePrice };
};

// Filtros
export const filterAllDash = (category, editorial, author, status) => {
  return {
    type: FILTER_ALL_DASH,
    payload: {
      category,
      editorial,
      author,
      status
    },
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BOOK DETAILS
// Obtener Detalle de Libros
export const getBookDetail = (id) => (dispatch) =>
  fetch(url + `/book/${id}`)
    .then((data) => data.json())
    .then((data) => dispatch({ type: GET_BOOK_DETAIL, payload: data }));

// Limpiar detalle de libros    
export const cleanDetail = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAN_DETAIL,
    });
  };
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// REVIEWS
// Añadir Review
export const addReview = (objeto) => (dispatch) => {
  fetch(url + "/resena", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(objeto),
  }).then((data) => dispatch({ type: ADD_REVIEW }));
};
//
// Agregar denuncia Review
export const reportReview = (id) => (dispatch) => {
  fetch(url + "/resena" + "/denuncias", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(id),
  }).then((data) => dispatch({ type: REPORT_REVIEW }));
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// OTHERS
// Obtener todos los autores
export const getAllAuthors = () => (dispatch) =>
  fetch(url + `/autores`)
    .then((data) => data.json())
    .then((data) => dispatch({ type: GET_ALL_AUTHORS, payload: data }));

export const putToken = (token) => {
  return { type: PUT_TOKEN, payload: token };
};

export const deletToken = () => {
  return { type: DELETE_TOKEN };
};
