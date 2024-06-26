import React from "react";
import { User } from "../types/user";
import { Button } from "antd";

export const UserList = ({
  users,
  onEditUser,
}: {
  users: User[];
  onEditUser: (user: User) => void;
}) => {
  return (
    <ul style={{ listStyle: "none", padding: "0" }}>
      {users.map((user) => (
        <li key={user.id} style={{ margin: "10px 0" }}>
          <span>
            {user.icon} {user.name}
          </span>
          <Button onClick={() => onEditUser(user)}>Edit</Button>
        </li>
      ))}
    </ul>
  );
};
