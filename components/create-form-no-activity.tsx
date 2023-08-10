"use client";

import { AlertTriangle } from "lucide-react";

export function CreateFormNoActivity() {
  return (
    <div className="mt-8 max-w-xl">
      <p className="font-bold text-base text-gray-900 mb-2">
        Eligibility rule
      </p>
      <div className="bg-yellow-100 text-yellow-900 p-4 rounded-xl flex flex-row space-x-2 items-center">
        <AlertTriangle size={20} />
        <span>Please select the onchain activity</span>
      </div>
    </div>
  );
}
