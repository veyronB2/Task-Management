import { Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import React from 'react';
import TaskForm from './Pages/TaskForm';
import ViewTasks from './Pages/ViewTasks';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-task" element={<TaskForm />} />
      <Route path="/view-tasks" element={<ViewTasks />} />
    </Routes>
  );
};

export default AppRoutes;
