import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Resort from './Resort';
import SearchBox from './SearchBox';
import TempUnitSelector from './TempUnitSelector';
import HeightUnitSelector from './HeightUnitSelector';
import { useUnitContext } from '../UnitContext';
import { SnowResort } from '../classes/SnowResort';
import '../assets/stylesheets/PopularResorts.scss';
import type { IUnitContext, IResortData } from '../types/allTypes';

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

  const { temp, height }  = useUnitContext() as IUnitContext;
  const tempUnit = temp.unit;
  const setTempUnit = temp.setUnit;
  const heightUnit = height.unit;
  const setHeightUnit = height.setUnit;

  return (
    <div className="PopularResorts">
      <div className="transparent-layer">
        <div className="units">
          <TempUnitSelector unit={tempUnit} setUnit={setTempUnit} />
          <HeightUnitSelector
            unit={heightUnit}
            setUnit={setHeightUnit}
          />
        </div>
        <SearchBox />
        <div className="resorts-container">
          {(resorts.map((resort, index) => 
            <Link key={index} to='/resort_forecast' state={{ resort, tempUnit, heightUnit }}>
              <Resort
                resort={resort}
                tempUnit={tempUnit}
                heightUnit={heightUnit}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularResorts;