
import Image from "next/image";
import profilePic from "@/assets/aiIcon.png";
import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation";
import CampaignCard from "@/components/client/campaignCard";
const Profile = async () => {
  const session = await auth();
  if (!session || !session?.user || !session?.user?.email) {
    return redirect("/login")
  }
  return (
    <div className="flex flex-col items-center text-white ">
      <div className="w-full max-w-4xl   p-8 rounded-lg shadow-lg  max-sm:p-1">
        {/* Profile Header */}
        <div className="flex justify-between items-center  max-sm:p-2: max-sm:items-start">
          <div className="flex gap-4 items-center max-sm:items-start max-sm:flex-col ">
            <Image
              src={profilePic}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full border-4 border-gray-700 max-sm:w-20 max-sm:h-20"
            />
            <div>
              <h2 className="text-3xl font-bold">{session?.user?.name}</h2>
              <p className="text-lg text-gray-400">{session?.user?.email}</p>

            </div>


          </div>
          <form action={async () => {
            "use server";
            await signOut();
            redirect('/login')
          }}>
            <button type="submit" className="w-[130px] h-[40px] bg-blue-700 text-black rounded font-semibold cursor-pointer  ">Sign out</button>
          </form>

        </div>



        {/* Recent Campaigns with Analytics */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Campaign Analytics</h3>
          <CampaignCard email={session?.user?.email!} />
        </div>


      </div>
    </div>
  );
};

export default Profile;
