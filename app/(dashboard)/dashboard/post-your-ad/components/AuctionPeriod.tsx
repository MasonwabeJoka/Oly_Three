import styles from "./AuctionPeriod.module.scss";
import { useState } from "react";

import { DayPicker } from "react-day-picker";
// import "react-day-picker/style.css";

const AuctionPeriod = () => {
  const [selected, setSelected] = useState<Date>();
  return (
    <div className={styles.container}>
      <div>
        <DayPicker
          animate
          mode="single"
          selected={selected}
          onSelect={setSelected}
          timeZone="Africa/Johannesburg"
          required
          classNames={{
            root: styles.root,
            table: styles.table,
            head: styles.head,
            tbody: styles.body,
            row: styles.row,
            cell: styles.cell,
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
      {/* <div>Auction Duration</div> */}
    </div>
  );
};

export default AuctionPeriod;
