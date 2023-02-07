import Resort from '../components/Resort';

function ResortForecast({ resortClicked }) {
  const { resortName, country, snowFallToday, currentTemp, iconCode } = resortClicked;
  
  return (
    <div className="ResortForecast">
        <Resort
          resortName={resortName}
          country={country}
          snowFallToday={snowFallToday}
          currentTemp={currentTemp}
          iconCode={iconCode}
        />
    </div>
  );
}

export default ResortForecast;