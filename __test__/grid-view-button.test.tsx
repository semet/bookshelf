import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";

import { ViewType } from "component-types";
import GridViewButton from "@/components/home/grid-view-button";

describe("GridViewButton", () => {
   it("renders GridViewButton component with GRID viewType", () => {
      const onClickMock = jest.fn();
      const { getByTestId } = render(
         <GridViewButton onClick={onClickMock} viewType="GRID" />
      );

      const gridButton = getByTestId("grid-view-button");
      expect(gridButton).toBeInTheDocument();
      expect(gridButton).toHaveClass("text-gray-800");

      fireEvent.click(gridButton);
      expect(onClickMock).toHaveBeenCalled();
   });
});
