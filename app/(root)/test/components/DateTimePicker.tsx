// components/DateTimePicker.tsx

import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import styles from './DateTimePicker.module.scss';

const DateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('09:00');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };

  const formattedDate = selectedDate ? format(parseISO(selectedDate), 'MM/dd/yy') : '';
  const formattedTime = selectedTime ? format(parseISO(`1970-01-01T${selectedTime}:00`), 'h:mm a') : '';

  return (
    <div className={styles.container}>
      <div className={styles.datePicker}>
        <label className={styles.label} htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className={styles.input}
        />
        {selectedDate && <span className={styles.display}>{formattedDate}</span>}
      </div>
      <div className={styles.timePicker}>
        <label htmlFor="time">Time</label>
        <input
          id="time"
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
          className={styles.input}
        />
        {selectedTime && <span className={styles.display}>{formattedTime}</span>}
      </div>
    </div>
  );
};

export default DateTimePicker;
