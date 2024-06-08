'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createAudience } from '../../utils/api';

interface Rule {
  field: string;
  operator: string;
  value: string;
  condition: string; // AND/OR
}

interface Audience {
  campaignName: string;
  campaignMessage: string;
  rules: Rule[];
}

const availableFields = [
  { label: 'Total Spends', value: 'total_spends' },
  { label: 'Visits', value: 'visits' },
  { label: 'Last Visit', value: 'last_visit' },
  // Add other fields as needed
];

const operators = [
  { label: 'Equals', value: '=' },
  { label: 'Not Equals', value: '!=' },
  { label: 'Greater Than', value: '>' },
  { label: 'Less Than', value: '<' },
  { label: 'Greater or Equals', value: '>=' },
  { label: 'Less or Equals', value: '<=' },
  // Add other operators as needed
];

export default function CreateAudience() {
  const [audience, setAudience] = useState<Audience>({ campaignName: '', campaignMessage: '', rules: [] });
  const [audienceSize, setAudienceSize] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAudienceSize = async () => {
      const response = await fetch('http://localhost:5000/api/audiences/size', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(audience),
      });
      const data = await response.json();
      setAudienceSize(data.size);
    };

    checkAudienceSize();
  }, [audience]);

  const addRule = () => {
    setAudience({
      ...audience,
      rules: [...audience.rules, { field: availableFields[0].value, operator: operators[0].value, value: '', condition: 'AND' }],
    });
  };

  const removeRule = (index: number) => {
    const rules = [...audience.rules];
    rules.splice(index, 1);
    setAudience({ ...audience, rules });
  };

  const handleChange = (index: number, field: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const rules = [...audience.rules];
    rules[index] = { ...rules[index], [field]: e.target.value };
    setAudience({ ...audience, rules });
  };

  const handleCampaignNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAudience({ ...audience, campaignName: e.target.value });
  };

  const handleCampaignMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAudience({ ...audience, campaignMessage: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createAudience(audience);
      alert('Audience created successfully');
      router.push('/campaigns');
    } catch (error) {
      console.error('Error creating audience:', error);
      alert('Failed to create audience');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Create Audience</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow-lg rounded-lg">
        <div className="space-y-4">
          <div>
            <label htmlFor="campaignName" className="block text-gray-700 font-semibold mb-2">Campaign Name</label>
            <input
              type="text"
              id="campaignName"
              placeholder="Campaign Name"
              value={audience.campaignName}
              onChange={handleCampaignNameChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="campaignMessage" className="block text-gray-700 font-semibold mb-2">Campaign Message</label>
            <input
              type="text"
              id="campaignMessage"
              placeholder="Campaign Message (e.g., Hi {customer_name}, here is your 10% discount)"
              value={audience.campaignMessage}
              onChange={handleCampaignMessageChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Rules</h2>
          {audience.rules.length === 0 ? (
            <div className="p-4 bg-blue-100 text-blue-700 rounded-lg border border-blue-500">
              <p>All customers will be included if no rules are added.</p>
            </div>
          ) : (
            audience.rules.map((rule, index) => (
              <div key={index} className="flex space-x-4 items-center">
                <select
                  value={rule.field}
                  onChange={handleChange(index, 'field')}
                  className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {availableFields.map((field) => (
                    <option key={field.value} value={field.value}>
                      {field.label}
                    </option>
                  ))}
                </select>
                <select
                  value={rule.operator}
                  onChange={handleChange(index, 'operator')}
                  className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {operators.map((operator) => (
                    <option key={operator.value} value={operator.value}>
                      {operator.label}
                    </option>
                  ))}
                </select>
                {rule.field === 'last_visit' ? (
                  <input
                    type="date"
                    value={rule.value}
                    onChange={handleChange(index, 'value')}
                    className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="Value"
                    value={rule.value}
                    onChange={handleChange(index, 'value')}
                    className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
                {index > 0 && (
                  <select
                    value={rule.condition}
                    onChange={handleChange(index, 'condition')}
                    className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                  </select>
                )}
                <button
                  type="button"
                  onClick={() => removeRule(index)}
                  className="p-2 text-red-600 hover:text-red-800 transition-all"
                >
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
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
            ))
          )}
          <div className="flex space-x-4">
            <button type="button" onClick={addRule} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-all flex items-center">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Rule
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all flex items-center">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Send Campaign
          </button>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold text-gray-800">Audience Size: {audienceSize !== null ? audienceSize : 'Calculating...'}</p>
          </div>
        </div>
      </form>
    </div>
  );
}
