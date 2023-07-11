import ToggleSwitch from './ToggleSwitch';
import '../assets/stylesheets/TempUnitSelector.scss';
import type { ITempUnit } from '../types/allTypes';

/*==============================================================================
  Function Definitions
==============================================================================*/
export const celsiusToF = (celsius: number) => (celsius * 1.8 + 32).toFixed();
export const fahrenheitToC = (fahrenheit: number) => {
  return ((fahrenheit - 32) * 5 / 9).toFixed();
};

function UnitSelector({ tempUnit }: {tempUnit: ITempUnit}) {
  return (
    <div className="TempUnitSelector">
      <span>C</span>
      <ToggleSwitch tempUnit={tempUnit} />
      <span>F</span>
    </div>
  );
}

export default UnitSelector;