// =========================
// Imports
// =========================
import type {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
} from 'react';

import type {
  IDate,
  TLocale,
} from '../core/type';
import {
  CalendarViews,
  ESteps,
} from './enum';

// =========================
// Base Types
// =========================
export type DateValue =
  | IDate // RANGE
  | number
  | string // Single date
  | number[]
  | string[]
  | null; // Multiple date

export type ExportType = "timeStamp" | "IsoString";
/** @see ExportType in core/type — timeStamp (Unix ms) and IsoString (ISO 8601) are both industry-standard. */
export type CalendarType = "jalali" | "gregorian";

export interface ColorProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  tertiaryColor?: string;
  dangerColor?: string;
  backgroundColor?: string;
  highlightColor?: string;
  neutralColor?: string;
}

// =========================
// Calendar State
// =========================
export interface CalendarState {
  year: number;
  month: number;
  view: CalendarViews;
  hoveredDay: number | null;
  date: number | null;
  range: { from: number | null; to: number | null };
  mode: "date" | "range";
  multiple: number[];
}


// =========================
// Range Picker Props
// =========================
export type ActiveTable =
  | "Day"
  | "Week"
  | "Month"
  | "Year"
  | "manual"
  | (string & {});
export interface RangePickerProps extends Omit<CalendarProps, "onChange"> {
  buttonStyle?: React.CSSProperties
  renderPosition?: { offset?: number, align?: PopupAlign, position?: PopupPosition }
  isOpenDropdown?: boolean;
  additionalElement?: AdditionalElementType[];
  calendarType?: CalendarType;

  defaultValue?: IDate;
  value?: IDate | null;

  onChange?: (e: HandleParams) => void;
  onCompareDateChange?: (e: HandleParams) => void;
  onError?: (e: string) => void;

  onSubmit?: (e: HandleParams) => void;
  onReject?: () => void;

  isShowNavigationButton?: boolean;

  // Style
  primaryColor?: string;
  backgroundColor?: string;
  tertiaryColor?: string;
  accentColor?: string;
  neutralColor?: string;

  dateClassName?: string;
  buttonClassName?: string;
  periodClassName?: string;
  periodListClassName?: string;
  tabClassName?: string;
  monthPickerClassName?: string;

  dropdownWidth?: number;
  dropdownHeight?: number;

  label?: "Date" | "تاریخ" | boolean;
  className?: string;
  disabled?: boolean;
  highlightColor?: string;

  showComparison?: boolean;
  activeTable?:ActiveTable;
}

// =========================
// Custom Switch
// =========================
export interface CustomSwitchProps {
  checked: boolean;
  disabled?: boolean;
  onChange?: () => void;
  className?: string;
  ariaLabel?: string;
}

// =========================
// Popup Position Hook Options
// =========================

export type PopupPosition = 'auto' | 'top' | 'bottom';
export type PopupAlign = 'start' | 'center' | 'end';
export interface UseRenderPositionOptionsProps<T extends HTMLElement> {
  buttonRef: RefObject<T>;
  popupRef: RefObject<T>;
  offset?: number;
  onClickOutSide?: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  position?: PopupPosition;
  align?: PopupAlign;
}

// =========================
// Manual Component Props
// =========================
export interface IManualProps extends Omit<CalendarProps, "onChange"> {
  step: ESteps;
  componentStep: ESteps;
  activeCompareStep: ESteps | null;

  zone: ITimeZone;
  setZone: Dispatch<SetStateAction<ITimeZone>>;

  value: IDate;
  defaultValue: IDate;

  locale: TLocale;

  setStep: Dispatch<SetStateAction<ESteps>>;
  setCompareDate: Dispatch<SetStateAction<IDate | null>>;
  setActiveCompareStep: Dispatch<SetStateAction<ESteps | null>>;

  onChange: (e: HandleParams) => void;
  onError?: (e: string) => void;

  showComparison: boolean;

  monthPickerClassName?: string;
  // Colors
  accentColor: string;
  neutralColor: string;
  primaryColor: string;
  tertiaryColor: string;
}

// =========================
// Calendar Props
// =========================
export interface CalendarProps extends ColorProps {
  manualContainerRef?: RefObject<HTMLDivElement>;

  model?: "range" | "date";
  value?: DateValue;
  defaultValue?: DateValue;
  locale?: TLocale;

  onChange?: (e: DateValue) => void;

  disablePreviousDays?: boolean;
  selectMultiple?: boolean;
  selectableCols?: boolean;
  exportType?: ExportType;
  calendarType?: CalendarType;

  // Render Props
  renderDayFn?: (
    day: { timestamp: number; currentMonth: boolean },
    index: number
  ) => ReactNode;

  renderDayStyle?: (args: {
    timestamp?: number;
    isSpecial?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
    isToday?: boolean;
    isInRange?: boolean;
    isFrom?: boolean;
    isTo?: boolean;
  }) => React.CSSProperties;

  renderColStyle?: (args: {
    isSelectedCol: boolean;
    name: string;
    index: number;
  }) => React.CSSProperties;

  renderDayContent?: (info: {
    day: string | number;
    timestamp: number;
    isSpecial: boolean;
  }) => ReactNode;

  renderColContent?: (info: { isSelectedCol: boolean; name: string }) => ReactNode;

  // Classes
  WeekHeaderClassName?: string;
  containerClassName?: string;
  datePickerHeaderClassName?: string;
  datePickerBodyClassName?: string;
  yearPickerClassName?: string;

  // Style overrides
  WeekHeaderStyle?: React.CSSProperties;
  calendarBaseWidth?: number;

