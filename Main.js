import { AppProvider } from "./components/consts/AppContext";
import App from "./App";

export default function Main() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}