import { Suspense } from "react";
import Router from "./routes";
import { Toaster } from "sonner";

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Router />
      <Toaster richColors />
    </Suspense>
  );
}

export default App;
