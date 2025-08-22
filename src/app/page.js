import Link from "next/link";
import { getCurrentUser } from "./auth";
import ButtonComponent from "./components/ButtonComponent";
import HomePage from "./components/HomePage";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";

export default async function Page() {
  const user = await getCurrentUser();

  //
  return (
    <LandingPage user= {user}/>
  );
}
