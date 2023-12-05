import React, { useEffect, useState } from "react";
import axios from "axios";

import { Formik } from "formik";

import MenuIcon from "@mui/icons-material/Menu";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Input,
} from "@mui/material";

function Musics() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [musicList, setMusicList] = useState([]);

  const formFields = [
    { fieldName: "name", type: "text" },
    { fieldName: "dance", type: "number" },
    { fieldName: "energy", type: "number" },
    { fieldName: "key", type: "number" },
    { fieldName: "speech", type: "number" },
    { fieldName: "acoustic", type: "number" },
    { fieldName: "instrumental", type: "number" },
    { fieldName: "time", type: "number" },
  ];


  async function loadMusics() {
    try {
      const userId = localStorage.getItem("userId");
      

      console.log(userId)

      await axios.get(
        `http://127.0.0.1:5000/api/predicts/${userId}`
      ).then((res)=> setMusicList(res.data.musics));

      
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmitPredict = async (values) => {
    try {
      const userId = localStorage.getItem("userId")

      await axios.post("http://127.0.0.1:5000/api/predicts", {
        ...values,
        userId,
      }).then(async (res)=> {

        setIsModalOpen(false);

        await loadMusics()

      } ).catch((err)=> 
       { console.log(err)
        setIsModalOpen(false)}
      );



    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function loadMusics() {
      try {
        const userId = localStorage.getItem("userId");

        await axios.get(
          `http://127.0.0.1:5000/api/predicts/${userId}`
        ).then((res)=> setMusicList(res.data.musics));

        
      } catch (err) {
        console.error(err);
      }
    }

    loadMusics();
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Button color="inherit" onClick={() => setIsModalOpen(true)}>
              Predict
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Preencha o predict</h1>
          <Formik initialValues={{}} onSubmit={handleSubmitPredict}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {formFields.map((field) => {
                  return (
                    <>
                      <Input
                        key={field.fieldName}
                        type={field.type}
                        name={field.fieldName}
                        placeholder={field.fieldName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[field.fieldName]}
                      />
                      {errors[field.fieldName] &&
                        touched[field.fieldName] &&
                        errors[field.fieldName]}
                    </>
                  );
                })}

                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginTop: 20 }}
                >
                  Enviar
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>

      <div style={{ padding: 20 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>name</TableCell>
                <TableCell>popularity</TableCell>
                <TableCell>speech</TableCell>
                <TableCell>acoustic</TableCell>
                <TableCell>dance</TableCell>
                <TableCell>energy</TableCell>
                <TableCell>instrumental</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {musicList.map((row,i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.popularity}</TableCell>
                  <TableCell>{row.speech}</TableCell>
                  <TableCell>{row.acoustic}</TableCell>
                  <TableCell>{row.dance}</TableCell>
                  <TableCell>{row.energy}</TableCell>
                  <TableCell>{row.instrumental}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Musics;
