import "./ProfileButton.css";
import React from "react";
import { Link } from "react-router-dom";

function ProfileButton() {
  return (
    <div className="profile-btn button-style">
      <Link to="/profile" className="profile-btn__link link">
        Аккаунт
      </Link>
    </div>
  );
}

export default ProfileButton;
