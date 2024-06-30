import React from "react";
import { User } from "../types/user";
import { Button, Avatar, Card, Tooltip, Popconfirm, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Text } = Typography;

const StyledCard = styled(Card)`
  min-width: 250px;
  max-width: 350px;
`;

export const UserCard = ({
  user,
  onEditUser,
  onDeleteUser,
  index,
}: {
  user: User;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  index: number;
}) => (
  <StyledCard
    onClick={() => onEditUser(user)}
    hoverable
    actions={[
      <Tooltip title="Edit">
        <Button
          data-testid={`edit-user-${user.id}`}
          type="text"
          size="small"
          aria-label="Edit User"
          onClick={(event) => {
            event.stopPropagation();
            onEditUser(user);
          }}
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
            aria-label="Delete User"
            data-testid={`delete-user-${user.id}`}
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
        <div>
          <Text aria-label={user.name} ellipsis>
            {user.name}
          </Text>{" "}
          <Text>{user.icon}</Text>
        </div>
      }
      description={
        <Text aria-label={user.about} ellipsis>
          {user.about}
        </Text>
      }
    />
  </StyledCard>
);
