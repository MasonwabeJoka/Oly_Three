"use client";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Input from "./Input";
import Tabs from "./Tabs";
import styles from "./VehicleMake.module.scss";
import VehicleMakeCard from "./cards/VehicleMakeCard";
import { vehicleMakeData } from "@/data/vehicleMakeData";
import Pill from "./Pill";
const VehicleMake = () => {
  const suggestions = [];
  const pills = [
    "Lexus",
    "Ford",
    "Suzuki",
    "Wolkswagen",
    // "Toyota",
    // "Chevrolet",
    // "Range Rover",
    // "Renault",
    // "Tesla",
    // "Porsche",
    // "Mercedes-Benz",
    // "Toyota",
    // "BMW",
  ];

  // const pills = []
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Search By Make</h2>

      <div className={styles.searchContainer}>
        <Input
          isSearchBar={true}
          className={styles.searchLocationInput}
          inputType="text"
          inputSize="large"
          iconSrcRight="/icons/search.png"
          iconPosition="right"
          iconWidth={32}
          iconHeight={32}
          label="Search"
          placeholder="Find your car brand..."
          id="locationSearch"

          ariaLabel="Location"

          autoComplete="off"
          required
        />
      </div>

      <div className={styles.pillsContainer}>
        {pills && (
          <div className={styles.pillsWrapper}>
            <div className={styles.pills}>
              {pills.map((pill) => (
                <div key={pill}>
                  <Pill
                    colour="#f9fcfd"
                    child={pill}
                    shadow={true}
                    cancelButton={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.checkboxContainer}>
          <Checkbox
            id="1"
            label="Select All"
            labelSide="left"
            isFeed={false}
            checkedColour="#14d6ff"
            hoverColour="#ffff"
            checkedHovered="#ccf6ff"
          />
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.cardsContainer}>
          {vehicleMakeData.map((item) => {
            return (
              <div key={item.id} className={styles.cardContainer}>
                <VehicleMakeCard
                  key={item.id}
                  name={item.name}
                  logo={item.logo}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.searchButton}>
        <Button
          children="Search"
          className={styles.search}
          buttonVariant="primary"
          buttonSize="large"

          type="submit"
          ariaLabel="Search Button"


        />
      </div>
    </div>
  );
};

export default VehicleMake;
