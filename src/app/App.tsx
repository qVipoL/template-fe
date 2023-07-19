import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { withAuthContext } from "src/context/auth";
import { withThemeContext } from "src/context/theme";
import { Router } from "./router";

const AppBase = () => <Router />;

const AppWithContexts = () => withThemeContext(() => withAuthContext(AppBase));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const App = () => (
  // could not find a better fix, query client was not accessible from other contexts
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppWithContexts />
    </LocalizationProvider>
  </QueryClientProvider>
);
