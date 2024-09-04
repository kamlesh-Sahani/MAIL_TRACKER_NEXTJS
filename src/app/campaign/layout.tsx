import {auth} from "@/auth";
import {redirect} from "next/navigation"
const Layout = async({children}:{children:React.ReactNode})=>{
    const session = await auth();
    if(!session || !session?.user || !session?.user?.email){
        return  redirect("/login");
      }
    return children;
}
export default Layout;