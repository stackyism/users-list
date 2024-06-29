import React from "react";
import { User } from "../types/user";
import { Flex } from "antd";
import { UserCard } from "./UserCard";
import { AddUserCard } from "./AddUserCard";

export const UserList = ({
  users,
  onAddEditUser,
  onDeleteUser,
}: {
  users: User[];
  onAddEditUser: (user?: User) => void;
  onDeleteUser: (user: User) => void;
}) => {
  return (
    <Flex wrap gap={16}>
      {users.map((user, index) => (
        <UserCard
          key={user.id}
          user={user}
          onEditUser={onAddEditUser}
          onDeleteUser={onDeleteUser}
          index={index}
        />
      ))}
      <AddUserCard onAddUser={onAddEditUser} />
    </Flex>
  );
};
