"use client";
import styles from "./VehicleAccidentDetails.module.scss";
// https://chatgpt.com/share/6924bd88-1ffc-800f-a0be-697a7be3638b

const ACCIDENT_TYPES = [
  "Minor body damage",
  "Moderate damage",
  "Structural or major repair",
  "Cosmetic only",
  "Not sure",
];

const AFFECTED_AREAS = [
  "Front",
  "Rear",
  "Left side",
  "Right side",
  "Roof",
  "Underbody",
  "Multiple areas",
  "Not sure",
];

const REPAIR_STATUS = [
  "Yes, professionally repaired",
  "Yes, repaired but not professionally",
  "No, still damaged",
  "Not sure",
];

const REPAIR_QUALITY = [
  "Excellent condition",
  "Good condition",
  "Fair condition",
  "Needs attention",
  "Not sure",
];

const VISIBLE_ISSUES = [
  "Scratches",
  "Dents",
  "Paint mismatch",
  "Panel gaps",
  "Warning lights",
  "Unusual noises",
  "No visible issues",
];

const INSURANCE_OPTIONS = [
  "Yes, claimed",
  "No claim made",
  "Not sure",
];

interface AccidentDetailsProps {
  show: boolean;
  register?: any; // replace with RHF's proper type
  watch?: any;    // if needed
}

export function AccidentDetails({ show, register, watch }: AccidentDetailsProps) {
  if (!show) return null;

  const repairStatus = watch?.("repairStatus");

  return (
    <div>
      <h3>Accident Details</h3>

      {/* Accident Type */}
      <div>
        <p>What type of accident was it?</p>
        {ACCIDENT_TYPES.map((type) => (
          <label key={type}>
            <input
              type="radio"
              value={type}
              {...register?.("accidentType")}
            />
            {type}
          </label>
        ))}
      </div>

      {/* Affected Areas */}
      <div>
        <p>Which areas were affected?</p>
        {AFFECTED_AREAS.map((area) => (
          <label key={area}>
            <input
              type="checkbox"
              value={area}
              {...register?.("affectedAreas")}
            />
            {area}
          </label>
        ))}
      </div>

      {/* Repair Status */}
      <div>
        <p>Was the vehicle repaired?</p>
        {REPAIR_STATUS.map((status) => (
          <label key={status}>
            <input
              type="radio"
              value={status}
              {...register?.("repairStatus")}
            />
            {status}
          </label>
        ))}
      </div>

      {/* Repair Quality — only show if "repaired" */}
      {(repairStatus?.includes("Yes")) && (
        <div>
          <p>How would you rate the repair quality?</p>
          {REPAIR_QUALITY.map((quality) => (
            <label key={quality}>
              <input
                type="radio"
                value={quality}
                {...register?.("repairQuality")}
              />
              {quality}
            </label>
          ))}
        </div>
      )}

      {/* Visible Issues */}
      <div>
        <p>Are there any visible issues?</p>
        {VISIBLE_ISSUES.map((issue) => (
          <label key={issue}>
            <input
              type="checkbox"
              value={issue}
              {...register?.("visibleIssues")}
            />
            {issue}
          </label>
        ))}
      </div>

      {/* Insurance Claim */}
      <div>
        <p>Was an insurance claim made?</p>
        {INSURANCE_OPTIONS.map((option) => (
          <label key={option}>
            <input
              type="radio"
              value={option}
              {...register?.("insuranceClaim")}
            />
            {option}
          </label>
        ))}
      </div>

      {/* Optional claim date */}
      {watch?.("insuranceClaim") === "Yes, claimed" && (
        <div>
          <p>Claim date (optional)</p>
          <input type="month" {...register?.("claimDate")} />
        </div>
      )}

      {/* Optional description */}
      <div>
        <p>Briefly describe what happened (optional)</p>
        <textarea
          rows={3}
          placeholder="Short description"
          {...register?.("accidentDescription")}
        />
      </div>

      {/* Optional photo uploads */}
      <div>
        <p>Upload photos (optional)</p>
        <input type="file" multiple {...register?.("accidentPhotos")} />
      </div>
    </div>
  );
}
