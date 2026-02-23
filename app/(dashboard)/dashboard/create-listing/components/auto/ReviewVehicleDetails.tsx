import Icon from "@/components/Icon";
import styles from "./ReviewVehicleDetails.module.scss";
import { vinResults } from "@/data/vinResults";

const ReviewVehicleDetails = () => {
  const data = vinResults[0];
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Vehicle Details</h1>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Base Information</h2>
          <div className={styles.editButtonContainer}>
            <Icon
              className={styles.editButton}
              src="/icons/pencil.png"
              alt="edit-icon"
              width={18}
              height={18}
            />
          </div>
        </div>
        <div className={styles.cardContent}>
          <p className={styles.cardItem}>Make: {data.vehicle.make}</p>
          <p className={styles.cardItem}>Model: {data.vehicle.model}</p>
          <p className={styles.cardItem}>Year: {data.vehicle.year}</p>
          <p className={styles.cardItem}>Trim: {data.vehicle.trim}</p>
          <p className={styles.cardItem}>
            Body Style: {data.vehicle.body_style}
          </p>
          <p className={styles.cardItem}>Doors: {data.vehicle.doors}</p>
          <p className={styles.cardItem}>
            Exterior Colour: {data.vehicle.exterior_color}
          </p>
          <p className={styles.cardItem}>
            Interior Colour: {data.vehicle.interior_color}
          </p>
           <p className={styles.cardItem}>
            Vehicle Type: {data.vehicle.vehicle_type}
          </p>
          {/* <p className={styles.cardItem}>
            Country of Origin: {data.vehicle.country_of_origin}
          </p> */}
         
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Engine</h2>
          <div className={styles.editButtonContainer}>
            <Icon
              className={styles.editButton}
              src="/icons/pencil.png"
              alt="edit-icon"
              width={18}
              height={18}
            />
          </div>
        </div>
        <div className={styles.cardContent}>
          <p className={styles.cardItem}>Type: {data.engine.type}</p>
          <p className={styles.cardItem}>Displacement: {data.engine.displacement}</p>
          <p className={styles.cardItem}>Cylinders: {data.engine.cylinders}</p>
          <p className={styles.cardItem}>Valves: {data.engine.valves}</p>
          <p className={styles.cardItem}>Horsepower: {data.engine.horsepower}</p>
          <p className={styles.cardItem}>Torque: {data.engine.torque}</p>
          <p className={styles.cardItem}>Fuel Type: {data.engine.fuel_type}</p>
          <p className={styles.cardItem}>Fuel System: {data.engine.fuel_system}</p>
          <p className={styles.cardItem}>Emissions Standard: {data.engine.emissions_standard}</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Transmission</h2>
          <div className={styles.editButtonContainer}>
            <Icon
              className={styles.editButton}
              src="/icons/pencil.png"
              alt="edit-icon"
              width={18}
              height={18}
            />
          </div>
        </div>
        <div className={styles.cardContent}>
          <p className={styles.cardItem}>Type: {data.transmission.type}</p>
          <p className={styles.cardItem}>Gears: {data.transmission.gears}</p>
          <p className={styles.cardItem}>Drive Type: {data.transmission.drive_type}</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Dimensions</h2>
          <div className={styles.editButtonContainer}>
            <Icon
              className={styles.editButton}
              src="/icons/pencil.png"
              alt="edit-icon"
              width={18}
              height={18}
            />
          </div>
        </div>
        <div className={styles.cardContent}>
          <p className={styles.cardItem}>Length: {data.dimensions.length}</p>
          <p className={styles.cardItem}>Width: {data.dimensions.width}</p>
          <p className={styles.cardItem}>Height: {data.dimensions.height}</p>
          <p className={styles.cardItem}>Wheelbase: {data.dimensions.wheelbase}</p>
          <p className={styles.cardItem}>Curb Weight: {data.dimensions.curb_weight}</p>
          <p className={styles.cardItem}>
            Gross Vehicle Weight Rating:{" "}
            {data.dimensions.gross_vehicle_weight_rating}
          </p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Safety Features</h2>
          <div className={styles.editButtonContainer}>
            <Icon
              className={styles.editButton}
              src="/icons/pencil.png"
              alt="edit-icon"
              width={18}
              height={18}
            />
          </div>
        </div>
        <div className={styles.cardContent}>
          <p className={styles.cardItem}>Airbags:</p>
          <ul className={styles.itemList}>
            {data.safety_features.airbags.map((airbag, index) => (
              <li key={index} className={styles.subItem}>{airbag}</li>
            ))}
          </ul>
          <p className={styles.cardItem}>Brakes: {data.safety_features.brakes}</p>
          <p className={styles.cardItem}>
            Stability Control:{" "}
            {data.safety_features.stability_control ? "Yes" : "No"}
          </p>
          <p className={styles.cardItem}>
            Traction Control:{" "}
            {data.safety_features.traction_control ? "Yes" : "No"}
          </p>
          <p className={styles.cardItem}>
            Tire Pressure Monitoring:{" "}
            {data.safety_features.tire_pressure_monitoring ? "Yes" : "No"}
          </p>
          <p className={styles.cardItem}>Crash Test Ratings:</p>
          <ul className={styles.itemList}>
            <li className={styles.subItem}>
              Overall: {data.safety_features.crash_test_ratings.nhtsa_overall}
            </li>
            <li className={styles.subItem}>
              Frontal: {data.safety_features.crash_test_ratings.nhtsa_frontal}
            </li>
            <li className={styles.subItem}>Side: {data.safety_features.crash_test_ratings.nhtsa_side}</li>
            <li className={styles.subItem}>
              Rollover: {data.safety_features.crash_test_ratings.nhtsa_rollover}
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Fuel Economy</h2>
          <div className={styles.editButtonContainer}>
            <Icon
              className={styles.editButton}
              src="/icons/pencil.png"
              alt="edit-icon"
              width={18}
              height={18}
            />
          </div>
        </div>
        <div className={styles.cardContent}>
          <p className={styles.cardItem}>City MPG: {data.fuel_economy.city_mpg}</p>
          <p className={styles.cardItem}>Highway MPG: {data.fuel_economy.highway_mpg}</p>
          <p className={styles.cardItem}>Combined MPG: {data.fuel_economy.combined_mpg}</p>
          <p className={styles.cardItem}>Annual Fuel Cost: ${data.fuel_economy.annual_fuel_cost}</p>
          <p className={styles.cardItem}>Fuel Tank Capacity: {data.fuel_economy.fuel_tank_capacity}</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Warranty</h2>
          <div className={styles.editButtonContainer}>
            <Icon
              className={styles.editButton}
              src="/icons/pencil.png"
              alt="edit-icon"
              width={18}
              height={18}
            />
          </div>
        </div>
        <div className={styles.cardContent}>
          <p className={styles.cardItem}>Basic: {data.warranty.basic}</p>
          <p className={styles.cardItem}>Powertrain: {data.warranty.powertrain}</p>
          <p className={styles.cardItem}>Corrosion: {data.warranty.corrosion}</p>
          <p className={styles.cardItem}>Roadside Assistance: {data.warranty.roadside_assistance}</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Recalls</h2>
          <div className={styles.editButtonContainer}>
            <Icon
              className={styles.editButton}
              src="/icons/pencil.png"
              alt="edit-icon"
              width={18}
              height={18}
            />
          </div>
        </div>
        <div className={styles.cardContent}>
          {data.recalls.map((recall, index) => (
            <div key={index} className={styles.recallItem}>
              <p className={styles.cardItem}>Recall ID: {recall.recall_id}</p>
              <p className={styles.cardItem}>Date: {recall.date}</p>
              <p className={styles.cardItem}>Description: {recall.description}</p>
              <p className={styles.cardItem}>Affected Components: {recall.affected_components}</p>
              <p className={styles.cardItem}>Remedy: {recall.remedy}</p>
              <p className={styles.cardItem}>Status: {recall.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Additional Info</h2>
          <div className={styles.editButtonContainer}>
            <Icon
              className={styles.editButton}
              src="/icons/pencil.png"
              alt="edit-icon"
              width={18}
              height={18}
            />
          </div>
        </div>
        <div className={styles.cardContent}>
          <p className={styles.cardItem}>VIN Breakdown:</p>
          <ul className={styles.itemList}>
            <li className={styles.subItem}>WMI: {data.additional_info.vin_breakdown.wmi}</li>
            <li className={styles.subItem}>VDS: {data.additional_info.vin_breakdown.vds}</li>
            <li className={styles.subItem}>VIS: {data.additional_info.vin_breakdown.vis}</li>
          </ul>
          <p className={styles.cardItem}>MSRP: ${data.additional_info.msrp}</p>
          <p className={styles.cardItem}>Current Market Value:</p>
          <ul className={styles.itemList}>
            <li className={styles.subItem}>Low: ${data.additional_info.current_market_value.low}</li>
            <li className={styles.subItem}>Average: ${data.additional_info.current_market_value.average}</li>
            <li className={styles.subItem}>High: ${data.additional_info.current_market_value.high}</li>
          </ul>
          <p className={styles.cardItem}>
            Odometer Reading: {data.additional_info.odometer_reading ?? "N/A"}
          </p>
          <p className={styles.cardItem}>Title Status: {data.additional_info.title_status}</p>
        </div>
      </div> */}

      {/* <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>General</h2>
          <div className={styles.editButtonContainer}>
            <Icon
              className={styles.editButton}
              src="/icons/pencil.png"
              alt="edit-icon"
              width={18}
              height={18}
            />
          </div>
        </div>
        <div className={styles.cardContent}>
          <p className={styles.cardItem}>VIN: {data.vin}</p>
          <p className={styles.cardItem}>Status: {data.status}</p>
          <p className={styles.cardItem}>Message: {data.message}</p>
          <p className={styles.cardItem}>Timestamp: {data.timestamp}</p>
          <p className={styles.cardItem}>Source: {data.source}</p>
        </div>
      </div> */}
    </div>
  );
};

export default ReviewVehicleDetails;