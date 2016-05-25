import React, {PropTypes}  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
// import {Map, List, is, fromJS} from 'immutable';
import styles from './Dropdown.scss';

import MultiSelectedItem from './MultiSelectedItem';
import DropdownItem from './DropdownItem';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDropdownList: false,
      selectedArr: ["全部"]
    }
  }

  dropdownItem() {
    this.setState({
      isShowDropdownList: !this.state.isShowDropdownList
    })
  }

  select(title) {
    let temp = title;
    const { selectedArr } = this.state;
    let { isMultiple,cantSelect } = this.props;
    if(cantSelect.indexOf(title) == -1) {
      if(isMultiple) {
        temp = [...selectedArr];
        if(title == "全部") {
          temp = [title];
        }else if(selectedArr.indexOf(title) == -1) {
          if (temp.indexOf("全部") > -1) {
            temp.splice(0,1)
          } 
          temp.push(title);
        }
      } 
      this.setState({
        selectedArr: temp
      })
    }
    this.setState({
      isShowDropdownList: false
    })

  }

  deleteSelected(title, e) {
    const { selectedArr } = this.state;
    let temp = [...selectedArr];
    let num = temp.indexOf(title);
    if (num > -1) {
      temp.splice(num, 1); 
        this.setState({
          selectedArr: temp
        })
    }
    e.stopPropagation()
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { isMultiple } =this.props;
  //   const thisStateValue = this.state, nextStateValue = nextState;
  //   if (is(fromJS(thisStateValue), fromJS(nextStateValue))) {
  //     return false;
  //   } else {
  //     return true; 
  //   }
  // }

  render() {
    const { option, isMultiple, cantSelect, skin} = this.props;
    const { isShowDropdownList, selectedArr } = this.state;
    return (
      <div className={`Dropdown Dropdown-${skin}`}>
        <div className="dropdown-box" onClick={() => this.dropdownItem()}>
        {
          isMultiple &&
          <ul className="multiple-list clearfix">
          {
            selectedArr.map((item,i) => {
              return(
                <MultiSelectedItem selected={item} onDelete={::this.deleteSelected}  key={i}/>
                );
            })
          }
            
        </ul>
        }
        {
          !isMultiple &&
          <div className="single-select a-line">{selectedArr}</div>
        }
        </div>
        {
         isShowDropdownList &&
          <ul className="dropdown-list">
          { 
            option.map((item,i) => {
              return(
              <DropdownItem data={item} isMultiple={isMultiple} select={::this.select} cantSelect={cantSelect} selectedArr={selectedArr} key={i}/>
              );
            })
          }
          </ul>
        }

      </div>
    );
  }
}

export default Dropdown;

