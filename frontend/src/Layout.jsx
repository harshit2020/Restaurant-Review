import Header from "./components/Header"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import { Outlet } from "react-router";
export default function Layout(){
    return (
    <div className="grid grid-rows-[0.2fr_3fr_0.5fr] min-h-screen">
        <Header />
        <Outlet/>
        <Footer />
    </div>
    );
}