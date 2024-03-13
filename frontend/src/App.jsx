import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <>
        <ToastContainer />
        <Navigation />
        <main className="py-3">
          <Outlet />
        </main>
        <Footer />
      </>
    </>
  );
}

export default App;
