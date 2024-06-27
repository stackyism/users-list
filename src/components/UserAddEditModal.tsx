import React, { useMemo } from "react";
import type { FormProps } from "antd";
import { Button, Input, Modal, Form, DatePicker, Space } from "antd";
import { User } from "../types/user";
import dayjs from "dayjs";

type FieldType = Omit<User, "id" | "icon">;

const getDefaultUser = (): User => ({
  id: Math.floor(Math.random() * 1000000),
  name: "",
  icon: "🆕",
  about: "",
  birthday: "",
});

export const UserAddEditModal = ({
  user,
  onOk,
  onClose,
  onDelete,
}: {
  onOk: (user: User, isUserEdited: boolean) => void;
  onClose: () => void;
  onDelete: (user: User) => void;
  user?: User | null;
}) => {
  const isEditMode = Boolean(user);
  const userDetails = useMemo(
    () =>
      user
        ? {
            ...user,
          }
        : getDefaultUser(),
    []
  );

  const handleFinish = (values: FieldType) => {
    onOk(
      {
        ...userDetails,
        ...values,
      },
      isEditMode
    );
  };
  const handleFinishError: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log(errorInfo);
  };
  return (
    <Modal
      title={isEditMode ? "Edit User" : "Add User"}
      open
      onCancel={onClose}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={userDetails}
        onFinish={handleFinish}
        onFinishFailed={handleFinishError}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="User Name"
          name="name"
          rules={[{ required: true, message: "Please enter user name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="About"
          name="about"
          rules={[{ required: true, message: "Please enter info about user!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Birthday"
          name="birthday"
          rules={[{ required: true, message: "Please enter user's birthday!" }]}
          getValueProps={(value) => ({ value: value && dayjs(value) })}
          normalize={(value) => value && dayjs(value).format("MMMM DD, YYYY")}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: isEditMode ? 16 : 20, span: 16 }}
          layout="horizontal"
        >
          <Space>
            {isEditMode ? (
              <Button danger onClick={() => onDelete(userDetails)}>
                Delete
              </Button>
            ) : null}

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
