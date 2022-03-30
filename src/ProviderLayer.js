import App from "./App";
import DataProvider from "./context/DataProvider";
import { useFirebaseApp, AuthProvider, DatabaseProvider } from "reactfire";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const ProviderLayer = () => {
    // reactfire useapp hook
    const app = useFirebaseApp();

    //firebase SDK setup
    const db = getDatabase(app);
    const auth = getAuth(app);

    return (
        <AuthProvider sdk={auth}>
            <DatabaseProvider sdk={db}>
                <DataProvider>
                    <App />
                </DataProvider>
            </DatabaseProvider>
        </AuthProvider>
    )
}

export default ProviderLayer;