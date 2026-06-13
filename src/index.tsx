import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";
import { ThemeProvider } from "styled-components";
import { theme } from "./tokens/theme";

import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { NotFound } from "./pages/_404";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocationProvider>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/products" component={Products} />
          <Route path="/profile" component={Profile} />
          <Route path="/settings" component={Settings} />
          <Route default component={NotFound} />
        </Router>
      </LocationProvider>
    </ThemeProvider>
  );
}

render(<App />, document.getElementById("app")!);
