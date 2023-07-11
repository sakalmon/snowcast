import '../assets/stylesheets/ToggleSwitch.scss';
import type { IUnit } from '../types/allTypes';

/*==============================================================================
  Function Definitions
==============================================================================*/
const celsiusToF = (celsius: number) => celsius * 1.8 + 32;
const fahrenheitToC = (fahrenheit: number) => (fahrenheit - 32) * 5 / 9;

/*==============================================================================
  Event Handlers
==============================================================================*/
const handleUnitChange = (tempUnit: IUnit) => {
  if (tempUnit.unit === 'C') {
    tempUnit.setUnit('F');
  } else {
    tempUnit.setUnit('C');
  }
}

/*==============================================================================
  Functional Component
==============================================================================*/
function ToggleSwitch({ tempUnit }: {tempUnit: IUnit}) {
  /*============================================================================
    Component JSX
  ============================================================================*/
  return (
    <div className="ToggleSwitch">
      <label className="switch">
      <input
        type="checkbox"
        checked={tempUnit.unit === 'F'}
        onChange={event => handleUnitChange(tempUnit)}
      />
      <span className="slider round" />
      </label>
    </div>
  );
}

export default ToggleSwitch;