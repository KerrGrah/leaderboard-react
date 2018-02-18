import React from "react";
import "./index.css";
import Header from "./components/Header";
import Leaderboard from "./components/Leaderboard";

class UserList extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Leaderboard />
      </div>
    );
  }
}

export default UserList;
