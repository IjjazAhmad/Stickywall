import './App.scss';
import { UesDoxContext } from './pages/Context/DoxContext';

import Routes from './pages/Routes'


function App() {
const {isApploading} = UesDoxContext()
  if (isApploading) {
    return <div className="loader-container">
      <span className="loader"></span>
    </div>
  }
  return (
    <>
      <Routes />

    </>
  );
}

export default App;
