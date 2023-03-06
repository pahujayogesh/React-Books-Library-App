import Sider from "./components/sider";
import Mainpage from "./components/mainpage";
import './App.css'
function App() {
  return (
    <>
      {/*<Ter/>
    <Sidebar/>
    
    */}
      

      <div className="container">
        <div className="row">
          <div className="col-md-2"><Sider/></div>
          <div className="col mt-2 p-3 "><Mainpage /></div>
        </div>
      </div>
    </>
  );
}

export default App;
