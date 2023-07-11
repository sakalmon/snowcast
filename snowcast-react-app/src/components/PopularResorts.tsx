import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Resort from './Resort';
import SearchBox from './SearchBox';
import TempUnitSelector from './TempUnitSelector';
import HeightUnitSelector from './HeightUnitSelector';
import { SnowResort } from '../classes/SnowResort';
import '../assets/stylesheets/PopularResorts.scss';
import type { IResortData } from '../types/allTypes';

/*==============================================================================
  Function Definitions
==============================================================================*/
const createResorts = (): SnowResort[] => {
  return SnowResort.popularResorts.map(resortName =>
    new SnowResort(resortName)
  );
}

export const getAllResortData = (resorts: SnowResort[]) => {
  return resorts.map(resort => resort.getResortData());
};

/*==============================================================================
  Functional Component
==============================================================================*/
function PopularResorts() {
  // Data for all of our resorts
  const [ resorts, setResorts ] = useState<IResortData[]>([]);

  // For temperature and snowfall height conversions
  const [ tempUnit, setTempUnit ] = useState<'C' | 'F'>('C');
  const [ heightUnit, setHeightUnit ] = useState<'mm' | 'Inches'>('mm');

  const units = {
    temp: {
      tempUnit,
      setTempUnit
    },
    height: {
      heightUnit,
      setHeightUnit
    }
  };

  // Get the forecast of all of our popular resorts and store in state
  useEffect(() => {
    const resortObjs = createResorts();
    const allResortData = getAllResortData(resortObjs);

    Promise.all(allResortData).then(a => {
      const allResortData: IResortData[] = a.map(resortData => {
        return {
          name: resortData.name,
          details: resortData.details,
          forecast: resortData.forecast
        };
      });
      setResorts(allResortData);
    });

  }, []);

  /*============================================================================
    Component JSX
  ============================================================================*/
  return (
    <div className="PopularResorts">
      <TempUnitSelector units={units} />
      <HeightUnitSelector units={units} />
      <SearchBox />
      <div className="resorts-container">
        {(resorts.map((resort, index) => 
          <Link key={index} to='/resort_forecast' state={{ resort }}>
            <Resort resort={resort} units={units}/>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularResorts;