import '../assets/stylesheets/ToggleSwitch.scss';

/*==============================================================================
  Functional Component
==============================================================================*/
function ToggleSwitch({ checked, updateUnit }: {
  checked: boolean;
  updateUnit: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  /*============================================================================
    Component JSX
  ============================================================================*/
  return (
    <div className="ToggleSwitch">
      <label className="switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={updateUnit}
      />
      <span className="slider round" />
      </label>
    </div>
  );
}

export default ToggleSwitch;