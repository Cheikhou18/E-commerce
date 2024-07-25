import "./index.css";
import Router from "./router";

import { AuthProvider } from "./api/auth/admin";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
