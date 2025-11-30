"use client";
import styles from "./VehicleModifications.module.scss";
import { useState } from "react";

//https://chatgpt.com/share/6924bd88-1ffc-800f-a0be-697a7be3638b

const MOD_CATEGORIES = [
  "Engine tuning / remap",
  "Exhaust system",
  "Intake / air filter upgrades",
  "Suspension / lowering / lift kit",
  "Wheels / tyres",
  "Brakes",
  "Body kit / exterior styling",
  "Interior trim changes",
  "Added electronics (sound system, infotainment, lights)",
  "Performance enhancements",
  "Cosmetic enhancements (vinyl wrap, tinting, badges)",
  "Tow bar installation",
  "Security system changes",
  "Other",
];

export default function ModificationsSection() {
  const [hasMods, setHasMods] = useState<"yes" | "no" | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [installer, setInstaller] = useState("");
  const [certified, setCertified] = useState("");
  const [reversible, setReversible] = useState("");
  const [performanceChange, setPerformanceChange] = useState("");
  const [warranty, setWarranty] = useState("");
  const [legalIssues, setLegalIssues] = useState("");
  const [recency, setRecency] = useState("");
  const [repairRelated, setRepairRelated] = useState("");
  const [repairDescription, setRepairDescription] = useState("");

  const toggleCategory = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <section>
      <h2>Modifications</h2>

      {/* Has Modifications? */}
      <div>
        <p>Has the vehicle been modified?</p>

        <label>
          <input
            type="radio"
            name="hasMods"
            value="yes"
            checked={hasMods === "yes"}
            onChange={() => setHasMods("yes")}
          />
          Yes
        </label>

        <label>
          <input
            type="radio"
            name="hasMods"
            value="no"
            checked={hasMods === "no"}
            onChange={() => setHasMods("no")}
          />
          No
        </label>
      </div>

      {/* Only show the rest if YES */}
      {hasMods === "yes" && (
        <div>
          {/* Categories */}
          <div>
            <p>Which areas have been modified?</p>
            {MOD_CATEGORIES.map((cat) => (
              <label key={cat}>
                <input
                  type="checkbox"
                  checked={categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>

          {/* Description */}
          <div>
            <p>Please describe the modification(s)</p>
            <textarea
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
            />
          </div>

          {/* Installer */}
          <div>
            <p>Who installed the modifications?</p>

            <label>
              <input
                type="radio"
                name="installer"
                value="professional"
                checked={installer === "professional"}
                onChange={() => setInstaller("professional")}
              />
              Professionally installed
            </label>

            <label>
              <input
                type="radio"
                name="installer"
                value="diy"
                checked={installer === "diy"}
                onChange={() => setInstaller("diy")}
              />
              DIY / self-installed
            </label>

            <label>
              <input
                type="radio"
                name="installer"
                value="unknown"
                checked={installer === "unknown"}
                onChange={() => setInstaller("unknown")}
              />
              Not sure
            </label>
          </div>

          {/* Certification */}
          <div>
            <p>Are the modifications certified or compliant?</p>

            <label>
              <input
                type="radio"
                name="certified"
                value="yes-docs"
                checked={certified === "yes-docs"}
                onChange={() => setCertified("yes-docs")}
              />
              Yes — I have paperwork
            </label>

            <label>
              <input
                type="radio"
                name="certified"
                value="yes-nodocs"
                checked={certified === "yes-nodocs"}
                onChange={() => setCertified("yes-nodocs")}
              />
              Yes — but no paperwork
            </label>

            <label>
              <input
                type="radio"
                name="certified"
                value="no"
                checked={certified === "no"}
                onChange={() => setCertified("no")}
              />
              No
            </label>

            <label>
              <input
                type="radio"
                name="certified"
                value="na"
                checked={certified === "na"}
                onChange={() => setCertified("na")}
              />
              Not applicable
            </label>
          </div>

          {/* Reversible */}
          <div>
            <p>Can the modifications be reversed?</p>

            <label>
              <input
                type="radio"
                name="reversible"
                value="yes"
                checked={reversible === "yes"}
                onChange={() => setReversible("yes")}
              />
              Yes
            </label>

            <label>
              <input
                type="radio"
                name="reversible"
                value="no"
                checked={reversible === "no"}
                onChange={() => setReversible("no")}
              />
              No
            </label>

            <label>
              <input
                type="radio"
                name="reversible"
                value="partial"
                checked={reversible === "partial"}
                onChange={() => setReversible("partial")}
              />
              Partially
            </label>
          </div>

          {/* Performance impact */}
          <div>
            <p>Have the modifications affected performance?</p>

            <label>
              <input
                type="radio"
                name="performanceChange"
                value="improved"
                checked={performanceChange === "improved"}
                onChange={() => setPerformanceChange("improved")}
              />
              Increased performance
            </label>

            <label>
              <input
                type="radio"
                name="performanceChange"
                value="no-change"
                checked={performanceChange === "no-change"}
                onChange={() => setPerformanceChange("no-change")}
              />
              No noticeable change
            </label>

            <label>
              <input
                type="radio"
                name="performanceChange"
                value="unsure"
                checked={performanceChange === "unsure"}
                onChange={() => setPerformanceChange("unsure")}
              />
              Not sure
            </label>
          </div>

          {/* Warranty */}
          <div>
            <p>Did these modifications impact the manufacturer warranty?</p>

            <label>
              <input
                type="radio"
                name="warranty"
                value="yes"
                checked={warranty === "yes"}
                onChange={() => setWarranty("yes")}
              />
              Yes
            </label>

            <label>
              <input
                type="radio"
                name="warranty"
                value="no"
                checked={warranty === "no"}
                onChange={() => setWarranty("no")}
              />
              No
            </label>

            <label>
              <input
                type="radio"
                name="warranty"
                value="unsure"
                checked={warranty === "unsure"}
                onChange={() => setWarranty("unsure")}
              />
              Not sure
            </label>
          </div>

          {/* Legal */}
          <div>
            <p>Are any modifications potentially illegal or non-standard?</p>

            <label>
              <input
                type="radio"
                name="legalIssues"
                value="yes"
                checked={legalIssues === "yes"}
                onChange={() => setLegalIssues("yes")}
              />
              Yes
            </label>

            <label>
              <input
                type="radio"
                name="legalIssues"
                value="no"
                checked={legalIssues === "no"}
                onChange={() => setLegalIssues("no")}
              />
              No
            </label>

            <label>
              <input
                type="radio"
                name="legalIssues"
                value="unsure"
                checked={legalIssues === "unsure"}
                onChange={() => setLegalIssues("unsure")}
              />
              Not sure
            </label>
          </div>

          {/* Recency */}
          <div>
            <p>When were these modifications done?</p>

            <select
              value={recency}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setRecency(e.target.value)
              }
            >
              <option value="">Select...</option>
              <option value="0-6">Within the last 6 months</option>
              <option value="6-12">6–12 months ago</option>
              <option value="1-3">1–3 years ago</option>
              <option value="3+">Over 3 years ago</option>
            </select>
          </div>

          {/* Repairs */}
          <div>
            <p>Were the modifications done along with repair work?</p>

            <label>
              <input
                type="radio"
                name="repairRelated"
                value="yes"
                checked={repairRelated === "yes"}
                onChange={() => setRepairRelated("yes")}
              />
              Yes
            </label>

            <label>
              <input
                type="radio"
                name="repairRelated"
                value="no"
                checked={repairRelated === "no"}
                onChange={() => setRepairRelated("no")}
              />
              No
            </label>

            {repairRelated === "yes" && (
              <div>
                <p>Please describe the repair work</p>
                <textarea
                  value={repairDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setRepairDescription(e.target.value)
                  }
                />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
