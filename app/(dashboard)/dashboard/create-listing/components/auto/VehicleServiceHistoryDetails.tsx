"use client";

import React from "react";

const SERVICE_HISTORY_TYPES = [
  "Full service history (FSH)",
  "Full dealer service history (FDSH)",
  "Full independent service history",
  "Partial service history",
  "Digital service history",
  "Not sure",
];

const RECORD_AVAILABILITY = [
  "Yes, all records available",
  "Some records missing",
  "Records not available",
  "Not sure",
];

interface ServiceHistoryDetailsProps {
  show: boolean;
  register?: any; // Replace with RHF types
  watch?: any;
}

export function ServiceHistoryDetails({
  show,
  register,
  watch,
}: ServiceHistoryDetailsProps) {
  if (!show) return null;

  const historyType = watch?.("serviceHistoryType");

  return (
    <div>
      <h3>Service History Details</h3>

      {/* Service History Type */}
      <div>
        <p>What type of service history does the vehicle have?</p>
        {SERVICE_HISTORY_TYPES.map((type) => (
          <label key={type}>
            <input
              type="radio"
              value={type}
              {...register?.("serviceHistoryType")}
            />
            {type}
          </label>
        ))}
      </div>

      {/* Last Service Date */}
      <div>
        <p>When was the last service carried out? (optional)</p>
        <input type="month" {...register?.("lastServiceDate")} />
      </div>

      {/* Last Service Mileage */}
      <div>
        <p>Mileage at last service (optional)</p>
        <input
          type="number"
          placeholder="e.g. 85,000"
          {...register?.("lastServiceMileage")}
        />
      </div>

      {/* Service Records Availability */}
      <div>
        <p>Are all service records available?</p>
        {RECORD_AVAILABILITY.map((item) => (
          <label key={item}>
            <input
              type="radio"
              value={item}
              {...register?.("recordAvailability")}
            />
            {item}
          </label>
        ))}
      </div>

      {/* Additional Optional Notes */}
      <div>
        <p>Additional notes (optional)</p>
        <textarea
          rows={3}
          placeholder="Anything else you want to mention?"
          {...register?.("serviceHistoryNotes")}
        />
      </div>
    </div>
  );
}
