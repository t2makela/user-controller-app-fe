import { useEffect, useState } from "react";
import { ReducedUserInfo, UserInfo } from "../types/userInfo";
import { Container } from "@mui/material";
import UserTable from "../components/UserTable";
import UserModal from "../components/UserModal";

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
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <h1>KÄYTTÄJIEN HALLINTAPANEELI</h1>
      <UserModal addUser={appendUser} />
      <Container maxWidth="sm">
        {userInfoData?.length && <UserTable tableData={userInfoData} />}
      </Container>
    </div>
  );
}

export default UserController;
