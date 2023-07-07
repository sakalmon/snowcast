import type {
  IHourlySnowFall,
  ITimeFormattedHourlySnowFall,
  IResortDetails,
  IOpenW,
  IForecast,
  IOpenWHourly,
  IOpenC,
  IResortData
} from '../types/allTypes';

export class SnowResort {
  name: string;
  details: Promise<void | IResortDetails> | {};
  openWResponse: Promise<void | IOpenW> | {};
  forecast: IForecast | {};

  constructor(resortName: string) {
    // Set initial resort attributes
    this.name = resortName;
    this.details = {};
    this.openWResponse = {};
    this.forecast = {};
  }

  // Resorts for home page
  static popularResorts = [
    'Perisher',
    // 'Thredbo',
    // 'Turoa',
    // 'Whakapapa',
    // 'Theodul',
    // 'Las Lenas'
  ];

/*==============================================================================
  Method definitions
==============================================================================*/
  getResortData = async (): Promise<IResortData> => {
    return this.getResortDetails(this.name)
      .then(details => {
        this.details = details;
        return this.fetchOpenWeather(details.lat, details.lon)
      })
      .then(openWResponse => {
        this.openWResponse = openWResponse;
        return this.getForecast(openWResponse);
      })
      .then(forecast => {
        this.forecast = forecast;
        return {
          name: this.name,
          details: this.details as IResortDetails,
          forecast: this.forecast as IForecast
        }
      });
  }

  fetchOpenCage = async (resortName: string, limit: number = 1): Promise<IOpenC> => {
    const openCageApiKey = process.env.REACT_APP_OPEN_CAGE_API_KEY;
    const requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${resortName}&key=${openCageApiKey}&limit=${limit}`;
    
    console.log('Fetching from Open Cage API');
    const res = await fetch(requestUrl);
    const data: IOpenC = await res.json();
    return data;
  }
  
  fetchOpenWeather = async (lat: number, lon: number): Promise<IOpenW> => {
    const openWeatherApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
    const requestUrl = 
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;

    console.log('Fetching from Open Weather API');
    const res = await fetch(requestUrl);
    const openWResponse: IOpenW = await res.json();
    return openWResponse;
  };

  getForecast = (openWResponse: IOpenW): IForecast => {
    const currentTemp = this.getCurrentTemp(openWResponse);
    const iconCode = openWResponse.current.weather[0].icon;
    const snowToday = this.getTodaysSnowFall(openWResponse.hourly);
    const epochHourlySnow = this.getHourlySnowFall(openWResponse.hourly);
    const hourlySnow = this.epochTo12Hr(epochHourlySnow);
    const eightDaySnowFall = this.getEightDaySnowFall(openWResponse);

    return {
      currentTemp,
      iconCode,
      snowToday,
      hourlySnow,
      eightDaySnowFall
    };
  };

  getResortDetails = async (resortName: string): Promise<IResortDetails> => {
    const data = await this.fetchOpenCage(resortName);

    const lat = data.results[0].geometry.lat;
    const lon = data.results[0].geometry.lng;      
    const country = data.results[0].components.country;
    const flag = data.results[0].annotations.flag;
    
    return { lat, lon, country, flag };
  }

  getTodaysSnowFall = (hourlyData: IOpenWHourly[]) => {
    const todaysSnowFall = hourlyData
      .slice(0, 24)
      .reduce((snowToday, hourlySnowFall) => {
        if (hourlySnowFall.snow) {
          return snowToday + hourlySnowFall.snow['1h'];
        } else {
          return snowToday;
        }
      }, 0)
      .toFixed(2);
    return Number(todaysSnowFall);
  };

  getHourlySnowFall = (hourlyData: IOpenWHourly[]): IHourlySnowFall[] => {
    return hourlyData
      .slice(0, 24)
      .map((hourForecast) => {
        if (hourForecast.snow) {
          return {
            time: hourForecast.dt,
            snow: hourForecast.snow['1h']
          };
        } else {
          return {
            time: hourForecast.dt,
            snow: 0
          };
        }
      });
  }

  getEightDaySnowFall = (openWResponse: IOpenW) => {
    const eightDaySnowFall = openWResponse.daily
      .filter(day => {
        if (day.snow) {
          return day.snow > 0;
        } else {
          return false;
        }
      })
      .reduce((eightDaySnowFall, day) => {
        if (day.snow) {
          return eightDaySnowFall + day.snow;
        } else {
          return eightDaySnowFall;
        }
      }, 0)
      .toFixed(2);
    return Number(eightDaySnowFall)
  }

  epochTo12Hr = (hourlySnowFall: IHourlySnowFall[]):
  ITimeFormattedHourlySnowFall[] => {
    return hourlySnowFall.map(hourSnowFall => {
      const epoch = hourSnowFall.time;
      const dateObj = new Date(0);
      dateObj.setUTCSeconds(epoch);
      const time = dateObj.getHours();
      let formattedTime = '';

      if (time === 12) {
        formattedTime = '12pm';
      } else if (time === 0) {
        formattedTime = '12am';
      } else if (time > 12) {
        formattedTime = (time - 12).toString() + 'pm';
      } else {
        formattedTime = time.toString() + 'am';
      }
      
      return {
        time: formattedTime,
        snow: hourSnowFall.snow
      };
    });
  }
  getCurrentTemp = (openWResponse: IOpenW) => openWResponse.current.temp;
}