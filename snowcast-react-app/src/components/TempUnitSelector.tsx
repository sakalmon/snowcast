import ToggleSwitch from './ToggleSwitch';
import '../assets/stylesheets/UnitSelector.scss';
import type { ITemp } from '../types/allTypes';

/*==============================================================================
  Function Definitions
==============================================================================*/
export const celsiusToF = (celsius: number) => (celsius * 1.8 + 32).toFixed();
export const fahrenheitToC = (fahrenheit: number) => {
  return ((fahrenheit - 32) * 5 / 9).toFixed();
};

function TempUnitSelector({ unit, setUnit }: ITemp) {
  const updateTempUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setUnit('F');
      console.log('unit: F')
    } else {
      setUnit('C');
      console.log('unit: C')
    }
  }

  const checked = unit === 'F';

  return (
    <div className="TempUnitSelector">
      <span>C</span>
      <ToggleSwitch checked={checked} updateUnit={updateTempUnit} />
      <span>F</span>
    </div>
  );
}

export default TempUnitSelector;