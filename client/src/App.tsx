import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { MotionConfig } from "framer-motion";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <WouterRouter hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router />
    </MotionConfig>
  );
}

export default App;
