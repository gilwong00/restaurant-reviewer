import React, { createContext, useState, useEffect } from "react";

interface IAppContext {}

export const AppContext = createContext<IAppContext>({});

export default ({ children }: { children: React.ReactNode }) => {
  const context: IAppContext = {};

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
