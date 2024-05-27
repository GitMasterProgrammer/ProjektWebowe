import React from "react";
import { render, screen } from "@testing-library/react";
import TargetForm from "../TargetForm";

it("renders form correctly", () => {
  const { getByLabelText, getByText } = render(<TargetForm />);
  const nameInput = getByLabelText("Name:");
  const descriptionInput = getByLabelText("Description:");
  const submitButton = getByText("Utwórz osobę");
  expect(nameInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});   