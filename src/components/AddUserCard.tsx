import React from "react";
import { Card, Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledCard = styled(Card)`
  min-width: 250px;
  max-width: 350px;
`;

export const AddUserCard = ({ onAddUser }: { onAddUser: () => void }) => (
  <StyledCard
    onClick={onAddUser}
    hoverable
    actions={[
      <Tooltip title="Add User">
        <Button
          size="small"
          type="text"
          onClick={(event) => {
            event.stopPropagation();
            onAddUser();
          }}
          icon={<PlusOutlined />}
        />
      </Tooltip>,
    ]}
  >
    <Card.Meta
      title="Add new user"
      description="Click here to add a new user"
    />
  </StyledCard>
);
