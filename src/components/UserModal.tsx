import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { ReducedUserInfo, ReducedUserInfoSchema } from "../types/userInfo";
import { z } from "zod";

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
const emptyUser = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
};
export default function UserModal({
  addUser,
}: {
  addUser: (userInfo: ReducedUserInfo) => void;
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newUserInfo, setNewUserInfo] = useState<ReducedUserInfo>(emptyUser);
  const [userInfoErrors, setUserInfoErrors] =
    useState<ReducedUserInfo>(emptyUser);

  function handleOpen() {
    setModalOpen(true);
  }

  function handleClose() {
    setModalOpen(false);
    setNewUserInfo(emptyUser);
    setUserInfoErrors(emptyUser);
  }

  function handleChange(key: string, value: string) {
    const newData = { ...newUserInfo, [key]: value };
    setNewUserInfo(newData);
  }

  function handleUserAppend() {
    try {
      setUserInfoErrors(emptyUser);
      ReducedUserInfoSchema.parse(newUserInfo);
      addUser(newUserInfo);
      handleClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((error) => {
          setUserInfoErrors((prevState: ReducedUserInfo) => {
            return { ...prevState, [error.path[0]]: error.message };
          });
        });
      }
    }
  }

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add user
      </Button>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {
          <Box sx={style}>
            <Typography
              align="center"
              color="primary"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Lisää käyttäjä
            </Typography>
            <TextField
              error={!!userInfoErrors.name}
              helperText={userInfoErrors.name}
              id="outlined-basic"
              label="Name"
              name="name"
              variant="outlined"
              value={newUserInfo.name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(event.target.name, event.target.value);
              }}
            />
            <TextField
              error={!!userInfoErrors.username}
              helperText={userInfoErrors.username}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              name="username"
              value={newUserInfo.username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(event.target.name, event.target.value);
              }}
            />
            <TextField
              error={!!userInfoErrors.email}
              helperText={userInfoErrors.email}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
              value={newUserInfo.email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(event.target.name, event.target.value);
              }}
            />
            <TextField
              error={!!userInfoErrors.phone}
              helperText={userInfoErrors.phone}
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              name="phone"
              value={newUserInfo.phone}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(event.target.name, event.target.value);
              }}
            />
            <TextField
              error={!!userInfoErrors.website}
              helperText={userInfoErrors.website}
              id="outlined-basic"
              label="Website"
              variant="outlined"
              name="website"
              value={newUserInfo.website}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(event.target.name, event.target.value);
              }}
            />
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUserAppend}>Add user</Button>
          </Box>
        }
      </Modal>
    </>
  );
}
