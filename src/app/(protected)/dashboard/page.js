import { getCurrentUser } from "@/app/auth";
import DashboardPage from "./DashboardPage";

export default async function Page() {
  const user = await getCurrentUser();

  console.log("user is : ", user);
 

  return (
    
      // {user !== null ? (<AllTodos user={user}/>):(<p>Unauthorized</p>)}
      <DashboardPage user={user} />
      
  );
}