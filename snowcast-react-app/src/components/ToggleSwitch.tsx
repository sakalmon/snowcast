import { useState } from 'react';
import '../assets/stylesheets/ToggleSwitch.scss';

/*==============================================================================
  Function Definitions
==============================================================================*/
const celsiusToF = (celsius: number) => celsius * 1.8 + 32;
const fahrenheitToC = (fahrenheit: number) => (fahrenheit - 32) * 5 / 9;

/*==============================================================================
  Event Handlers
==============================================================================*/
const handleUnitChange = (
  isFahrenheit: boolean,
  setIsFahrenheit: React.Dispatch<React.SetStateAction<boolean>>
) => setIsFahrenheit(!isFahrenheit);

/*==============================================================================
  Functional Component
==============================================================================*/
function ToggleSwitch() {
  /*============================================================================
    State Hooks
  ============================================================================*/
  const [ isFahrenheit, setIsFahrenheit ] = useState(false);

  /*============================================================================
    Component JSX
  ============================================================================*/
  return (
    <div className="ToggleSwitch">
      <label className="switch">
      <input
        type="checkbox"
        checked={isFahrenheit}
        onChange={event => handleUnitChange(isFahrenheit, setIsFahrenheit)}
      />
      <span className="slider round"></span>
      </label>
    </div>
  );
}

export default ToggleSwitch;