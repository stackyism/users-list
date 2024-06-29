import React from "react";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { UserList } from "../UserList";
import { dummyUsers } from "../__fixtures__/dummyUsers";

const onEditUser = jest.fn();
const onDeleteUser = jest.fn();

describe("UserList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("renders user list", async () => {
    render(
      <UserList
        users={dummyUsers}
        onEditUser={onEditUser}
        onDeleteUser={onDeleteUser}
      />
    );
    expect(screen.getByText(dummyUsers[0].name)).toBeInTheDocument();
    expect(screen.getByText(dummyUsers[0].about)).toBeInTheDocument();
    expect(screen.getByText(dummyUsers[1].name)).toBeInTheDocument();
    expect(screen.getByText(dummyUsers[1].about)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId(`edit-user-${dummyUsers[0].id}`));
    expect(onEditUser).toHaveBeenCalledTimes(1);
    expect(onEditUser).toHaveBeenCalledWith(dummyUsers[0]);
    fireEvent.click(screen.getByTestId(`delete-user-${dummyUsers[1].id}`));
    fireEvent.click(screen.getByText("Yes"));
    expect(onDeleteUser).toHaveBeenCalledTimes(1);
    expect(onDeleteUser).toHaveBeenCalledWith(dummyUsers[1]);
  });
});
