import "./ProfileButton.css";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function ProfileButton() {
  const location = useLocation();

  const [isTouch, setIsTouch] = useState(location.pathname === "/"); //js
  useEffect(() => {
    setIsTouch(location.pathname === "/");
  }, [location.pathname]);

  return (
    <div className="profile-btn button-style">
      <Link to="/profile" className={`profile-btn__link link `}>
        Аккаунт
      </Link>
    </div>
  );
}

export default ProfileButton;
