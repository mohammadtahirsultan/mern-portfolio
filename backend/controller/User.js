import { User } from "../model/User.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../middlewares/sendMail.js";
import cloudinary from "cloudinary";
//   Admin Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 60000000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged In Successfullly",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//   Admin Logout
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out Successfullly",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne().select("-password -email");
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin Profile
export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//  Contact Form
export const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const userMessage = `Hey,I am ${name}.My Email is ${email}.My Message is : ${message}.`;
    await sendMail(userMessage);
    return res.status(200).json({
      success: true,
      message: "Message Sent Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//  Update Admin Level Data Like Skills and About Section
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email, password, skills, about } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }

    if (skills) {
      if (skills.image1) {
        // await cloudinary.v2.uploader.destroy(user.skills.image1.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image1, {
          folder: "tsportfolio",
        });
        user.skills.image1 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (skills) {
        // await cloudinary.v2.uploader.destroy(user.skills.image2.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image2, {
          folder: "tsportfolio",
        });
        user.skills.image2 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (skills.image3) {
        // await cloudinary.v2.uploader.destroy(user.skills.image3.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image3, {
          folder: "tsportfolio",
        });
        user.skills.image3 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (skills.image4) { 
        // await cloudinary.v2.uploader.destroy(user.skills.image4.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image4, {
          folder: "tsportfolio",
        });
        user.skills.image4 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (skills.image5) {
        // await cloudinary.v2.uploader.destroy(user.skills.image5.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image5, {
          folder: "tsportfolio",
        });
        user.skills.image5 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (skills.image6) {
        // await cloudinary.v2.uploader.destroy(user.skills.image6.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image6, {
          folder: "tsportfolio",
        });
        user.skills.image6 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }

    if (about) {
      if (about.name) {
        user.about.name = about.name;
      }
      if (about.title) {
        user.about.title = about.title;
      }
      if (about.subtitle) {
        user.about.subtitle = about.subtitle;
      }

      if (about.description) {
        user.about.description = about.description;
      }
      if (about.quote) {
        user.about.quote = about.quote;
      }

      if (about.avatar) {
        // await cloudinary.v2.uploader.destroy(user.about.avatar.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(about.avatar, {
          folder: "tsportfolio",
        });

        user.about.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//  Add Data to Timeline
export const addTimeline = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const user = await User.findById(req.user._id);

    user.timeline.unshift({
      title,
      description,
      date,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added to Timeline",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//  Add Youtube Videos
export const addYoutube = async (req, res) => {
  try {
    const { title, image, url } = req.body;

    const user = await User.findById(req.user._id);
    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "tsportfolio",
    });
    user.youtube.unshift({
      title,
      url,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added to Youtube Videos",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//  Add Projects
export const addProject = async (req, res) => {
  try {
    const { title, image, url, description, techStack } = req.body;

    const user = await User.findById(req.user._id);
    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "tsportfolio",
    });

    user.projects.unshift({
      title,
      url,
      description,
      techStack,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added to Projects",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//  Delete Date from Timeline
export const deleteTimeline = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    user.timeline = user.timeline.filter((item) => item._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deleted From Timeline",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//  Delete Data from Youtube Videos
export const deleteYoutube = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    const video = user.youtube.find((video) => video._id == id);

    await cloudinary.v2.uploader.destroy(video.image.public_id);

    user.youtube = user.youtube.filter((video) => video._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deleted From Youtube Videos",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//  Delete Projects
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    const project = user.projects.find((item) => item._id == id);

    await cloudinary.v2.uploader.destroy(project.image.public_id);

    user.projects = user.projects.filter((item) => item._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Project Deleted Successfullly ",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
