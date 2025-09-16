import AppRoutes from "./AppRoutes";
import ErrorBoundary from "./ErrorBoundry";
import Layout from "./components/layout/Layout";

const App = () => {

    return (
        <ErrorBoundary>
            <Layout>
                <AppRoutes />
            </Layout>
        </ErrorBoundary>
    );
};

export default App;
