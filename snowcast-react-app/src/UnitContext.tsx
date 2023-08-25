import { createContext, useContext, useState } from 'react';
import { IUnitContext } from './types/allTypes';

const UnitContext = createContext<IUnitContext | null>(null);

const UnitContextProvider = ({ children }: {
  children: JSX.Element | JSX.Element[]
}) => {
  const [ tempUnit, setTempUnit ] = useState<'C' | 'F'>('C');
  const [ heightUnit, setHeightUnit ] = useState<'mm' | 'Inches'>('mm');

  const units: IUnitContext = {
    temp: {
      unit: tempUnit,
      setUnit: setTempUnit
    },
    height: {
      unit: heightUnit,
      setUnit: setHeightUnit
    }
  };

  return (
    <UnitContext.Provider value={units}>
      {children}
    </UnitContext.Provider>
  );
}

const useUnitContext = () => {
  return useContext(UnitContext);
}

export { UnitContextProvider, useUnitContext };

