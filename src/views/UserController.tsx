import { useEffect, useState } from "react";
import { ReducedUserInfo, UserInfo } from "../types/userInfo";
import { Container, Typography } from "@mui/material";
import UserTable from "../components/UserTable";
import UserModal from "../components/UserModal";
import Box from "@mui/material/Box";
import "../App.css";

function UserController() {
  const [userInfoData, setUserInfoData] = useState<UserInfo[]>([]);
  const req = "https://jsonplaceholder.typicode.com/users";

  async function getUserData() {
    try {
      const res = await fetch(req);

      if (res.status === 200) {
        const userData = await res.json();
        setUserInfoData(userData);
      }
    } catch (err) {
      console.log("Error in user data fetching: ", err);
    }
  }

  function appendUser(newUser: ReducedUserInfo) {
    const maxId = Math.max(...userInfoData.map((user) => user.id));
    const userToAppend: UserInfo = { id: maxId + 1, ...newUser };
    setUserInfoData([...userInfoData, userToAppend]);
  }
  function deleteUser(id: number) {
    setUserInfoData([...userInfoData.filter((user) => user.id !== id)]);
  }
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="usercontrollerheader">
        <Typography
          align="center"
          color="primary"
          id="modal-modal-title"
          variant="h1"
          component="h1"
        >
          User controller panel
        </Typography>
      </div>
      <div>
        <Container maxWidth="md">
          <Box align="right">
            <UserModal addUser={appendUser} />
          </Box>
        </Container>
        <Container maxWidth="md">
          <UserTable tableData={userInfoData} deleteUser={deleteUser} />
        </Container>
      </div>
    </>
  );
}

export default UserController;
