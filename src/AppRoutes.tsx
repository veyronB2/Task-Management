import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import React from "react";
import ViewTasks from "./components/ViewTasks";
import { viewTasksPath } from "./utilities/constants";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path={viewTasksPath} element={<ViewTasks />} />
        </Routes>
    );
};

export default AppRoutes;
