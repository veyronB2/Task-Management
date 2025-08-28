import React, { ReactNode } from "react";

import { Box } from "@mui/material";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#c6f2f7ff"
        >
            {children}
        </Box>
    );
};

export default Layout;
