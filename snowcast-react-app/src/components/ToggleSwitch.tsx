import '../assets/stylesheets/ToggleSwitch.scss';

function ToggleSwitch() {
  return (
    <div className="ToggleSwitch">
      <label className="switch">
      <input type="checkbox" />
      <span className="slider round"></span>
      </label>
    </div>
  );
}

export default ToggleSwitch;