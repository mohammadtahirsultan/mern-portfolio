import { Timeline, YouTube } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineProject } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { logout, updateUser } from "../../actions/user";
import "./AdminPanel.css";
import { useSelector } from "react-redux";
const AdminPanel = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { message: loginMessage } = useSelector((state) => state.login);
  const { message, error, loading } = useSelector((state) => state.update);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState({});
  const [about, setAbout] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(email, password, name, skills, about));
  };
  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleAboutImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAbout({ ...about, avatar: Reader.result });
      }
    };
  };

  const handleImages = (e, val) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        if (val === 1) {
          setSkills({ ...skills, image1: Reader.result });
        }
        if (val === 2) {
          setSkills({ ...skills, image2: Reader.result });
        }
        if (val === 3) {
          setSkills({ ...skills, image3: Reader.result });
        }
        if (val === 4) {
          setSkills({ ...skills, image4: Reader.result });
        }
        if (val === 5) {
          setSkills({ ...skills, image5: Reader.result });
        }
        if (val === 6) {
          setSkills({ ...skills, image6: Reader.result });
        }
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
          <p style={{ marginRight: "1vmax" }} >N</p>
          <p>P</p>
          <p>A</p>
          <p>N</p>
          <p>E</p>
          <p>L</p>
        </Typography>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="adminPanelInputs"
          />

          <div className="adminPanelSkill">
            <div>
              <Typography>Skill 1</Typography>
              <input
                type="file"
                onChange={(e) => handleImages(e, 1)}
                className="adminPanelFileUpload"
                accept="image/*"
              />
            </div>
            <div>
              <Typography>Skill 2</Typography>
              <input
                type="file"
                onChange={(e) => handleImages(e, 2)}
                className="adminPanelFileUpload"
                accept="image/*"
              />
            </div>
            <div>
              <Typography>Skill 3</Typography>
              <input
                type="file"
                onChange={(e) => handleImages(e, 3)}
                className="adminPanelFileUpload"
                accept="image/*"
              />
            </div>
            <div>
              <Typography>Skill 4</Typography>
              <input
                type="file"
                onChange={(e) => handleImages(e, 4)}
                className="adminPanelFileUpload"
                accept="image/*"
              />
            </div>
            <div>
              <Typography>Skill 5</Typography>
              <input
                type="file"
                onChange={(e) => handleImages(e, 5)}
                className="adminPanelFileUpload"
                accept="image/*"
              />
            </div>
            <div>
              <Typography>Skill 6</Typography>
              <input
                type="file"
                onChange={(e) => handleImages(e, 6)}
                className="adminPanelFileUpload"
                accept="image/*"
              />
            </div>
          </div>
          <div className="adminPanelAbout">
            <fieldset>
              <legend>About</legend>
              <input
                type="text"
                value={about.name}
                placeholder="Name"
                onChange={(e) => setAbout({ ...about, name: e.target.value })}
                className="adminPanelInputs"
              />
              <input
                type="text"
                value={about.title}
                placeholder="Title"
                onChange={(e) => setAbout({ ...about, title: e.target.value })}
                className="adminPanelInputs"
              />
              <input
                type="text"
                value={about.subtitle}
                placeholder="Subtitle"
                onChange={(e) =>
                  setAbout({ ...about, subtitle: e.target.value })
                }
                className="adminPanelInputs"
              />
              <input
                type="text"
                value={about.description}
                placeholder="Description"
                onChange={(e) =>
                  setAbout({ ...about, description: e.target.value })
                }
                className="adminPanelInputs"
              />
              <input
                type="text"
                value={about.quote}
                placeholder="Quote"
                onChange={(e) => setAbout({ ...about, quote: e.target.value })}
                className="adminPanelInputs"
              />
              <input
                type="file"
                placeholder="Choose Avaar"
                onChange={handleAboutImage}
                className="adminPanelFileUpload"
                accept="image/*"
              />
            </fieldset>
          </div>
          <Link to="/admin/timeline">
            TimeLine <Timeline />
          </Link>
          <Link to="/admin/youtube">
            Youtube <YouTube />
          </Link>
          <Link to="/admin/project">
            Projects <AiOutlineProject />
          </Link>
          <Button type="submit" variant="contained" disabled={loading}>
            Update
          </Button>
        </form>

        <Button
          variant="contained"
          color="error"
          style={{ display: "block", width : "35%", padding : "10px" ,  margin: "4vmax auto" }}
          onClick={logoutHandler}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminPanel;
