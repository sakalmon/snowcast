import ToggleSwitch from './ToggleSwitch';
import '../assets/stylesheets/HeightUnitSelector.scss';
import type { IHeight } from '../types/allTypes';

/*==============================================================================
  Function Definitions
==============================================================================*/
export const mmToInches = (mm: number) => mm / 25.4;
export const inchesToMM = (inches: number) => inches * 25.4;

function HeightUnitSelector({ unit, setUnit }: IHeight) {
  const updateHeightUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setUnit('Inches');
    } else {
      setUnit('mm');
    }
  }

  return (
    <div className="HeightUnitSelector">
      <span>mm</span>
      <ToggleSwitch checked={unit === 'Inches'} updateUnit={updateHeightUnit} />
      <span>Inches</span>
    </div>
  );
}

export default HeightUnitSelector;