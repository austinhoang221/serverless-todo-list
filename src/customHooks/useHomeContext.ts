import React from "react";
import { HomeContext } from "../context/HomeContext";

export const useHomeContext = () => {
  const context = React.useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used inside HomeProvider");
  }
  return context;
};