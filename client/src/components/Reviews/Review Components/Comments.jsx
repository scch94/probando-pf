import React from "react";
import Comment from "./Comment";
import { useSelector, useDispatch } from "react-redux";
import { cleanReview } from "../../../actions";
import "./Comments.css";


function Comments({ commentsReview }) {
  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  React.useEffect(() => {
    return () => {
      dispatch(cleanReview());
    };
  }, [dispatch]);

  return (
    <div className="comments">
      {reviews.success ? <h3>{reviews.success}</h3> : null}
      {commentsReview?.length ? (
        <h2>Comentarios:</h2>
      ) : (
        <h2>No hay Comentarios</h2>
      )}
      {!!commentsReview &&
        commentsReview.map((elem) => (
          <div className="Comments-flex" key={elem.id}>
            <Comment
              key={elem.id}
              id={elem.id}
              calificacion={elem.calificacion}
              titulo={elem.titulo}
              descripcion={elem.descripcion}
            />
          </div>
        ))}
      {commentsReview?.length === 0 ? (
        <h2 className="No-comments">Sé el primero</h2>
      ) : null}
      {reviews.msj && <h3>{reviews.msj}</h3>}
    </div>
  );
}

export default Comments;
