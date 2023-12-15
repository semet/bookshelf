import { LayoutProps } from "component-types";
import React from "react";
import Header from "../partials/app-header";

export default function MainLayout({ children }: LayoutProps) {
   return (
      <div>
         {/* Header */}
         <Header />
         {children}
         {/* footer */}
      </div>
   );
}
