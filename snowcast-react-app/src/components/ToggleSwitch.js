import '../assets/stylesheets/ToggleSwitch.scss';

function ToggleSwitch() {
  return (
    <div className="ToggleSwitch">
      <label class="switch">
      <input type="checkbox" />
      <span class="slider round"></span>
      </label>
    </div>
  );
}

export default ToggleSwitch;