import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

import Swal from "sweetalert2";
import Api from "../../Global";
import "./Register.css";

export const RegisterDos = () => {
  let [input, setInput] = useState({ name: "", email: "", password: "" });
  let [error, setError] = useState({ name: "", email: "", password: "" });
  let [home, setHome] = useState(false);
  function handleChange(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    let objError = validate({ ...input, [e.target.name]: e.target.value });
    setError(objError);
  }
  function crearUsuario(e) {
    e.preventDefault();
    let datos = {
      nombre: input.name,
      email: input.email,
      password: input.password,
    };
    let url = Api.Url + "/auth/signup";
    let status;
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(datos),
    })
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((respuesta) => {
        console.log(respuesta, status);
        if (status === 200) {
          setHome(true);
          Swal.fire({
            icon: "success",
            title: "Usuario Registrado",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Nombre o Email existentes",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }
      })
      .catch((error) => console.error(error));
  }
  if (home == true) {
    return <Redirect to="/Login" />;
  }
  function validate(input) {
    let error = {};
    //name
    if (!input.name) {
      error.name = "nombre de usuario es requerido";
    } else if (!/^[\s\S]{3,100}$/.test(input.name)) {
      error.name = "NOMBRE debe tener mas de 3 letras";
    }
    //correo

    if (!input.email) {
      error.email = "email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      error.email = "formato de email no valido";
    }

    //password
    if (!input.password) {
      error.password = "password es requerido";
    } else if (input.password.length < 6) {
      error.password = "Debe tener mas de 6 caracteres";
    } else if (/[^A-Za-z0-9 ]+/g.test(input.password)) {
      error.password = "No debe contener caracteres especiales";
    }
    return error;
  }
  return (
    <>
      <form className="Register">
        <div className="Register-content">
          <div className="Login-home-container">
            <Link to="/home">
              <button className="Login-home__btn">
                <AiFillHome />
                <span>Inicio</span>
              </button>
            </Link>
          </div>
          <h1>Registro</h1>
          <div className="Register-form">
            <div
              className={
                error.name ? "danger Register-input" : "Register-input"
              }
            >
              {error.name ? (
                <label htmlFor="name">*Nombre:</label>
              ) : (
                <label htmlFor="name">Nombre:</label>
              )}

              <input
                type="text"
                placeholder="Nombre"
                name="name"
                value={input.name}
                className="Login-Register__input"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div
              className={
                error.email ? "danger Register-input" : "Register-input"
              }
            >
              {error.email ? (
                <label htmlFor="name">*E-Mail:</label>
              ) : (
                <label htmlFor="name">E-Mail:</label>
              )}
              <input
                type="email"
                placeholder="E-Mail"
                name="email"
                value={input.email}
                className="Login-Register__input"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div
              className={
                error.password ? "danger Register-input" : "Register-input"
              }
            >
              {error.password ? (
                <label htmlFor="name">*Contraseña:</label>
              ) : (
                <label htmlFor="name">Contraseña:</label>
              )}
              <input
                type="password"
                placeholder="Contraseña"
                name="password"
                value={input.password}
                className="Login-Register__input"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              {!Object.keys(error).length > 0 ? (
                <>
                  <button
                    className="Register-create__btn"
                    onClick={(e) => crearUsuario(e)}
                  >
                    <Link to="/home"></Link>Crear Usuario
                  </button>
                </>
              ) : (
                <p className="errores">
                  los espacios con * tienen errores por corregir
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
