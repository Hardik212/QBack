"use client";
import React from "react";
import { CELL_TYPES, ColumnBuilder } from "@/fwk/oTable";
import { OTable } from "@/fwk/oTable";
import { Avatar } from "@mui/material";

const getRandomColor = () => {
  const colors = ["#f44336", "#2196f3", "#4caf50", "#ff9800", "#9c27b0", "#795548", "#607d8b",
    "#3f51b5", "#00bcd4", "#009688", "#8bc34a", "#cddc39", "#ffc107", "#ff5722", "#e91e63",
    "#673ab7", "#ffeb3b", "#ff9800", "#ff5722", "#795548", "#607d8b", "#3f51b5", "#00bcd4",];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getInitials = (name: string) => {
  const words = name.split(" ");
  return words
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};

const Columns = [
  ColumnBuilder()
    .component((data) => (
      <Avatar style={{ backgroundColor: getRandomColor() }}>
        {getInitials(data.row.original.username)}
      </Avatar>
    ))
    .id("avatar")
    .width(80)
    .build(),
  ColumnBuilder().id("username").name("Username").width(400).build(),
  ColumnBuilder().id("name").name("Name").build(),
  ColumnBuilder().id("role").name("Role").build(),
];

export default function User() {
  const [data, setData] = React.useState([]);
  // const router = useRouter();

  React.useEffect(() => {
    fetch("/api/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .then((data) => console.log(data));
  }, []);

  return (
    <OTable
      isFullWidthTable
      stickyHeader
      columns={Columns}
      data={data}
    />
  );
}
