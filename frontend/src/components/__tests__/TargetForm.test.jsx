import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import TargetForm from "./TargetForm";

test("renders form correctly", () => {
  const { getByLabelText, getByText } = render(<TargetForm />);
  const nameInput = getByLabelText("Name:");
  const descriptionInput = getByLabelText("Description:");
  const submitButton = getByText("Utwórz osobę");
  expect(nameInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("allows user to enter data into the form", async () => {
  const { getByLabelText } = render(<TargetForm />);
  const nameInput = getByLabelText("Name:");
  const descriptionInput = getByLabelText("Description:");
  fireEvent.change(nameInput, { target: { value: "Test Name" } });
  fireEvent.change(descriptionInput, { target: { value: "Test Description" } });
  expect(nameInput.value).toBe("Test Name");
  expect(descriptionInput.value).toBe("Test Description");
});

test("submits the form", async () => {
  const mockFetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) }));
  global.fetch = mockFetch;
  const { getByText } = render(<TargetForm />);
  const submitButton = getByText("Utwórz osobę");
  fireEvent.click(submitButton);
  await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
});
