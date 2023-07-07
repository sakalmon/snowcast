import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Resort from './Resort';
import '../assets/stylesheets/PopularResorts.scss';
import Search from './Search';
import UnitSelector from '../components/UnitSelector';
import { SnowResort } from '../SnowResort';
import type { IResortData, IResortDetails } from '../types';

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

  // For toggling temperature units
  const [ unit, setUnit ] = useState('C');

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
      <UnitSelector />
      <Search />
      <div className="resorts-container">
        {(resorts.map((resort, index) => 
          <Link key={index} to='/resort_forecast' state={{ resort }}>
            <Resort resort={resort} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularResorts;