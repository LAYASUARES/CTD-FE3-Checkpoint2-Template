
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { useContexts } from "./Hooks/mainContext";

function App() {

  const {mainState} = useContexts()
  return (
    <>
      <div className={`app ${mainState.theme}}`}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;