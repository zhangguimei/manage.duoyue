
import React, {PropTypes} from 'react';
//import ManageHome from '../routes/ManagePage/components/ManagePage';

class App extends React.Component {
  render(){
    return (
        <div className="App" style={{height:'100%'}}>
          {this.props.children}
        </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.any
}
App.title = '云平台首页';

module.exports = App;