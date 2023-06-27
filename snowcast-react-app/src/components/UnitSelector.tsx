import ToggleSwitch from '../components/ToggleSwitch';
import '../assets/stylesheets/UnitSelector.scss';

function UnitSelector() {
  return (
    <div className="UnitSelector">
      <span>C</span>
      <ToggleSwitch />
      <span>F</span>
    </div>
  );
}

export default UnitSelector;