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

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        name="username"
        placeholder="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
      />
      <Input
        name="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <Input
        name="name"
        placeholder="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <Input
        name="role"
        placeholder="Role"
        value={formik.values.role}
        onChange={formik.handleChange}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
