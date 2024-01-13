import spinner from "../../images/spinner.png";
import whitespinner from "../../images/whitespinner.png";
import "./Loading.css";
import { useTheme } from "Contexts/ThemeContext";
function Loading() {
  const { isDarkMode } = useTheme();
  return (
    <div className='loading-page'>
      <div className='loading-spinner-container'>
        <img
          src={isDarkMode ? spinner : whitespinner}
          className='spinner'
          alt='spinner'
        ></img>
        <p className='loading-title'>loading...</p>
      </div>
    </div>
  );
}

export default Loading;
