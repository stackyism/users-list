import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { UserAddEditModal } from "../UserAddEditModal";
import { dummyUsers } from "../__fixtures__/dummyUsers";

const onOk = jest.fn();
const onClose = jest.fn();
const onDelete = jest.fn();

const UPDATED_USER_NAME = "Regina Fellange";
const UPDATED_USER_ABOUT = "I am a changed user";
const UPDATED_USER_BIRTHDAY = "1992-05-22";
const UPDATED_USER_ICON = "👻";

describe("UserAddEditModal", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  test("render and submit edit user with all valid fields", async () => {
    render(
      <UserAddEditModal
        user={dummyUsers[1]}
        onOk={onOk}
        onClose={onClose}
        onDelete={onDelete}
      />
    );
    expect(screen.getByText("Edit User")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("user-name-field"), {
      target: { value: UPDATED_USER_NAME },
    });
    fireEvent.change(screen.getByTestId("user-about-field"), {
      target: { value: UPDATED_USER_ABOUT },
    });
    fireEvent.change(screen.getByTestId("user-birthday-field"), {
      target: { value: UPDATED_USER_BIRTHDAY },
    });
    fireEvent.change(screen.getByTestId("user-icon-field"), {
      target: { value: UPDATED_USER_ICON },
    });

    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(onOk).toHaveBeenCalledWith(
        {
          ...dummyUsers[1],
          name: UPDATED_USER_NAME,
          about: UPDATED_USER_ABOUT,
          birthday: "May 22, 1992",
          icon: UPDATED_USER_ICON,
        },
        true
      );
    });
  });
  test("render and submit add user with all valid fields", async () => {
    render(
      <UserAddEditModal onOk={onOk} onClose={onClose} onDelete={onDelete} />
    );
    expect(screen.getByText("Add User")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("user-name-field"), {
      target: { value: UPDATED_USER_NAME },
    });
    fireEvent.change(screen.getByTestId("user-about-field"), {
      target: { value: UPDATED_USER_ABOUT },
    });
    fireEvent.click(screen.getByTestId("user-birthday-field"));

    fireEvent.click(screen.getByText("Today"));

    fireEvent.change(screen.getByTestId("user-icon-field"), {
      target: { value: UPDATED_USER_ICON },
    });

    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(onOk).toHaveBeenCalledWith(
        {
          id: expect.any(Number),
          name: UPDATED_USER_NAME,
          about: UPDATED_USER_ABOUT,
          birthday: expect.any(String),
          icon: UPDATED_USER_ICON,
        },
        false
      );
    });
  });
  test("render and submit add user with invalid fields", async () => {
    render(
      <UserAddEditModal onOk={onOk} onClose={onClose} onDelete={onDelete} />
    );
    expect(screen.getByText("Add User")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(onOk).not.toHaveBeenCalled();
    });
  });
});
