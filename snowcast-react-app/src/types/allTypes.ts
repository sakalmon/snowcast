export type IIconCode = '01d' | '01n' | '02d' | '02n' | '03d' | '03n' | '04d'
  | '04n' | '09d' | '09n' | '10d' | '10n' | '11d' | '11n' | '13d' | '13n'
  | '50d' | '50n';

export type ITempUnit = 'C' | 'F';

export type IHeightUnit = 'mm' | 'Inches';

export interface IResortData {
  name: string;
  details: IResortDetails;
  forecast: IForecast;
}

export interface IHourlySnowFall {
  time: number;
  snow: number;
}

export interface ITimeFormattedHourlySnowFall {
  time: string;
  snow: number;
}

export interface IForecast extends ISnowFall {
  currentTemp: number;
  iconCode: IIconCode;
  weatherDesc: string;
}

export interface ISnowFall {
  snowToday: number;
  hourlySnow: ITimeFormattedHourlySnowFall[];
  eightDaySnowFall: number;
}

export interface IResortDetails {
  lat: number;
  lon: number;
  country: string;
  flag: string;
}

export interface IOpenW {
  lat: number;
  lon: number;
  current: IOpenWCurrent;
  hourly: IOpenWHourly[];
  daily: IOpenWDaily[];
}

export interface IOpenWCurrent {
  dt: number;
  temp: number;
  weather: {
    icon: IIconCode;
    description: string;
  }[];
}

export interface IOpenWDaily {
  dt: number;
  temp: number;
  weather: { icon: IIconCode }[];
  snow?: number;
}

export interface IOpenWHourly {
  dt: number;
  temp: number;
  weather: { icon: IIconCode }[];
  snow?: { 
    '1h': number;
  };
}

export interface IBaseProps {
  resortName: string;
  country: string;
  currentTemp: number;
  eightDaySnow: string;
  iconCode: IIconCode;
  flag: string;
}
  
export interface ISearchResultProps extends IBaseProps {
  snowFall: string;
  hourlySnow?: IHourlySnowFall[];
}
    
export interface IResortObjProps extends IBaseProps {
  snowFallToday: string;
  hourlySnow?: IHourlySnowFall;
}

export interface IResortForecast extends IBaseProps {
  snowToday: string;
  hourlySnow: IHourlySnowFall[];
}

export interface IOpenC {
  results: IOpenCResult[];
}

export interface IOpenCResult {
  annotations: { flag: string };
  components: { country: string };
  formatted: string;
  geometry: {
    lat: number;
    lng: number;
  }
}

export interface ITemp {
  unit: ITempUnit;
  setUnit: React.Dispatch<React.SetStateAction<'C' | 'F'>>;
}

export interface IHeight {
  unit: IHeightUnit;
  setUnit: React.Dispatch<React.SetStateAction<'mm' | 'Inches'>>;
}

export interface IUnitContext {
  temp: {
    unit: 'C' | 'F';
    setUnit: React.Dispatch<React.SetStateAction<'C' | 'F'>>;
  };
  height: {
    unit: 'mm' | 'Inches';
    setUnit: React.Dispatch<React.SetStateAction<'mm' | 'Inches'>>;
  };
}

