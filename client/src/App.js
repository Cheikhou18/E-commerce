import "./index.css";
import Router from "./router";

import { AuthProvider } from "./context/admin";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
