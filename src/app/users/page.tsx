// page.tsx
"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import UserList from "./userList";
import ModuleHeader from "@/components/moduleHeader";

export default function User() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch user data and update state
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []); // Run once when the component mounts

  return (
    <div className="w-full p-8">
      <div className="pb-8">
        <ModuleHeader
          title="Users"
          action={{
            label: "New User",
            href: "/users/add",
          }}
        />
      </div>
      <UserList data={userData} />
    </div>
  );
}
