import { Route, Routes } from "react-router-dom";

import Home from "./components/views/Home";
import React from "react";
import ViewTasks from "./components/views/ViewTasks";
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
