import React, { useMemo } from "react";
import type { FormProps } from "antd";
import { Button, Input, Modal, Form, DatePicker, Space } from "antd";
import { User } from "../types/user";
import dayjs from "dayjs";
import { useKeyDown } from "../hooks/useKeyDown";

type FieldType = Omit<User, "id">;

const getDefaultUser = (): User => ({
  id: Math.floor(Math.random() * 1000000),
  name: "",
  icon: "🆕",
  about: "",
  birthday: "",
});

export type UserAddEditModalProps = {
  onOk: (user: User, isUserEdited: boolean) => void;
  onClose: () => void;
  onDelete: (user: User) => void;
  user?: User | null;
};

export const UserAddEditModal = ({
  user,
  onOk,
  onClose,
  onDelete,
}: UserAddEditModalProps) => {
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
    console.error(errorInfo); // can send sentry error
  };

  const [form] = Form.useForm<FieldType>();

  useKeyDown(() => form.submit(), ["Enter"]);

  return (
    <Modal
      title={isEditMode ? "Edit User" : "Add User"}
      open
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
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

        <Form.Item<FieldType>
          label="Emoticon"
          name="icon"
          rules={[{ required: true, message: "Please enter icon for user!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 20, span: 16 }} layout="horizontal">
          <Space>
            {/*  Somehow doesn't make sense here
            {isEditMode ? (
              <Button danger onClick={() => onDelete(userDetails)}>
                Delete
              </Button>
            ) : null} */}

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
