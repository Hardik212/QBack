type User = {
  _id: string;
  name: string;
  username: string;
  role: string;
};

// userlist.tsx
import React, { useState, useMemo, ChangeEvent } from "react";
import { OTable } from "@/fwk/oTable";
import { Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import { CELL_TYPES, ColumnBuilder } from "@/fwk/oTable";
import { highlight } from "@/fwk/utils";

const getInitials = (name: string) => {
  const words = name.split(" ");
  return words
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};

const Columns = [
  ColumnBuilder()
    .component((data: { row: { original: User } }) => (
      <Avatar style={{ backgroundColor: "green" }}>
        {getInitials(data.row.original.name)}
      </Avatar>
    ))
    .id("avatar")
    .width(80)
    .build(),
  ColumnBuilder().id("name").name("Name").build(),
  ColumnBuilder().id("username").name("Username").width(400).build(),
  ColumnBuilder().id("role").name("Role").build(),
];

interface UserListProps {
  data: User[];
}

export default function UserList({ data: initialData }: UserListProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<User[]>(initialData);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
  };

  useMemo(() => {
    const filteredUsers = initialData.filter((user) => {
      const usernameMatch = user.username.toLowerCase().includes(searchTerm);
      const nameMatch = user.name.toLowerCase().includes(searchTerm);
      const roleMatch = user.role.toLowerCase().includes(searchTerm);

      return usernameMatch || nameMatch || roleMatch;
    });

    setFilteredData(filteredUsers);
  }, [searchTerm, initialData]);

  const router = useRouter();

  const openUser = (row: { _id: string }) => {
    router.push(`/users/${row._id}`);
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded mr-2"
        />
      </div>
      <OTable
  isFullWidthTable
  stickyHeader
  columns={Columns.map((column) => {
    if (column.id === "name" || column.id === "username" || column.id === "role") {
      column.Cell = ({ cell, rowData }) => {
        const content = cell.column.accessor(rowData);
        const lowerContent = content.toLowerCase();
        const lowerSearchTerm = searchTerm.toLowerCase();

        const indexOfMatch = lowerContent.indexOf(lowerSearchTerm);
        if (indexOfMatch !== -1 && searchTerm.trim() !== "") {
          return (
            <div className="truncate" style={{ backgroundColor: "yellow" }}>
              {content}
            </div>
          );
        }

        return <div className="truncate">{content}</div>;
      };
    }
    return column;
  })}
  data={filteredData}
  onRowClick={openUser}
  />
  </div>
  );
}
