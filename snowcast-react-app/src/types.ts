export interface IBaseProps {
  resortName: string;
  country: string;
  currentTemp: number;
  eightDaySnowFall: string;
  iconCode: IiconCode;
  flag: string;
}

export interface IHourlySnowFall {
    time: string;
    hourSnowFall: string;
}

export interface IiconCode{
  iconCode: '01d' | '01n' | '02d' | '02n' | '03d' | '03n' | '04d' | '04n' | '09d' | '09n' | '10d' | '10n' | '11d' | '11n' | '13d' | '13n' | '50d' | '50n';
}

export interface ISearchResultProps extends IBaseProps {
  snowFall: string;
  hourlySnowFall?: IHourlySnowFall[];
}

export interface IResortObjProps extends IBaseProps{
  snowFallToday: string;
  hourlySnowFall?: IHourlySnowFall;
}

export interface IResortForecast extends IBaseProps{
  snowFallToday: string;
  hourlySnowFall: IHourlySnowFall[];
}