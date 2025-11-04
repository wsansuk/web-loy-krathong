import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Pagination,
  TextField,
  MenuItem,
} from "@mui/material/index";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import bg from "../assets/images/BG_2025.jpg";
import bgCard from "../assets/images/Varanasi_India.mp4";
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
// import videoBg from "../assets/videos/6478764_Closeup_View.mp4";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import toast from "react-hot-toast";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", 
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
  },
}));

const ImageSrc = styled("span")({
  position: "fixed", //absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
  width: "100vw",
  height: "100vh",
  objectFit: "cover",
  zIndex: "-1" /* Ensures the video stays behind other elements */,
});

const Image = styled("span")(({ theme }) => ({
  "& .MuiFormLabel-root": {
    fontFamily: "Kanit",
    color: "#3D5AFE",

    padding: "5px",
    borderRadius: "20px",
    fontSize: "16px",
  },
  "& .MuiInputBase-input": {
    fontFamily: "Kanit",
    color: "#616161",
  },
  "& .MuiTypography-caption": {
    fontFamily: "Kanit",
  },
  "& .MuiTypography-body2": {
    fontFamily: "Kanit",
  },
  "& .MuiTypography-subtitle1": {
    fontFamily: "Kanit",
  },
  "& .MuiTypography-body1": {
    fontFamily: "Kanit",
    color: "#616161",
  },
  "& .MuiTypography-h6": {
    fontFamily: "Kanit",
    color: "#FAFAFA",
  },
  "& .MuiInputLabel-animated": {
    fontFamily: "Kanit",
    color: "#616161",
    fontSize: "16px",
  },
  "& .MuiButton-root": {
    fontFamily: "Kanit",
    color: "#616161",
    fontSize: "16px",
  },
  "& .Mui-selected": {
    boxShadow: "5px 5px #c6caf8",
  },
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

const currencies = [
  {
    value: "Accounting",
    label: "Accounting",
  },
  {
    value: "Capacity",
    label: "Capacity",
  },
  {
    value: "CESC",
    label: "CESC",
  },
  {
    value: "CREW",
    label: "CREW",
  },
  {
    value: "CST",
    label: "CST",
  },
  {
    value: "DAS",
    label: "DAS",
  },
  {
    value: "Factory Systems",
    label: "Factory Systems",
  },
  {
    value: "Finance",
    label: "Finance",
  },
  {
    value: "Global Ops Strategy",
    label: "Global Ops Strategy",
  },
  {
    value: "HDD Business",
    label: "HDD Business",
  },
  {
    value: "HR",
    label: "HR",
  },
  {
    value: "IE",
    label: "IE",
  },
  {
    value: "IT",
    label: "IT",
  },
  {
    value: "LM",
    label: "LM",
  },
  {
    value: "MD/VP",
    label: "MD/VP",
  },
  {
    value: "ME",
    label: "ME",
  },
  {
    value: "MFG",
    label: "MFG",
  },
  {
    value: "NPI",
    label: "NPI",
  },
  {
    value: "Operation Excellence",
    label: "Operation Excellence",
  },
  {
    value: "Operation Plan. Mgmt.",
    label: "Operation Plan. Mgmt.",
  },
  {
    value: "PC",
    label: "PC",
  },
  {
    value: "PE",
    label: "PE",
  },
  {
    value: "PE_sRSS",
    label: "PE_sRSS",
  },
  {
    value: "PE_SSME",
    label: "PE_SSME",
  },
  {
    value: "PE_Electronics",
    label: "PE_Electronics",
  },
  {
    value: "PE_DMA",
    label: "PE_DMA",
  },
  {
    value: "PE_DIFA",
    label: "PE_DIFA",
  },
  {
    value: "PRC",
    label: "PRC",
  },
  {
    value: "QA",
    label: "QA",
  },
  {
    value: "SPMO",
    label: "SPMO",
  },
  {
    value: "SQE",
    label: "SQE",
  },
  {
    value: "Strategic Ops.",
    label: "Strategic Ops.",
  },
  {
    value: "TPE",
    label: "TPE",
  },
];
export const CreateNew = ({}) => {
  const navigate = useNavigate();

  const [click, setClick] = useState(0);

  const handleNewKrathong = () => {
    setClick(1);
  };

  const [page, setPage] = React.useState(1);
  const [srcUrl, setSrcUrl] = useState();

  const handleActionVirtual = () => {
    navigate("/virtual", { state: payloadMsg });
  };

  const handleChangeKrathong = (event, value) => {
    setPage(value);
  };

  const [fullName, setFullName] = useState("");
  const [wish, setWish] = useState("");
  const [department, setDepartment] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payloadMsg, setPayloadMsg] = useState([]);
  const [currentDate, setCurrentDate] = useState(() => {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  });

  useEffect(() => {
    if (fullName !== "" && wish !== "" && department != "" && page != "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [fullName, wish, department, page]);

  const CreateAction = async (e) => {
    e.preventDefault();

    // setIsCreating(true);
    let payload = "";
    payload = {
      emp_department: department,
      emp_name: fullName,
      emp_wish: wish,
      krathong_type: page,
    };
    setPayloadMsg(payload);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/krathong`,
        payload
      );

      if (response.data.response_code === "0000") {
        toast.success("ได้รับข้อมูลคุณ " + fullName + " เรียบร้อยแล้ว");

        setClick(2);
      }
    } catch (error) {
      toast.error("Something error, please try to refresh the page");
      console.error(error);
    }
  };

  return (
    <Box
      className="App"
      style={{
        fontFamily: "Kanit",
      }}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        minWidth: 300,
        width: "100%",

        height: "100%",
        fontFamily: "Kanit",
      }}
    >
      <ImageSrc style={{ backgroundImage: `url(${bg})`  }} />
      <ImageBackdrop className="MuiImageBackdrop-root" />
      <Image>
        {click === 0 ? (
          <ImageButton
            style={{
              width: "100%",
              height: "100vh",
            }}
          >
            <ButtonAdd onAddClick={handleNewKrathong} />
          </ImageButton>
        ) : click === 1 ? (
          <>
            <Card
              style={{
                backgroundSize: "cover",

                backdropFilter: " blur(1px)",
                borderRadius: "20px",
              }}
              sx={{ maxWidth: 500 }}
            >
              <CardContent>
                <Box sx={{ justifyContent: "center", alignItems: "center" }}>
                  <Typography>เลือกกระทงที่ถูกใจ</Typography>
                  <ImgKrathong page={page} className="" />
                  <ImageSrc
                    style={{
                      backgroundImage: `url(${bgCard})`,
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Typography>แบบที่ {page}</Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    <Pagination
                      style={{
                        borderRadius: "20px",
                        boxShadow: "5px 5px #c6caf8",
                        background: "rgba(255, 255, 255, 0.25)",
                        padding: "10px",
                      }}
                      alignItems="center"
                      justifyContent="center"
                      count={10}
                      page={page}
                      onChange={handleChangeKrathong}
                      fullWidth
                      color="secondary"
                    />
                  </Box>
                </Box>
                <form
                  onSubmit={(e) => {
                    CreateAction(e);
                  }}
                >
                  <Box
                    sx={{
                      "& > :not(style)": { m: 1 },
                      display: "flex-row",
                      marginRight: 1.5,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <AccountCircle
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                      <TextField
                        required
                        style={{
                          fontFamily: "Kanit",
                        }}
                        color="secondary"
                        id="input-with-sx"
                        label="ชื่อ-นามสกุล"
                        variant="standard"
                        inputProps={{ maxLength: 30 }}
                        fullWidth
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </Box>

                    <TextField
                      className="inputForm"
                      color="secondary"
                      required
                      id="outlined-multiline-static"
                      label="คำอวยพร"
                      multiline
                      rows={4}
                      fullWidth
                      value={wish}
                      onChange={(e) => setWish(e.target.value)}
                    />
                    <TextField
                      required
                      color="secondary"
                      id="outlined-select-currency"
                      select
                      label="แผนกของคุณ"
                      defaultValue="โปรดเลือกแผนกของคุณ"
                      fullWidth
                      helperText="โปรดเลือกแผนกของคุณ"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Box sx={{ margin: "10px", padding: "10px" }}>
                      <Button
                        type="submit"
                        //  disabled={isDisabled}
                        disabled={false}
                        style={{
                          color: "#FAFAFA",

                          backgroundImage:
                            "linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%)",
                          borderRadius: "20px",
                        }}
                        variant="contained"
                        endIcon={<SendIcon />}
                      >
                        ไปลอยกระทงกันเลย
                      </Button>
                    </Box>
                    <Typography variant="caption" sx={{ color: "#9E9E9E" }}>
                      {" "}
                      Powered with ❤️ by FTA & Media team{" "}
                    </Typography>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </>
        ) : click === 2 ? (
          <Card
            style={{
              backgroundSize: "cover",

              backdropFilter: " blur(1px)",
              borderRadius: "20px",
            }}
            sx={{ maxWidth: 500 }}
          >
            <CardContent>
              <video
                className="background-video"
                autoPlay
                muted
                loop
                playsInline
              >
                {/* <source src={videoBg} type="video/mp4" /> */}
                Your browser does not support the video tag.
              </video>
              <Box>
                <Card
                  sx={{
                    maxWidth: 345,
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: "rgba(12, 50, 228, 0.5)" }}
                        aria-label="recipe"
                      >
                        {fullName.substring(0, 1)}
                      </Avatar>
                    }
                    action={<IconButton aria-label="settings">{""}</IconButton>}
                    title={
                      <Typography variant="body2" sx={{ textAlign: "left" }}>
                        {"วันลอยกระทงของ " + fullName}
                      </Typography>
                    }
                    subheader={
                      <Typography variant="body2" sx={{ textAlign: "left" }}>
                        {currentDate}
                      </Typography>
                    }
                  />
                  <ImgKrathong page={page} className="drift-on-water" />

                  <CardContent
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.6) ",
                      m: 1,
                      borderRadius: "10px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {" "}
                      {wish}
                    </Typography>
                  </CardContent>

                  <Box
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      m: 2,
                    }}
                  >
                    <Button
                      style={{
                        color: "#FAFAFA",

                        backgroundImage:
                          "linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%)",
                        borderRadius: "20px",
                      }}
                      variant="contained"
                      endIcon={<VisibilityIcon />}
                      onClick={handleActionVirtual}
                    >
                      รับชม Virtual กระทงของฉัน
                    </Button>{" "}
                  </Box>
                </Card>
              </Box>
              {/* </Box> */}
            </CardContent>
          </Card>
        ) : (
          ""
        )}
      </Image>
    </Box>
  );
};
export const ImgKrathong = (page, className) => {
  let imgSrc;

  switch (page.page) {
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

  return (
    <>
      <img
        className={page.className}
        src={imgSrc}
        style={{ width: "150px" }}
        loading="lazy"
        alt="Krathong"
      />{" "}
    </>
  );
};
export const ButtonAdd = (props) => {
  const { onAddClick } = props;
  return (
    <>
      <div>
        <Button
          onClick={onAddClick}
          variant="contained"
          style={{
            color: "#FAFAFA",
            backgroundImage:
              "linear-gradient(to right top, #ff6f00, #ff8a00, #ffa400, #ffbe00, #ffd600)",
            boxShadow: "8px 5px #f6d365",
            backgroundColor: "#6A1B9A",
            borderColor: "#FFEE58",
            top: "35vh",
            borderRadius: "30px",
          }}
        >
          {" "}
          ลอยกระทงกับเรา
        </Button>
      </div>
    </>
  );
};
