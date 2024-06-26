import React, { useState } from "react";
import { Button } from "antd";
import { defaultUsersData } from "../data/defaultUserData";
import { User } from "../types/user";
import { UserAddEditModal } from "../components/UserAddEditModal";
import { UserList } from "../components/UserList";

export const Users = () => {
  const [state, setState] = useState<{
    users: User[];
    selectedUser: User | null;
    isModalVisible: boolean;
    isEditMode: boolean;
  }>({
    users: defaultUsersData,
    selectedUser: null,
    isModalVisible: false,
    isEditMode: false,
  });

  const showModal = (user: User | null = null) => {
    setState((prevState) => ({
      ...prevState,
      selectedUser: user,
      isEditMode: !!user,
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

  const handleOk = (updatedUser: User) => {
    if (state.isEditMode) {
      setState((prevState) => ({
        ...prevState,
        users: prevState.users.map((user) =>
          user.id === updatedUser.id ? { ...updatedUser } : user
        ),
        isModalVisible: false,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        users: [...prevState.users, updatedUser],
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
      <UserList users={state.users} onEditUser={showModal} />
      <Button onClick={() => showModal()}>Add User</Button>
      <UserAddEditModal
        key={state.selectedUser?.id || "New User"}
        user={state.selectedUser}
        onOk={handleOk}
        onClose={handleCloseModal}
        visible={state.isModalVisible}
        onDelete={handleDelete}
      />
    </>
  );
};
