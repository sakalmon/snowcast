import '../assets/stylesheets/ToggleSwitch.scss';
import type { ITempUnit } from '../types/allTypes';

/*==============================================================================
  Event Handlers
==============================================================================*/
const handleUnitChange = (tempUnit: ITempUnit) => {
  if (tempUnit.unit === 'C') {
    tempUnit.setUnit('F');
  } else {
    tempUnit.setUnit('C');
  }
}

/*==============================================================================
  Functional Component
==============================================================================*/
function ToggleSwitch({ tempUnit }: {tempUnit: ITempUnit}) {
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