import React, { useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import * as THREE from "three";
import moonImage from "../../Images/moon.jpg";
import venusImage from "../../Images/venus.jpg";
import spaceImage from "../../Images/space.jpg";
import { Typography } from "@mui/material";
import {
  SiReact,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiExpress,
  SiCss3,
  SiHtml5,
  SiThreedotjs,
} from "react-icons/si";
import TimeLine from "../TimeLine/TimeLine";
import YoutubeCard from "../YoutubeCard/YoutubeCard";
import { BsMouse } from "react-icons/bs";

const Home = ({ timelines, youtubes, skills }) => {
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    const moonTexture = textureLoader.load(moonImage);
    const venusTexture = textureLoader.load(venusImage);
    const spaceTexture = textureLoader.load(spaceImage);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(4, 4, 8);

    const canvas = document.querySelector(".homeCanvas");
    const renderer = new THREE.WebGLRenderer({ canvas });

    const moonGeometry = new THREE.SphereGeometry(2, 64, 64);
    const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);

    const venusGeometry = new THREE.SphereGeometry(3, 64, 64);
    const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
    const venus = new THREE.Mesh(venusGeometry, venusMaterial);
    venus.position.set(8, 5, 5);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    const pointLight2 = new THREE.PointLight(0xffffff, 0.1);

    pointLight.position.set(8, 5, 5);
    pointLight2.position.set(-8, -5, -5);

    scene.add(moon);
    scene.add(venus);
    scene.add(pointLight);
    scene.add(pointLight2);
    scene.background = spaceTexture;

    const constSpeed = 0.01;
    window.addEventListener("mousemove", (e) => {
      if (e.clientX <= window.innerWidth / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y += constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y += constSpeed;
      }
      if (e.clientX > window.innerWidth / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y -= constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y -= constSpeed;
      }
      if (e.clientY > window.innerHeight / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y += constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y += constSpeed;
      }
      if (e.clientY <= window.innerHeight / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y -= constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y -= constSpeed;
      }
    });
    const animate = () => {
      requestAnimationFrame(animate);
      moon.rotation.y += 0.001;
      venus.rotation.y += 0.001;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };
    animate();

    return window.addEventListener("scroll", () => {
      camera.rotation.z = window.scrollY * 0.001;
      camera.rotation.y = window.scrollY * 0.003;

      const skillsBox = document.getElementById("homeskillsBox");

      if (window.scrollY > 1400) {
        skillsBox.style.animationName = "homeskillsBoxAnimationOn";
      } else {
        skillsBox.style.animationName = "homeskillsBoxAnimationOff";
      }
    });
  }, []);

  return (
    <div className="home">
      <canvas className="homeCanvas"></canvas>

      <div className="homeCanvasContainer">
        <Typography variant="h1">
          <p>M</p>
          <p>T</p>
          <p>A</p>
          <p>H</p>
          <p>I</p>
          <p>R</p>
        </Typography>

        <div className="homeCanvasBox">
          <Typography variant="h2">Freelancer</Typography>
          <Typography variant="h2">Developer</Typography>
          <Typography variant="h2">Web Designer</Typography>
        </div>

        <Link to="/projects">View Work</Link>
      </div>

      <div className="homeScrollBtn">
        <BsMouse />
      </div>

      <div className="homeContainer">
        <Typography variant="h3">TIMELINE</Typography>
        <TimeLine timelines={timelines} />
      </div>
      <div className="homeSkills">
        <Typography variant="h3">SKILLS</Typography>
        <div className="homeCubeSkills">
          <div className="homeCubeSkillsFaces homeCubeSkillsFace1">
            <img
              src={skills.image1.url}

              alt="Face1"
            />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace2">
            <img
              src={skills.image2.url}
              alt="Face2"
            />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace3">
            <img
              src={skills.image3.url}
              alt="Face3"
            />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace4">
            <img
              src={skills.image4.url}
              alt="Face4"
            />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace5">
            <img
              src={skills.image5.url}
              alt="Face5"
            />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace6">
            <img
              src={skills.image6.url}
              alt="Face6"
            />
          </div>
        </div>

        <div className="cubeShadow"></div>

        <div className="homeskillsBox" id="homeskillsBox">
          
          <SiHtml5 />
          <SiCss3 />
          <SiJavascript />
          <SiMongodb />
          <SiExpress />
          <SiReact />
          <SiNodedotjs />
          <SiThreedotjs />
        </div>
      </div>

      <div className="homeYoutube">
        <Typography variant="h3">Youtube Videos</Typography>
        <div className="homeYoutubeWrapper">
          {youtubes.map((item) => (
          <YoutubeCard
          url={item.url}
          title={item.title}
          image={item.image.url}
          id={item._id}
          key={item._id}
          />
           ))} 
        </div>
      </div>
    </div>
  );
};

export default Home;
