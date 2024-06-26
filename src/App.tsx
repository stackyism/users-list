import "./App.css";
import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import { usersData } from "./data/defaultUserData";
import { User } from "./types/user";

const App = () => {
  const [state, setState] = useState<{
    users: User[];
    selectedUser: User | null;
    isModalVisible: boolean;
    newUserName: string;
    isEditMode: boolean;
  }>({
    users: usersData,
    selectedUser: null,
    isModalVisible: false,
    newUserName: "",
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

  const handleOk = () => {
    if (state.isEditMode) {
      setState((prevState) => ({
        ...prevState,
        users: prevState.users.map((user) =>
          // @ts-ignore
          user.id === prevState.selectedUser.id
            ? { ...user, name: state.newUserName }
            : user
        ),
        isModalVisible: false,
        newUserName: "",
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        users: [
          ...prevState.users,
          {
            id: prevState.users.length + 1,
            name: state.newUserName,
            icon: "🆕",
          },
        ],
        isModalVisible: false,
        newUserName: "",
      }));
    }
  };

  const handleDelete = () => {
    setState((prevState) => ({
      ...prevState,
      users: prevState.users.filter(
        // @ts-ignore
        (user) => user.id !== prevState.selectedUser.id
      ),
      isModalVisible: false,
      newUserName: "",
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {state.users.map((user) => (
          <li key={user.id} style={{ margin: "10px 0" }}>
            <span>
              {user.icon} {user.name}
            </span>
            <Button onClick={() => showModal(user)}>Edit</Button>
          </li>
        ))}
      </ul>
      <Button onClick={() => showModal()}>Add User</Button>
      <Modal
        title={state.isEditMode ? "Edit User" : "Add User"}
        open={state.isModalVisible}
        onOk={handleOk}
        onCancel={() =>
          setState((prevState) => ({ ...prevState, isModalVisible: false }))
        }
        footer={[
          state.isEditMode && (
            <Button key="delete" onClick={handleDelete}>
              Delete
            </Button>
          ),
          <Button key="submit" type="primary" onClick={handleOk}>
            {state.isEditMode ? "Save" : "Add"}
          </Button>,
        ]}
      >
        <Input
          placeholder="User Name"
          value={state.newUserName}
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              newUserName: e.target.value,
            }))
          }
        />
      </Modal>
    </div>
  );
};

export default App;
