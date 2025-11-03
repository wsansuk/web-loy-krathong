import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../src/LoyKrathong.css";
import { useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Box } from "@mui/material/index";
import HouseIcon from "@mui/icons-material/House";
// import bgVideo from "../assets/videos/Picture_1.gif";
import bg2025 from "../assets/images/BG_2025.jpg";

import { useNavigate } from "react-router-dom";
import krathong1 from "../assets/images/2025/Krathong01.png";
import krathong2 from "../assets/images/2025/Krathong02.png";
import krathong3 from "../assets/images/2025/Krathong03.png";
import krathong4 from "../assets/images/2025/Krathong04.png";
import krathong5 from "../assets/images/2025/Krathong05.png";
import krathong6 from "../assets/images/2025/Krathong06.png";
import krathong7 from "../assets/images/2025/Krathong07.png";
import krathong8 from "../assets/images/2025/Krathong08.png";
import krathong9 from "../assets/images/2025/Krathong09.png";
import krathong10 from "../assets/images/2025/Krathong10.png";

const LoyKrathong = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dataKrathong, setDataKrathong] = useState([]);
  const [firstKrathong, setFirstKrathong] = useState([]);
  const { addToast } = useToasts();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/krathong`);
      if (response.data?.data.length) {
        setDataKrathong(response?.data?.data);
      } else {
        addToast("Something error, please try to refresh the page", {
          appearance: "error",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(getData, 60000);
    return () => clearInterval(intervalId);
  }, [dataKrathong]);

  // Function to create the keyframes dynamically
  const createAnimation = (index) => {
    const x25 = Math.floor(Math.random() * 10 - 5);
    const x33 = Math.floor(Math.random() * 10 - 5);
    const x66 = Math.floor(Math.random() * 10 - 5);
    const x75 = Math.floor(Math.random() * 10 - 5);

    const styleSheet = document.styleSheets[0];
    const animationName = `moveUp-${index}`;
    const randomX = Math.floor(Math.random() * 30 - 10); // ตำแหน่ง x ที่สุ่มขณะเคลื่อนที่
    const randomStartY = Math.floor(Math.random() * 20 + 70); // ตำแหน่งเริ่มสุ่มระหว่าง 70vh ถึง 90vh
    // Insert keyframes with random X translations

    styleSheet.insertRule(
      ` @keyframes ${animationName} {
     0% { transform: translateY(120vh); } // เริ่มจากนอกจอด้านล่าง
      25% { transform: translateY(80vh) translateX(${randomX}vw) scale(0.9) }
      50% { transform: translateY(50vh) translateX(${randomX}vw)scale(0.8) }
      100% { transform: translateY(-50%) translateX(0vw)  scale(0.6) }
     
      }
    `,
      styleSheet.cssRules.length
    );

    return animationName;
  };

  useEffect(() => {
    dataKrathong.forEach((_, index) => createAnimation(index));
  }, [dataKrathong]);

  return (
    <div className="loy-krathong">
      {/* <video className="background-video" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      <img className="background-video" src={bg2025} alt="background" />

      <div className="main">
        {dataKrathong.map((item, index) => {
          let imgSrc;

          switch (item?.krathong_type) {
            case 1:
              imgSrc = krathong1;
              break;
            case 2:
              imgSrc = krathong2;
              break;
            case 3:
              imgSrc = krathong3;
              break;
            case 4:
              imgSrc = krathong4;
              break;
            case 5:
              imgSrc = krathong5;
              break;
            case 6:
              imgSrc = krathong6;
              break;
            case 7:
              imgSrc = krathong7;
              break;
            case 8:
              imgSrc = krathong8;
              break;
            case 9:
              imgSrc = krathong9;
              break;
            case 10:
              imgSrc = krathong10;
              break;
            default:
              imgSrc = krathong1;
              break;
          }
          let spaceIndex = item.emp_name.indexOf(" ");

          return (
            <div
              key={index}
              className="krathong-container"
              style={{
                animation: `${createAnimation(index)} 60s ${
                  Math.random() * 2 + index * 1.5
                }s linear infinite both`,
                left: `${Math.random() * 80}vw`,
                animationDelay: `${index * 2}s`,
              }}
            >
              <div className="krathong-text">
                <Box
                  sx={{
                    display: "flex-row",
                    alignItems: "flex-end",
                    width: "150px",
                    padding: "0 10px",
                  }}
                >
                  <div sx={{ width: "150px" }}>
                    {item.emp_wish.toString().length > 60
                      ? item.emp_wish.toString().substring(0, 60) + "..."
                      : item.emp_wish}
                  </div>
                  <div>
                    {spaceIndex !== -1
                      ? item.emp_name.substring(0, spaceIndex) +
                        " - " +
                        item.emp_department
                      : item.emp_name.substring(0, 20) +
                        " - " +
                        item.emp_department}
                  </div>
                </Box>
              </div>

              <img
                src={imgSrc}
                alt={"Krathong"}
                className="krathong-image float-on-water"
              />
            </div>
          );
        })}
      </div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end", 
          position: "fixed",
          bottom: 10, 
          right: 10, 
          zIndex: 1000, 
          color: "rgba(255, 255, 255, 0.3)",
        }}
      >
        <HouseIcon
          onClick={() => navigate("/")}
          sx={{
            color: "rgba(255, 255, 255, 0.3)",
            mr: 1,
            cursor: "pointer",
          }}
        />
        Powered with ❤️ by FTA team
      </Box>
    </div>
  );
};

export default LoyKrathong;
