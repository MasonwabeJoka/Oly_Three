"use client";
import Button from "@/components/Buttons";
import styles from "./AuctionStartTimeClient.module.scss";
import { useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import Select from "@/components/Select";

const AuctionStartTimeClient = () => {
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<Date>();
  const today = new Date();
  const threeMonthsAhead = new Date(
    today.getFullYear(),
    today.getMonth() + 3,
    0
  );
  const [isAuctionStartTimeOpen, setIsAuctionStartTimeOpen] = useState(false);
  const [isAuctionDurationOpen, setIsAuctionDurationOpen] = useState(false);

  const onSelectOpen = () => {
    selectRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onAuctionStartTimeOpen = (isOpen: boolean) => {
    selectRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsAuctionStartTimeOpen(isOpen);
  };
  const onAuctionDurationOpen = (isOpen: boolean) => {
    selectRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsAuctionDurationOpen(isOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <DayPicker
          mode="single"
          animate
          defaultMonth={today}
          fromMonth={today}
          toMonth={threeMonthsAhead}
          selected={selected}
          onSelect={setSelected}
          required
          classNames={{
            root: styles.root,
            table: styles.table,
            head: styles.head,
            tbody: styles.body,
            row: styles.row,
            cell: styles.cell,
            head_cell: styles.daysOfWeek,
            caption_label: styles.monthContainer,
            nav: styles.nav,
            nav_button_next: `${styles.navButton} ${styles.nextMonthButton}`,
            nav_button_previous: `${styles.navButton} ${styles.prevMonthButton}`,
            day: styles.day,
            day_selected: styles.daySelected,
            day_today: styles.dayToday,
            day_outside: styles.dayOutside,
          }}
        />
      </div>
      <div className={styles.controls}>
        <div ref={selectRef} className={styles.setStartTimeContainer}>
          <Select
            className={styles.setStartTime}
            options={[
              { label: "05:00", value: "5am" },
              { label: "06:00", value: "6am" },
              { label: "07:00", value: "7am" },
              { label: "08:00", value: "8am" },
              { label: "09:00", value: "9am" },
              { label: "10:00", value: "10am" },
              { label: "11:00", value: "11am" },
              { label: "12:00", value: "12pm" },
              { label: "13:00", value: "1pm" },
              { label: "14:00", value: "2pm" },
              { label: "15:00", value: "3pm" },
              { label: "16:00", value: "4pm" },
              { label: "17:00", value: "5pm" },
              { label: "18:00", value: "6pm" },
              { label: "19:00", value: "7pm" },
              { label: "20:00", value: "8pm" },
              { label: "21:00", value: "9pm" },
              { label: "22:00", value: "10pm" },
              { label: "23:00", value: "11pm" },
              { label: "00:00", value: "12am" },
              { label: "01:00", value: "1am" },
              { label: "02:00", value: "2am" },
              { label: "03:00", value: "3am" },
              { label: "04:00", value: "4am" },
            ]}
            initialValue="Auction Start Time"
            selectSize="large"
            selectPrompt="Start Time"
            label="Auction Start Time"
            id="startTime"
            ariaLabel="Auction Start Time"
            autoFocus={false}
            autoComplete="off"
            disabled={false}
            required={true}
            dashboard
            onDropdownOpenChange={onAuctionStartTimeOpen}
          />
        </div>
        {!isAuctionStartTimeOpen && (
          <div ref={selectRef} className={styles.auctionDurationContainer}>
            <Select
              className={styles.auctionDuration}
              options={[
                { label: "1 hour", value: "1h" },
                { label: "6 hours", value: "6h" },
                { label: "12 hours", value: "12h" },
                { label: "24 hours", value: "24h" },
                { label: "3 Days", value: "3d" },
                { label: "5 Days", value: "5d" },
                { label: "7 Days", value: "7d" },
                { label: "10 Days", value: "10d" },
                { label: "30 Days", value: "30d" },
                {
                  label: "Set your own duration",
                  value: "customDuration",
                },
              ]}
              initialValue="Auction Duration"
              selectSize="large"
              selectPrompt="Auction Duration"
              label="Auction Duration"
              id="auctionDuration"
              ariaLabel="Auction Duration"
              autoFocus={false}
              autoComplete="off"
              disabled={false}
              required={true}
              dashboard
              onDropdownOpenChange={onAuctionDurationOpen}
            />
          </div>
        )}
        {!isAuctionStartTimeOpen && !isAuctionDurationOpen && (
          <div className={styles.auctionStartButtonContainer}>
            <Button
              className={styles.auctionStartButton}
              buttonChildren="Accept"
              buttonType="primary"
              buttonSize="large"
              name="auction-start-btn"
              type="button"
              ariaLabel="Auction Start Button"
              autoFocus={false}
              disabled={false}
              dashboard
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionStartTimeClient;
