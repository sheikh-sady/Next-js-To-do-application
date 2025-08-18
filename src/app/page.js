import { getCurrentUser } from "./auth";
import HomePage from "./components/HomePage";

export default async function Page() {
  const user = await getCurrentUser()
  return(
    <HomePage user={user}/>
  )
}
