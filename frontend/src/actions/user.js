import axios from "axios";

// Show User Data When App is Loaded
export const getUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "GET_USER_REQUEST",
    });

    const { data } = await axios.get("/api/v1/user");

    dispatch({
      type: "GET_USER_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "GET_USER_FAILURE",
      payload: error.response.data.message,
    });
  }
};

// Admin/User Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGIN_REQUEST",
    });

    const { data } = await axios.post(
      "/api/v1/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.response.data.message,
    });
  }
};

// Admin/User Logout
export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOGOUT_REQUEST",
    });

    const { data } = await axios.get("/api/v1/logout");

    dispatch({
      type: "LOGOUT_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LOGOUT_FAILURE",
      payload: error.response.data.message,
    });
  }
};

// Load Data of Admin
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_USER_REQUEST",
    });

    const { data } = await axios.get("/api/v1/me");

    dispatch({
      type: "LOAD_USER_SUCCESS",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LOAD_USER_FAILURE",
      payload: error.response.data.message,
    });
  }
};

// Update User Admin Level
export const updateUser =
  (email, password, name, skills, about) => async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_USER_REQUEST",
      });

      const { data } = await axios.put(
        "/api/v1/admin/update",
        {
          email,
          password,
          name,
          skills,
          about,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "UPDATE_USER_SUCCESS",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_USER_FAILURE",
        payload: error.response.data.message,
      });
    }
  };

// Add TimeLine Admin Level
export const addTimeline = (title, description, date) => async (dispatch) => {
  try {
    dispatch({
      type: "ADD_TIMELINE_REQUEST",
    });

    const { data } = await axios.post(
      "/api/v1/admin/timeline/add",
      {
        title,
        description,
        date,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "ADD_TIMELINE_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ADD_TIMELINE_FAILURE",
      payload: error.response.data.message,
    });
  }
};
// Delete TimeLine Admin Level
export const deleteTimeline = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DELETE_TIMELINE_REQUEST",
    });

    const { data } = await axios.delete(`/api/v1/admin/timeline/${id}`);

    dispatch({
      type: "DELETE_TIMELINE_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_TIMELINE_FAILURE",
      payload: error.response.data.message,
    });
  }
};

// Add Youtube Admin Level
export const addYoutube = (title, url, image) => async (dispatch) => {
  try {
    dispatch({
      type: "ADD_YOUTUBE_REQUEST",
    });

    const { data } = await axios.post(
      "/api/v1/admin/youtube/add",
      {
        title,
        url,
        image,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "ADD_YOUTUBE_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ADD_YOUTUBE_FAILURE",
      payload: error.response.data.message,
    });
  }
};

// Delete YOUTUBE Admin Level
export const deleteYoutube = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DELETE_YOUTUBE_REQUEST",
    });

    const { data } = await axios.delete(`/api/v1/admin/youtube/${id}`);

    dispatch({
      type: "DELETE_YOUTUBE_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_YOUTUBE_FAILURE",
      payload: error.response.data.message,
    });
  }
};

// Add Project Admin Level
export const addProject =
  (title, url, image, description, techStack) => async (dispatch) => {
    try {
      dispatch({
        type: "ADD_PROJECT_REQUEST",
      });

      const { data } = await axios.post(
        "/api/v1/admin/project/add",
        {
          title,
          url,
          image,
          description,
          techStack,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "ADD_PROJECT_SUCCESS",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "ADD_PROJECT_FAILURE",
        payload: error.response.data.message,
      });
    }
  };

// Contact Us User Level
export const contactUs = (name, email, message) => async (dispatch) => {
  try {
    dispatch({
      type: "CONTACT_US_REQUEST",
    });

    const { data } = await axios.post(
      "/api/v1/contact",
      {
        name,
        email,
        message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "CONTACT_US_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CONTACT_US_FAILURE",
      payload: error.response.data.message,
    });
  }
};

// Delete PROJECT Admin Level
export const deleteProject = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DELETE_PROJECT_REQUEST",
    });

    const { data } = await axios.delete(`/api/v1/admin/project/${id}`);

    dispatch({
      type: "DELETE_PROJECT_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_PROJECT_FAILURE",
      payload: error.response.data.message,
    });
  }
};
