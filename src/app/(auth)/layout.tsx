import {auth} from "@/auth";
import { redirect } from "next/navigation";
const Layout = async({children}:{children:React.ReactNode})=>{
    const session = await auth();
    if(session?.user?.email){
        return redirect("/");
    }
    return children
  
}

export default Layout;