import { getCurrentUser } from "@/app/auth";
import SettingsPage from "./SettingsPage";

const Page = async() =>{
    const user = await getCurrentUser()
    return (
       <SettingsPage user={user}/>
    )
}
export default Page;