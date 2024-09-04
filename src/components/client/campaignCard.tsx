"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader";
const CampaignCard = ({ email }: { email: string }) => {
  const [campaigns, setCampaigns] = useState<Array<{
    campaignName: string;
    opend: Array<string>;
    recipients: Array<string>;
    createdAt: string;
  }>>();
  useEffect(() => {
    (async function () {
      const { data } = await axios.post("/api/me", { email });

      setCampaigns(data?.user?.campaigns)
    })()
  }, [email])
  return (
    <>
    {
      campaigns ?   <ul className="space-y-4">
      {campaigns?.map((campaign, index) => (
        <li
          key={index}
          className="flex flex-col bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition"
        >
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-xl font-bold">{campaign.campaignName}</h4>
              <p className="text-sm text-gray-400">{campaign?.createdAt}</p>
            </div>

          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800 rounded-lg shadow-md text-center">
              <p className="text-xl font-bold">{campaign.recipients.length}</p>
              <p className="text-sm text-gray-400">Recipients</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md text-center">
              <p className="text-xl font-bold">{campaign.opend.length}</p>
              <p className="text-sm text-gray-400">Opened</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md text-center">
              <p className="text-xl font-bold">
                {campaign.recipients.length > 0
                  ? ((campaign.opend.length / campaign.recipients.length) * 100).toFixed(2) + "%"
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-400">Click Rate</p>
            </div>
          </div>
        </li>
      ))}
    </ul> :<Loader />
    }

    </>
  )
}

export default CampaignCard