import { Button, Typography } from "@mui/material";
import "./YoutubeCard.css";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteYoutube, getUser } from "../../actions/user";

const YoutubeCard = ({
  url = "https://youtube.com/ghareebstar",
  title = "Title Here",
  isAdmin = false,
  image,
  id,
}) => {
  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    await dispatch(deleteYoutube(id));
    dispatch(getUser());
  };
  return (
    <div className="youtubeCard">
      <a href={url} target="blank">
        <img src={image} alt="Video" />
        <Typography>{title} </Typography>
      </a>
      {isAdmin && (
        <Button
          style={{
            display: "block",
            margin: "auto",
            fontSize: "30px",
            color: "rgba(40 , 40 , 40 ,0.7)",
          }}
          onClick={() => deleteHandler(id)}
        >
          <BsTrash />
        </Button>
      )}
    </div>
  );
};

export default YoutubeCard;
