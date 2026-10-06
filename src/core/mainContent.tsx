import React, {
  cloneElement,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from 'react';

import style from '../main.module.css';
import { ESteps } from '../persianDatePicker/enum';
import {
  AdditionalElementType,
  HandleParams,
  ITime,
  ITimeZone,
} from '../persianDatePicker/type';
import Manual from './manual';
import PeriodList from './periodList';
import {
  ExportType,
  IDate,
  TLocale,
} from './type';

export interface IMainContentProps {
  step: ESteps;
  zone: ITimeZone;
  value: IDate;
  defaultValue: IDate;
  locale: TLocale;
  setStep: Dispatch<SetStateAction<ESteps>>;
  setZone: Dispatch<SetStateAction<ITimeZone>>;
  setCompareDate: Dispatch<SetStateAction<IDate | null>>;
  onChange: (e: HandleParams) => void;
  exportType?: ExportType;
  setCounter: Dispatch<SetStateAction<number>>;
  activeCompareStep: ESteps | null;
  setActiveCompareStep: Dispatch<SetStateAction<ESteps | null>>;
  showComparison: boolean;
  periodClassName: string;
  primaryColor: string;
  highlightColor: string;
  accentColor: string;
  tertiaryColor: string;
  neutralColor: string;
  setCustomData: Dispatch<SetStateAction<unknown>>;
  onError?: (e: string) => void;
  additionalElement?: AdditionalElementType[];
  periodListClassName: string;
  tabClassName: string;
  setType?: Dispatch<SetStateAction<string>>;
  activeTable?: "Day" | "Week" | "Month" | "Year" | "manual";
  monthPickerClassName?: string;
}
interface ITab {
  key: ITime;
  label: string;
  content: ReactNode;
}

const MainContent = ({ ...props }: IMainContentProps) => {
  const {
    onError,
    additionalElement = [],
    periodListClassName,
    tabClassName,
    accentColor,
    locale = "fa",
    setStep,
    setZone,
    setActiveCompareStep,
    setCompareDate,
    setCounter,
    setCustomData,
    setType,
    activeTable = "manual",
    activeCompareStep,
    value,
    defaultValue,
    highlightColor,
    neutralColor,
    onChange,
    periodClassName,
    primaryColor,
    showComparison,
    step,
    tertiaryColor,
    zone,
    monthPickerClassName,
    exportType,
  } = props;

  const brandAccent = accentColor || primaryColor;

  const [activeTab, setActiveTab] = useState<string>(activeTable);
  const handleTabChange = (key: ITab["key"]) => {
    setActiveTab(key);
  };
  const handleChange = (key: ITab["key"], value: any) => {
 
    const defaultKeys = [
      "day",
      "week",
      "month",
      "season",
      "year",
      "manual",
      "range",
    ];
    if (!defaultKeys.includes(key)) {
      setActiveCompareStep?.(null);
      setCompareDate?.(null);
      setCounter?.(0);
      setStep?.(ESteps[key as keyof typeof ESteps]);
      setZone?.("manual");
      setStep?.(ESteps.custom);
      setCustomData(value);
      setType?.(key);
      onChange?.({
        type: key,
        Data: value as Record<string, unknown>,
      });
    } else {
      setType?.("range");
      setCustomData(null);
      if (key === "manual") {
        onChange?.(value as HandleParams);
      } else {
        // PeriodList emits HandleParams with Data: { date: IDate }.
        // Older callers may still pass a bare IDate as Data — wrap once only.
        const incoming = value as HandleParams;
        const data = incoming?.Data;
        const alreadyWrapped =
          !!data &&
          typeof data === "object" &&
          "date" in data &&
          (data as { date?: unknown }).date != null &&
          typeof (data as { date: unknown }).date === "object" &&
          "from" in ((data as { date: object }).date as object);

        onChange?.({
          type: key,
          Data: alreadyWrapped
            ? (data as { date: IDate })
            : { date: data as unknown as IDate },
        } as HandleParams);
      }
    }
  };
  const otherProps = {
    accentColor: brandAccent,
    activeCompareStep,
    value,
    defaultValue,
    highlightColor,
    locale,
    neutralColor,
    onChange,
    periodClassName,
    primaryColor,
    setActiveCompareStep,
    setCompareDate,
    setCounter,
    setStep,
    setZone,
    showComparison,
    step,
    tertiaryColor,
    zone,
    onError,
    monthPickerClassName,
    exportType
  };

  const tabs: ITab[] = [
    {
      key: "day",
      label: locale == "fa" ? "روز" : "day",
      content: <PeriodList {...otherProps} componentStep={ESteps.day} />,
    },
    {
      key: "week",
      label: locale == "fa" ? "هفته" : "week",
      content: <PeriodList {...otherProps} componentStep={ESteps.week} />,
    },
    {
      key: "month",
      label: locale == "fa" ? "ماه" : "month",
      content: <PeriodList {...otherProps} componentStep={ESteps.month} />,
    },
    {
      key: "year",
      label: locale == "fa" ? "سال" : "year",
      content: <PeriodList {...otherProps} componentStep={ESteps.year} />,
    },
    {
      key: "manual",
      label: locale == "fa" ? "دستی" : "manual",
      content: <Manual {...otherProps} componentStep={ESteps.manual} />,
    },
    ...additionalElement,
  ];
  const currentTab = tabs.find((tab) => tab.key === activeTab);
  return (
    <div
      dir={locale == "fa" ? "rtl" : "ltr"}
      className={`${style.flex} ${style.flex_col} ${style.xs_flex_row} ${style.gap_2} ${style.p_2} ${style["xs_h-[calc(100%-52px)]"]} `}
    >
      <div
        className={`${style.flex} ${style.xs_flex_col} ${style.border_b} ${
          style.xs_w_28
        }
 ${style.w_full} ${style.xs_overflow_y_auto} 
   ${style.rprp_scrollbar}
        ${style.xs_h_full} ${style.justify_around} ${style.gap_2} ${style.p_2}  
        ${style.overflow_x_auto} 
              ${locale !== "fa" ? style.xs_border_r : style.xs_border_l}
                  
      ${tabClassName}
        `}
        style={{ maxWidth: "430px" }}
      >
        {tabs.map((tab) => (
          <button
            style={{
              color: activeTab === tab.key ? brandAccent : "",
              // border: activeTab === tab.key ? brandAccent : "",
            }}
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            type="button"
            className={`
              ${style.border_none}
              ${style.py_1}
              ${style.rounded_md}
              ${periodListClassName} 
              ${style.font_medium} ${style.text_right} ${style.text_nowrap} ${
                style.text_sm
              } 
              ${
                activeTab === tab.key
                  ? locale === "fa"
                    ? `${style.border_b_2} ${style.xs_border_r_2}`
                    : `${style.border_b_2} ${style.xs_border_l_2}`
                  : `${style.text_gray_500} ${style.hover_text_gray_700}`
              }
              ${style.flex} ${style.justify_center} ${style.xs_justify_start} ${
                style.xs_gap_3
              } ${style.items_center}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className={`
  ${style.flex} 
  ${style.flex_col} 
  ${style.gap_4}
  ${style.xs_p_2} 
  ${style.w_full} 
  ${style.overflow_y_auto}
  ${style.rprp_scrollbar}
`}
      >
        {currentTab &&
          (() => {
            return cloneElement(
              currentTab.content as React.ReactElement<{
                onChange: (value: unknown) => void;
              }>,
              {
                onChange: (value: unknown) =>
                  handleChange(currentTab.key, value),
              },
            );
          })()}
      </div>
    </div>
  );
};

export default MainContent;
