import React from "react";
import { User } from "../types/user";
import { Button, Avatar, Card, Space, Tooltip, Popconfirm, List } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const UserList = ({
  users,
  onEditUser,
  onDeleteUser,
}: {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}) => {
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={users}
      renderItem={(user, index) => (
        <List.Item>
          <Card
            onClick={() => onEditUser(user)}
            hoverable
            actions={[
              <Tooltip title="Edit">
                <Button
                  type="text"
                  size="small"
                  onClick={() => onEditUser(user)}
                  icon={<EditOutlined />}
                />
              </Tooltip>,
              <Tooltip title="Delete">
                <Popconfirm
                  title="Delete User"
                  description="Are you sure to delete this user?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={(event) => {
                    event?.stopPropagation();
                    onDeleteUser(user);
                  }}
                  onCancel={(event) => {
                    event?.stopPropagation();
                  }}
                >
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  />
                </Popconfirm>
              </Tooltip>,
            ]}
          >
            <Card.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={
                <span>
                  {user.name} {user.icon}
                </span>
              }
              description={user.about}
            />
          </Card>
        </List.Item>
      )}
    />
  );
};
