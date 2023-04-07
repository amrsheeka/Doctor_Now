import { AppProvider } from "./components/consts/AppContext";
import Main from "./Main"

export default function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}