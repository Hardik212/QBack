"use client";
import React from "react";
import { useFormik } from "formik";
import { Input, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function UserForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      name: "",
      role: "",
    },
    onSubmit: (values) => {
      createUser(values);
    },
  });

  const createUser = (data: TSAny) => {
    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-cache",
      headers: {},
    })
      .then((res) => res.json())
      .then((user) => {
        console.log(user);
        router.push("../users");
      });
  };

  const inputStyle: React.CSSProperties = {
    marginTop: '10px',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
  };
  
  const buttonStyle: React.CSSProperties = {
    background: 'blue',
    color: 'white',
    marginTop: '10px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };
  
  return (
    <form onSubmit={formik.handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <Input
        name="username"
        placeholder="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
        style={inputStyle}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        style={inputStyle}
      />
      <Input
        name="name"
        placeholder="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        style={inputStyle}
      />
      <Input
        name="role"
        placeholder="Role"
        value={formik.values.role}
        onChange={formik.handleChange}
        style={inputStyle}
      />
      <Button type="submit" style={buttonStyle}>
        Submit
      </Button>
    </form>
  );  
}