  // Days config
  specialDays?: number[];
  disabledDays?: number[];
}

// =========================
// DatePicker Props
// =========================
/** Single-date picker output (timestamp ms or ISO string). */
export type DatePickerValue = number | string | null;

export interface DatePickerProps
  extends Omit<CalendarProps, "onChange" | "value" | "defaultValue" | "model">,
  Omit<TimePickerProps, "onChange" | "value" | "defaultValue"> {
  showTime?: boolean;
  chooseTodayClassName?: string;
  showTimeFormat?: string;
  isOpenDropdown?: boolean;
  isTodaySelectPreset?: boolean;
  showMask?: boolean;
  allowClear?: boolean;
  onClear?: () => void;

  value?: DatePickerValue;
  defaultValue?: DatePickerValue;
  /** Fires with timestamp or ISO string depending on `exportType`; `null` when cleared/invalid. */
  onChange?: (value: DatePickerValue) => void;
}

// =========================
// TimePicker Props
// =========================
export interface TimePickerProps extends ColorProps {
  defaultValue?: number | string | null;
  value?: number | string | null;

  /** Timestamp (ms) or ISO string based on `exportType`. */
  onChange?: (value: number | string | null) => void;

  calendarType?: CalendarType;
  className?: string;
  containerClassName?: string;

  Style?: React.CSSProperties;

  displayButtonCount?: number;
  icon?: ReactNode | null;

  format?: string;
  showNow?: boolean;
  showSecond?: boolean;

  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;

  disabled?: boolean;
  exportType?: ExportType;

  placeholder?: string | ReactNode | boolean;
  nowButtonClassName?: string;
  okButtonClassName?: string;
  timeButtonClassName?: string;
}

// =========================
// Time Sections
// =========================
export interface TimeSections {
  title?: string;
  value: { from: number; to: number };
  timeZone: ITimeZone;
  step: ESteps;
}

// =========================
// Mask Props (canonical definition in src/mask/types.ts)
// =========================
export type {
  MaskErrorTarget,
  MaskFontStyle,
  MaskInputValue,
  MaskMode,
  MaskOutputValue,
  MaskParts,
  MaskProps,
  MaskSegment,
} from '../mask/types';
export { MaskMode as MaskModeConst } from '../mask/types';

// =========================
// Desktop Time Picker
// =========================
export interface DesktopTimePickerProps extends ColorProps {
  defaultValue?: number;
  calendarType?: CalendarType;
  containerClassName?: string;

  displayButtonCount?: number;

  format?: string;

  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;

  onGetValue?: (e: number) => void;
  onChange?: (e: number) => void;

  showSecond?: boolean;
  /** Share with Footer `timeColumnsIdPrefix` so Now can scroll the same columns. */
  idPrefix?: string;
}

// =========================
// Time & Zone Types
// =========================
export type ITimeZone =
  | "today"
  | "yesterday"
  | "thisWeek"
  | "lastWeek"
  | "last7Days"
  | "7DayAgo"
  | "thisMonth"
  | "lastMonth"
  | "last30Days"
  | "1MonthAgo"
  | "lastThreeMonth"
  | "threeMonthsAgo"
  | "thisYear"
  | "lastYear"
  | "oneYearAgo"
  | "manual"
  | string;

export type ITime =
  | "Day"
  | "Week"
  | "Month"
  | "ThreeMonth"
  | "Year"
  | "manual"
  | string;

export type TUnit = "hour" | "minute" | "second";

// =========================
// Misc Types
// =========================
export type HandleParams = {
  type: string;
  Data?: { date: IDate; compareDate: IDate } | Record<string, unknown>;
};

export interface AdditionalElementType {
  key: string;
  label: string;
  content: ReactNode;
}

export interface NavigationProps {
  step: ESteps;
  zone: ITimeZone;
  onChange?: (e: HandleParams) => void
  buttonStyle?: React.CSSProperties

  setDate: Dispatch<SetStateAction<IDate>>;
  setCounter: Dispatch<SetStateAction<number>>;

  setCompareDate: Dispatch<SetStateAction<IDate | null>>;

  counter: number;
  compareDate: IDate | null;

  activeCompareStep: ESteps | null;
  locale: TLocale;
}

export interface ISubmittedData {
  date: IDate;
  compareDate: IDate | null;
  Data: unknown;
}

// =========================
// Calendar Reducer Actions
// =========================
export type CalendarAction =
  | { type: "SET_FROM"; payload: number | null }
  | { type: "SET_TO"; payload: number | null }
  | { type: "SET_DATE"; payload: number | null }
  | { type: "SET_RANGE"; payload: { from: number | null; to: number | null } }
  | { type: "SET_MULTIPLE"; payload: number }
  | { type: "SET_WEEK_DAYS"; payload: { multiple: number[] } }
  | { type: "SET_MULTIPLE_BY_ARRAY"; payload: { multiple: number[] } }
  | { type: "CHANGE_HOVERED_DAY"; payload: number | null }
  | { type: "HOVER"; payload: any }
  | { type: "CHANGE_YEAR"; payload: number }
  | {
      type: "SYNC_VALUE";
      payload: {
        year?: number;
        month?: number;
        date?: number | null;
        range?: { from: number | null; to: number | null };
        multiple?: number[];
      };
    }
  | { type: "SHIFT_YEAR"; payload: number }
  | { type: "SHIFT_MONTH"; payload: { year: number; month: number } }
  | { type: "CHANGE_MONTH"; payload: number }
  | { type: "CHANGE_VIEW"; payload: CalendarViews }
  | { type: "RESET" }
  | { type: "RESET_RANGE" };
