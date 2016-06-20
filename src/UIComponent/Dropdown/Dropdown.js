import React, {PropTypes}  from 'react';
import {is, fromJS, Map} from 'immutable';
import styles from './Dropdown.scss';

import MultiSelectedItem from './MultiSelectedItem';
import DropdownItem from './DropdownItem';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDropdownList: false,
      selectedArr: []
    }
  }

  dropdownItem() {
    this.setState({
      isShowDropdownList: !this.state.isShowDropdownList
    })
  }

  select(id) {
    const {selectedArr} = this.state;
    let {isMultiple, option} = this.props;
    let data = option.filter(v => v.id == id);
    this.setState({
      selectedArr: isMultiple ? id == option[0].id ? data : selectedArr.concat(data).filter(v => v.id != option[0].id) : data,
      isShowDropdownList: !this.state.isShowDropdownList
    });
  }

  deleteSelected(id) {
    const {selectedArr} = this.state;
    this.setState({
      selectedArr: selectedArr.filter(v => v.id != id)
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const IthisProps = Map(this.props),
      IthisState = fromJS(this.state),
      InextProps = Map(nextProps),
      InextState = fromJS(nextState);
    return (!is(IthisState, InextState) || !is(IthisProps, InextProps));
  }

  render() {
    const {option, isMultiple, skin} = this.props;
    const {isShowDropdownList, selectedArr} = this.state;
    return (
      <div className={`Dropdown Dropdown-${skin}`}>
        <div className="dropdown-box" onClick={::this.dropdownItem}>
          {
            isMultiple &&
            <ul className="multiple-list clearfix">
              {
                selectedArr.map((item, i) => {
                  return (
                    <MultiSelectedItem data={item} onDelete={() => this.deleteSelected(item.id)} key={i}/>
                  );
                })
              }

            </ul>
          }
          {
            !isMultiple &&
            <div className="single-select a-line">{selectedArr[0] && selectedArr[0].title}</div>
          }
        </div>
        {
          isShowDropdownList &&
          <ul className="dropdown-list">
            {
              option.map((item, i) => {
                return (
                  <DropdownItem data={item} select={::this.select} selectedArr={selectedArr} key={i}/>
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

