import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Resort from './Resort';
import SearchBox from './SearchBox';
import UnitSelector from '../components/UnitSelector';
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

  // Temperature unit
  const [ unit, setUnit ] = useState<'C' | 'F'>('C');

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
      <UnitSelector tempUnit={{unit, setUnit}} />
      <SearchBox />
      <div className="resorts-container">
        {(resorts.map((resort, index) => 
          <Link key={index} to='/resort_forecast' state={{ resort }}>
            <Resort resort={resort} tempUnit={{unit, setUnit}}/>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularResorts;