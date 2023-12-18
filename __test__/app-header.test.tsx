import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../src/components/partials/app-header";

test("renders Header component", () => {
   render(<Header />);
   const headerText = screen.getByText(/Bookshelf/i);
   expect(headerText).toBeInTheDocument();
});
