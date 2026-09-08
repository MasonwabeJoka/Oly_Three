"use client";

import {
  Calendar as ReactAriaCalendar,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
  Text,
  CalendarCell,
} from "react-aria-components";

import {
  parseDate,
  today,
  getLocalTimeZone,
  type DateValue,
} from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import styles from "./Calendar.module.scss";
import { useState } from "react";

interface CalendarProps {
  className?: string;
  id?: string;

  value?: DateValue | null;
  defaultValue?: DateValue | null;
  onChange?: (value: DateValue | null) => void;

  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;

  focusedValue?: DateValue | null;
  defaultFocusedValue?: DateValue | null;
 showToday?: boolean,
    showSelectedDate?: boolean,
  visibleDuration?: { months: number };
  numberOfMonths?: number;

  weeksInMonth?: number | undefined;

  firstDayOfWeek?: "sun" | "mon";

  weekdayStyle?: "narrow" | "short" | "long";

  navigationStep?: "single" | "visible";

  selectionAlignment?: "start" | "center" | "end";

  isDateUnavailable?: (date: DateValue) => boolean;

  createCalendar?: any;

  calendarSize?: "small" | "medium" | "large" | "xLarge";
  dashboard?: boolean;
}

const SIZE_CLASSES = {
  small: styles.smallCalendar,
  medium: styles.mediumCalendar,
  large: styles.largeCalendar,
  xLarge: styles.xLargeCalendar,
} as const;

const Calendar = (props: CalendarProps) => {
  const {
    className,

    value,
    defaultValue,
    onChange,

    isDisabled,
    isReadOnly,
    isInvalid,

    focusedValue,
    defaultFocusedValue,

    visibleDuration,
    numberOfMonths,
    showToday,
    showSelectedDate,
    weeksInMonth,
    firstDayOfWeek = "sun",
    weekdayStyle = "narrow",

    navigationStep = "single",
    selectionAlignment = "center",

    isDateUnavailable,
    createCalendar,

    calendarSize = "large",
    dashboard,
  } = props;
  const [date, setDate] = useState<DateValue | null>(null);
  const resolvedVisibleDuration =
    numberOfMonths != null
      ? { months: numberOfMonths }
      : (visibleDuration ?? { months: 1 });

  const pageBehavior = navigationStep === "single" ? "single" : "visible";

  const sizeClass = SIZE_CLASSES[calendarSize];

  const calendarProps = {
    value,
    defaultValue,
    onChange,

    isDisabled,
    isReadOnly,
    isInvalid,

    focusedValue,
    defaultFocusedValue,

    visibleDuration: resolvedVisibleDuration,
    weeksInMonth,
    firstDayOfWeek,
    showToday,
    showSelectedDate,
    pageBehavior,
    selectionAlignment,

    isDateUnavailable,
    createCalendar,
    weekdayStyle,
  };

  return (
    <ReactAriaCalendar
      {...calendarProps}
      className={[
        styles.calendar,
        sizeClass,
        dashboard ? styles.dashboard : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      value={date}
      onChange={setDate}
    >
      <CalendarHeading className={styles.calendarHeading} />

      <Button
        slot="previous"
        className={styles.previousButton}
        buttonShape="round"
      >
        <ChevronLeft />
      </Button>

      <Button slot="next" className={styles.nextButton} buttonShape="round">
        <ChevronRight />
      </Button>

      <CalendarGrid className={styles.calendarGrid} weeksInMonth={undefined}>
        <CalendarGridHeader className={styles.calendarGridHeader}>
          {(day) => (
            <CalendarHeaderCell className={styles.calendarHeaderCell}>
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>

        <CalendarGridBody className={styles.calendarGridBody}>
          {(cellDate) => (
            <CalendarCell
              date={cellDate}
              className={({ isToday, isSelected }) =>
                [
                  styles.calendarCell,
                  isToday && !date ? styles.today : "",
                  isSelected ? styles.selected : "",
                ]
                  .filter(Boolean)
                  .join(" ")
              }
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
     {showToday && (
  <p className={styles.todayText}>
    Today: {today(getLocalTimeZone()).toString()}
  </p>
)}

{showSelectedDate && date && (
  <p className={styles.selectedDateText}>
    Selected: {date.toString()}
  </p>
)}
      <Text slot="errorMessage" />
    </ReactAriaCalendar>
  );
};

export default Calendar;
