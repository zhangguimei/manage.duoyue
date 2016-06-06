import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Map, List, is, fromJS} from 'immutable';
import classNames from 'classnames';
import shouldComponentUpdate from '../../../utils/shouldComponentUpdate';
import styles from './CascadeSelect.scss';

const none = require("../../../assets/MockData/address/none.json");
const china = require("../../../assets/MockData/address/first.json");
const beijing = require("../../../assets/MockData/address/beijing.json");
const hubei = require("../../../assets/MockData/address/hubei.json");
const wuhan = require("../../../assets/MockData/address/wuhan.json");
const hubeiWuhanHongshan = require("../../../assets/MockData/address/hubeiWuhanHongshan.json");//完整测试数据，湖北武汉洪山

class CascadeSelect extends React.Component {
  static defaultProps = {
    fields: [],
    fieldsClassName: []
  };

  constructor(props) {
    super(props);
    this.state = {
      selectData: {},
      showPanelIndex: -1
    };
    this.pickedDate = {
      name: [],
      id: []
    };
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  fetchData(id, index, all) {
    const {state:{selectData}, pickedDate} = this;
    //mockdata start
    let mockData, mergedSelectData, responseData;
    switch (id) {
      case 0:
        mockData = china;
        break;
      case 1:
        mockData = beijing;
        break;
      case 18:
        mockData = hubei;
        break;
      case 290:
        mockData = wuhan;
        break;
      case -1:
        mockData = none;
        break;
      default:
        mockData = china;
        break;
    }
    //mockdata end

    responseData = {
      [`key${index}`]: mockData
    };
    if (all) {
      responseData = hubeiWuhanHongshan
    }

    mergedSelectData = Map(selectData).merge(Map(responseData));

    if (id !== (fromJS(pickedDate).getIn(['id', index - 1]) || 0)) {
      mergedSelectData = mergedSelectData.slice(0, index + 1);
    }
    this.setState({
      selectData: mergedSelectData.toJS()
    });
  }

  onSelectItem(data = {}, index) {
    const {id, name, haschild} = data;
    const {
      props: {data: {defaultItemVaule}, fields},
      state: {selectData},
      pickedDate
    } = this;

    let tempId = id, tempName = name, tempHasChild = haschild;
    if (!tempId) {
      tempName = defaultItemVaule;
      tempId = -1;
      tempHasChild = true;
    }

    let pickedNames = fromJS(pickedDate).get('name'),
      pickedId = fromJS(pickedDate).get('id');

    if (tempHasChild) {
      //mockData start
      switch (tempId) {
        case 18:
          tempId = 18;
          break;
        case 290:
          tempId = 290;
          break;
        case -1:
          tempId = -1;
          break;
        default:
          tempId = 1;
          break;
      }
      this.fetchData(tempId, index + 1);
    }
    if (pickedDate.name[index] !== tempName) {
      pickedNames = pickedNames.slice(0, index);
      pickedId = pickedId.slice(0, index);
      if (!!id) {
        pickedNames = pickedNames.set(index, tempName);
        pickedId = pickedId.set(index, id);
      }
    }

    this.pickedDate.name = pickedNames.toJS();
    this.pickedDate.id = pickedId.toJS();

    this.togglePanel(index);
    this.exportSelectInfo()

    if(fields[index] && data) {
      fields[index].onUpdate(name || defaultItemVaule);
    }
  }

  togglePanel(index) {
    const {showPanelIndex} = this.state;
    let tempIndex = showPanelIndex === index ? -1 : index;
    this.setState({
      showPanelIndex: tempIndex
    });
  }

  onClickInput(index, e) {
    this.togglePanel(index);
  }

  exportSelectInfo() {
    const {
      props: {getSelectInfo},
      pickedDate
    } = this;
    getSelectInfo(pickedDate);
  }

  componentDidUpdate(prevProps, prevState) {
    let selectedItemNode = this.refs[`showItem`];
    if (selectedItemNode) {
      //selectedItemNode.scrollIntoView(true);
    }
  }

  componentDidMount() {
    const {addressValue} = this.props.data;
    let tempValue = addressValue;
    if (addressValue) {
      let id = tempValue.pop();
      this.pickedDate.name = tempValue;
      this.fetchData(id, tempValue.length, true);
    } else {
      this.fetchData(0, 0);
    }
  }

  render() {
    const {
      state: {selectData, showPanelIndex},
      props: {
        data:{
          showGenre = [],
          defaultItemVaule = ''
        },
        fields, fieldsClassName
      },
      pickedDate
    } = this;
    return (
      <div className="CascadeSelect">
        {
          showGenre.map((item, i)=> {
            if (!selectData[`key${i}`]) {
              selectData[`key${i}`] = []
            }
            return (
              <div className="select-wrap" key={i}>
                <div className="select-input-box">
                  <input className={`select-input ${fieldsClassName[i]}`} defaultValue={defaultItemVaule} type="text"
                         {...fields[i]} value={fromJS(pickedDate).getIn(['name', i])} readOnly onClick={(e)=>{::this.onClickInput(i, e)}}/>
                  <em className="triangle"></em>
                  {
                    showPanelIndex === i &&
                    <ul className="select-content">
                      <li className="select-item"
                          onClick={()=>{::this.onSelectItem(defaultItemVaule, i)}}>{defaultItemVaule}</li>
                      {
                        selectData[`key${i}`].map((item, index)=> {
                          let checkActive = false;
                          if (fromJS(pickedDate).getIn(['name', i]) === item.name) {
                            fromJS(pickedDate).setIn(['id', i], item.id);
                            checkActive = true;
                          }
                          return (
                            <li className={classNames('select-item', {'active': checkActive})} key={index}
                                ref={checkActive ? 'showItem': ''}
                                onClick={()=>{::this.onSelectItem(item, i)}}>{item.name + '' + item.id}</li>
                          )
                        })
                      }
                    </ul>
                  }
                </div>
                <span clsssName="genreValue">{item}</span>
              </div>
            )
          })
        }
      </div>
    );
  }
}

CascadeSelect.PropTypes = {
  data: PropTypes.shape({
    showGenre: PropTypes.array.isRequired,
    defaultItemVaule: PropTypes.string,
    addressValue: PropTypes.array
  }).isRequired,
  getSelectInfo: PropTypes.func.isRequired
};

export default CascadeSelect;