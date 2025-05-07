import React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import ThemeDropdown from "./Components/ModalTheme/ThemeDropdown";

const App = () => {
  const element = useRoutes(routes);

  return (
    <>
      <div className="font-jakarta">
        <div className="absolute top-4 right-4">
          <ThemeDropdown />
        </div>
        {element}
      </div>
    </>
  );
};

export default App;
