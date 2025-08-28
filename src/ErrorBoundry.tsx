import React, { JSX } from "react";

import { Box } from "@mui/material";
import HeroBanner from "./components/HeroBanner";

interface ErrorBoundaryProps {
    children: JSX.Element;
}

interface ErrorBoundaryState {
    error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);

        this.state = {
            error: null,
        };
    }

    render() {
        if (!!this.state.error) {
            return <Box
                        width="100%"
                        height="100vh"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        px={2} 
                    > 
                        <HeroBanner title="Something went wrong..."/>
                    </Box>
        }

        return this.props.children;
    }

    public componentDidCatch(error: Error, info: any) {
        console.error(error);
        console.error(info);
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            error,
        };
    }
}

export default ErrorBoundary;