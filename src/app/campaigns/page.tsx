"use client";

import { useState, useEffect } from "react";
import CampaignCard from "../../components/CampaignCard";

import { fetchCampaigns } from "../../utils/api";

interface AudienceRule {
  field: string;
  operator: string;
  value: string;
  condition: string;
}

interface Campaign {
  _id: string;
  campaignName: string;
  campaignMessage: string;
  audienceRules: AudienceRule[];
  audienceSize: number;
  deliveryStatus: string;
  sentCount: number;
  failedCount: number;
  createdAt: string;
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedRules, setSelectedRules] = useState<AudienceRule[] | null>(
    null
  );

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    getCampaigns();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Campaigns</h1>
      {campaigns.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No past campaigns found.</p>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Campaign Name
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Campaign Message
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Audience
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Audience Rules
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {campaigns.map((campaign) => (
                    <CampaignCard
                      key={campaign._id}
                      campaign={campaign}
                      onViewRules={setSelectedRules}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {selectedRules && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full relative transition-transform transform scale-95 hover:scale-100 duration-200 ease-in-out">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Audience Rules
            </h3>
            {selectedRules.length === 0 ? (
              <p className="text-gray-700 font-medium">All customers</p>
            ) : (
              <ul className="space-y-4">
                {selectedRules.map((rule, index) => (
                  <li key={index} className="p-4 border rounded-lg bg-gray-100">
                    <p className="text-gray-700 font-medium">
                      {rule.field} {rule.operator} {rule.value} (
                      {rule.condition})
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setSelectedRules(null)}
              className="absolute -top-4 -right-4 bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
