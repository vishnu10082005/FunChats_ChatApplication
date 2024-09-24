import React from "react";
import { Route, Routes } from "react-router-dom";
// import Login from './Login';
import Chat from "../Chat/Chat";
import ProfilePage from "../UserRegistration/Profile";
import Forms from "../UserRegistration/Forms";

const AllRoutes = () => {
  return (
    <div>
      <Routes>end
        <Route path="/" element={<ProfilePage />} />
        <Route path="chat" element={<Chat />} />
        <Route path="login" element={<Forms />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
