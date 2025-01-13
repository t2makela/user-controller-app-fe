import { useEffect, useState } from "react";
import { UserInfo } from "../types/userInfo";

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
    </div>
  );
}

export default UserController;
