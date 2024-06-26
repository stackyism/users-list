import React from "react";
import { Button, Input, Modal } from "antd";
import { User } from "../types/user";

export const UserAddEditModal = ({
  visible,
  user,
  onOk,
  onClose,
  onDelete,
}: {
  visible: boolean;
  onOk: (user: User) => void;
  onClose: () => void;
  onDelete: (user: User) => void;
  user?: User | null;
}) => {
  const isEditMode = Boolean(user);
  const [state, setState] = React.useState<User>(
    user
      ? { ...user }
      : { id: Math.floor(Math.random() * 1000000), name: "", icon: "🆕" }
  );
  return (
    <Modal
      title={isEditMode ? "Edit User" : "Add User"}
      open={visible}
      onOk={() => onOk(state)}
      onCancel={onClose}
      footer={[
        isEditMode && (
          <Button key="delete" onClick={() => onDelete(state)}>
            Delete
          </Button>
        ),
        <Button key="submit" type="primary" onClick={() => onOk(state)}>
          {isEditMode ? "Save" : "Add"}
        </Button>,
      ]}
    >
      <Input
        placeholder="User Name"
        value={state.name}
        onChange={(e) =>
          setState((prevState) => ({
            ...prevState,
            name: e.target.value,
          }))
        }
      />
    </Modal>
  );
};
