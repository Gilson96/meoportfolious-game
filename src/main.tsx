import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

// Skip ngrok's free-tier browser warning page, which has no CORS headers
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
