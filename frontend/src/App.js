import './App.css';
import routes from './routes'
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useRoutes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import './variables.css'

function App() {

  const router = useRoutes(routes)

  return (
    <>
      <div className="App">

        {router}

        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
}

export default App;
