import ProfilePage from "./ProfilePage";

const { getCurrentUser } = require("@/app/auth")

const Page = async () =>{
    const user = await getCurrentUser()
    return (
        <ProfilePage user={user}/>
    )
}
export default Page;