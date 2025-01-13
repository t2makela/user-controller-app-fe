import { useEffect, useState } from "react";
import { UserInfo } from "../types/userInfo";
import { Container } from "@mui/material";
import UserTable from "../components/UserTable";

function UserController() {
  const [userInfoData, setUserInfoData] = useState<
    Array<UserInfo> | undefined
  >();
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

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <h1>KÄYTTÄJIEN HALLINTAPANEELI</h1>
      <Container maxWidth="sm">
        {userInfoData?.length && <UserTable tableData={userInfoData} />}
      </Container>
    </div>
  );
}

export default UserController;
