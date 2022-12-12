import { KeyboardBackspace } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProject, deleteProject, getUser } from "../../actions/user";
import { ProjectCard } from "../Projects/Projects";

const Project = () => {
  const { message, error, loading } = useSelector((state) => state.update);
  const { message: loginMessage } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [techStack, setTechStack] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addProject(title, url, image, description, techStack));
    dispatch(getUser());
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
    if (loginMessage) {
      alert.success(loginMessage);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [alert, error, message, dispatch, loginMessage]);
  return (
    <div className="adminPanel">
      <div className="adminPanelContainer">
        <Typography variant="h4">
          <p>A</p>
          <p>D</p>
          <p>M</p>
          <p>I</p>
          <p style={{ marginRight: "1vmax" }}>N</p>
          <p>P</p>
          <p>A</p>
          <p>N</p>
          <p>E</p>
          <p>L</p>
        </Typography>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="text"
            value={url}
            placeholder="Link"
            onChange={(e) => setUrl(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="text"
            value={techStack}
            placeholder="Technologies"
            onChange={(e) => setTechStack(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="file"
            onChange={handleImage}
            className="adminPanelFileUpload"
            accept="image/*"
          />

          <Link to="/account">
            Back <KeyboardBackspace />
          </Link>

          <Button type="submit" variant="contained" disabled={loading}>
            Add
          </Button>
          <div className="adminPanelProjectVideos">
            {user &&
              user.projects &&
              user.projects.map((item) => (
                <ProjectCard
                  key={item._id}
                  id={item._id}
                  url={item.url}
                  projectTitle={item.title}
                  description={item.description}
                  technologies={item.techStack}
                  projectImage={item.image.url}
                  isAdmin={true}
                />
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Project;
