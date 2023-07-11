import ToggleSwitch from './ToggleSwitch';
import '../assets/stylesheets/HeightUnitSelector.scss';
import type { IUnits } from '../types/allTypes';

/*==============================================================================
  Function Definitions
==============================================================================*/
export const mmToInches = (mm: number) => mm / 25.4;
export const inchesToMM = (inches: number) => inches * 25.4;

function HeightUnitSelector({ units }: {units: IUnits}) {
  const updateHeightUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      units.height.setHeightUnit('Inches');
    } else {
      units.height.setHeightUnit('mm');
    }
  }

  return (
    <div className="TempUnitSelector">
      <span>mm</span>
      <ToggleSwitch checked={units.height.heightUnit === 'Inches'} updateUnit={updateHeightUnit} />
      <span>Inches</span>
    </div>
  );
}

export default HeightUnitSelector;