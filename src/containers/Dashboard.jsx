import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import WaveSurfer from "wavesurfer.js";
import "./waveform.css";
import { ReactMic } from "react-mic";
import { useState, useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";

import CustomInput from "../components/CustomInput";
import Button from "../components/Button";
import ColorText from "../components/ColorText";
import LatestVideoCard from "../components/LatestVideoCard";

function Dashboard() {
  const theme = useTheme();

  const [userId, setUserId] = useState("");
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState("");

  const [recording, setRecording] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [message, setMessage] = useState("");

  console.log("userId : ", userId);

  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

//   useEffect(() => {
//     wavesurfer.current = WaveSurfer.create({
//       container: waveformRef?.current,
//       waveColor: "blue",
//       progressColor: "purple",
//     });

//     return () => {
//       if (wavesurfer?.current) {
//         wavesurfer.current.destroy();
//       }
//     };
//   }, []);

  const handleStartRecording = () => {
    setMessage("Listening...");
    setRecording(true);

    // Start the recording
    setTimeout(() => {
      console.log("timeout action");
      setRecording(false);
      setMessage("Stopped listening.");
    }, 10000); // 10 seconds
  };

  const handleStopRecording = () => {
    setMessage("Stopped listening.");
    setRecording(false);
  };

  const handleAudioData = (recordedAudio) => {
    setAudioData(recordedAudio.blob);

    // Load the recorded audio into the waveform player
    if (wavesurfer.current) {
      wavesurfer.current.loadBlob(recordedAudio.blob);
    }
  };

  const handlePlayAudio = () => {
    if (wavesurfer.current) {
      wavesurfer.current.play();
    }
  };

  return (
    <Box>
      {step === 1 && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          //   style={{ minHeight: "50vh", width: "50%" }}
        >
          <Card
            style={{
              padding: "30px",
              backgroundColor: "#252525",
              width: "50%",
            }}
          >
            <form className="form">
              <CustomInput
                labelText="User ID"
                id="userID"
                formControlProps={{
                  fullWidth: true,
                }}
                handleChange={(e) => setUserId(e.currentTarget.value)}
                type="numver"
              />
            </form>
          </Card>

          <Button type="button" color="primary" onClick={() => setStep(2)}>
            Log in
          </Button>
        </Grid>
      )}

      {step === 2 && (
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          //   style={{ minHeight: "50vh", width: "50%" }}
        >
          <Card
            sx={styles.langCard}
            onClick={() => {
              setLang("ta");
              setStep(3);
            }}
          >
            தமிழ் | Tamil
          </Card>

          <Card
            sx={styles.langCard}
            onClick={() => {
              setLang("hi");
              setStep(3);
            }}
          >
            हिंदी | Hindi
          </Card>

          <Card
            sx={styles.langCard}
            onClick={() => {
              setLang("ml");
              setStep(3);
            }}
          >
            മലയാളം | Malayalam
          </Card>

          <Card
            sx={styles.langCard}
            onClick={() => {
              setLang("te");
              setStep(3);
            }}
          >
            తెలుగు | Telugu
          </Card>

          <Card
            sx={styles.langCard}
            onClick={() => {
              setLang("kn");
              setStep(3);
            }}
          >
            ಕನ್ನಡ | Kannada
          </Card>
        </Grid>
      )}

      {step === 3 && (
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            {!recording ? (
              <Button
                type="button"
                color="primary"
                onClick={handleStartRecording}
                // disabled={recording}
              >
                Start Recording
              </Button>
            ) : (
              <Button
                type="button"
                color="primary"
                onClick={handleStopRecording}
                // disabled={!recording}
              >
                Stop Recording
              </Button>
            )}
            <Button
              type="button"
              color="primary"
              onClick={handlePlayAudio}
              disabled={!audioData}
            >
              Play
            </Button>
            {/* <p>{message}</p> */}
          </Grid>
          <Grid item>
            <ReactMic
              record={recording}
              onStop={handleAudioData}
              mimeType="audio/wav"
              strokeColor="#09ab69"
              backgroundColor="#1b0a38"
            />
            <div ref={waveformRef}></div>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Dashboard;

/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
  pageTitle: {
    mb: 2,
  },
  langCard: {
    backgroundColor: "#09ab69",
    padding: "20px",
    margin: "20px",
    color: "#fff",
    minWidth: "150px",
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
  },
  columnsContainer: {
    columns: "280px 3",
    maxWidth: 1400,
  },
  item: {
    mb: 2,
  },
  divider: {
    my: 2,
  },
  videoStatsRow: {
    display: "flex",
    justifyContent: "space-between",
    mt: 2,
    "&:hover": {
      color: "primary.main",
      cursor: "pointer",
    },
  },
  cardAction: {
    mt: 2,
  },
  ideaContent: {
    display: "flex",
  },
  ideaImage: {
    width: 80,
    alignSelf: "center",
    ml: 5,
  },
  ideaQuestion: {
    fontSize: "0.9rem",
    fontWeight: 500,
    my: 2,
  },
  avatar: {
    width: "30px",
    height: "auto",
    marginRight: 1,
  },
  postStats: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridAutoRows: "25px",
  },
  postAuthorSection: {
    display: "flex",
    alignItems: "center",
    my: 3,
  },
  postMeta: {
    mr: 1,
    fontSize: "0.8rem",
    color: "neutral.normal",
  },
  videoThumbnail: {
    width: 80,
    ml: "auto",
  },
  commentRow: {
    display: "flex",
    alignItems: "flex-start",
    mt: 2,
  },
  commentDetailsSection: {
    display: "flex",
    alignItems: "center",
  },
  commentText: {
    fontSize: "0.8rem",
    mt: 0.5,
    mr: 2,
  },
  insiderImage: {
    width: "100%",
    mt: 1,
  },
};
