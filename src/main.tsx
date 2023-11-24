import ReactDOM from "react-dom/client";

import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import RenderRoutes from "./routes/index.tsx";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="767279612462-52d98kfmhtf7vt9e12av04n7maqc22ff.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RenderRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
