import ToggleSwitch from '../components/ToggleSwitch';
import '../assets/stylesheets/UnitSelector.scss';
import type { IUnit } from '../types/allTypes';

function UnitSelector({ tempUnit }: {tempUnit: IUnit}) {
  return (
    <div className="UnitSelector">
      <span>C</span>
      <ToggleSwitch tempUnit={tempUnit} />
      <span>F</span>
    </div>
  );
}

export default UnitSelector;