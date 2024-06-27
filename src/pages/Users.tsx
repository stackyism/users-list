import React, { useState } from "react";
import { Button, Typography, Space } from "antd";
import { defaultUsersData } from "../data/defaultUserData";
import { User } from "../types/user";
import { UserAddEditModal } from "../components/UserAddEditModal";
import { UserList } from "../components/UserList";

const { Title } = Typography;

export const Users = () => {
  const [state, setState] = useState<{
    users: User[];
    selectedUser: User | null;
    isModalVisible: boolean;
  }>({
    users: defaultUsersData,
    selectedUser: null,
    isModalVisible: false,
  });

  const showModal = (user: User | null = null) => {
    setState((prevState) => ({
      ...prevState,
      selectedUser: user,
      isModalVisible: true,
    }));
  };

  const handleCloseModal = () => {
    setState((prevState) => ({
      ...prevState,
      isModalVisible: false,
      selectedUser: null,
    }));
  };

  const handleOk = (updatedUser: User, isUserEdited: boolean) => {
    if (isUserEdited) {
      setState((prevState) => ({
        ...prevState,
        users: prevState.users.map((user) =>
          user.id === updatedUser.id ? { ...updatedUser } : user
        ),
        selectedUser: null,
        isModalVisible: false,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        users: [...prevState.users, updatedUser],
        selectedUser: null,
        isModalVisible: false,
      }));
    }
  };

  const handleDelete = (userToDelete: User) => {
    setState((prevState) => ({
      ...prevState,
      users: prevState.users.filter((user) => user.id !== userToDelete.id),
      isModalVisible: false,
    }));
  };
  return (
    <>
      <Space align="center">
        <Title>User Manager</Title>
        <Button type="primary" onClick={() => showModal()}>
          Add User
        </Button>
      </Space>
      <UserList
        users={state.users}
        onEditUser={showModal}
        onDeleteUser={handleDelete}
      />

      {state.isModalVisible ? (
        <UserAddEditModal
          user={state.selectedUser}
          onOk={handleOk}
          onClose={handleCloseModal}
          onDelete={handleDelete}
        />
      ) : null}
    </>
  );
};
