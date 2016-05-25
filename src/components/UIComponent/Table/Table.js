"use strict";
import React, { PropTypes } from 'react';
import classNames from 'classnames';

import DefaultCheckBox from './CheckBox';

import styles from './Table.scss';

/*
 * YOU MUST READ THIS BEFORE USING THIS COMPONENT
 *
 * PROPS FORMAT:
 * headData:                It MUST be a JSON object.
 *
 * contentData:             It MUST be a Array of JSON object.
 *
 * thClass & tdClass:       It can be a Array or a String(e.g. ["column-1", "column-2", ...] or "table-head"),
 *                          you can ignore these two props and use the default th(td) className:
 *                          `thead-column-${index}`(`tbody-column-${index}`) to control the styles.
 *
 * isOperatable:            MUST be a Boolean, default value is false.
 *
 * CheckBox:                You can deliver your own checkbox component through this prop, or you can ignore
 *                          this prop and use the default CheckBox.
 *
 * rowsForOnePage:          If you use this component with ClickPage component together, this prop is used
 *                          for setting the row number of table showing in one page. MUST be set with
 *                          pageIndex together.
 *
 * pageIndex:               MUST be set with rowsForOnePage together.
**/

class Table extends React.Component {
  static defaultProps = {
    headData: [],
    isOperatable: false,
    CheckBox: DefaultCheckBox,
    pageIndex: 0
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.startIndex = 0;
    if(this.props.rowsForOnePage) {
      this.endIndex = this.props.rowsForOnePage;
    }
    this.headNameList = [];
    this.headKeyList = [];
    this.headLength = 0;
  }

  componentWillMount() {
    let { isOperatable, headData, contentData, pageIndex, rowsForOnePage } = this.props;
    for(let key in headData) {
      this.headNameList.push(headData[key]);
      this.headKeyList.push(key);
      this.headLength++;
    }
    this.contentDataForShow = (pageIndex && rowsForOnePage)
            ? contentData.slice(this.startIndex, this.endIndex)
            : contentData;
    if(isOperatable && this.contentDataForShow.length > 0) {
      ::this.initCheckBoxState(this.contentDataForShow);
    }
  }

  componentWillReceiveProps(nextProps) {
    let { isOperatable } = this.props,
        { checkBoxState } = this.state,
        { headData, pageIndex, rowsForOnePage } = nextProps;
    if(this.headNameList.length == 0) {
      for(let key in headData) {
        this.headNameList.push(headData[key]);
        this.headKeyList.push(key);
        this.headLength++;
      }
    }
    //表格翻页
    if(pageIndex && ((this.props.pageIndex != pageIndex) || this.contentDataForShow.length < 1)) {
      this.startIndex = (pageIndex - 1) * rowsForOnePage;
      this.endIndex = pageIndex * rowsForOnePage;
      this.contentDataForShow = nextProps.contentData.slice(this.startIndex, this.endIndex);
      ::this.initCheckBoxState(this.contentDataForShow);
    } else if(!pageIndex) {
      this.contentDataForShow = nextProps.contentData;
    }
    if(isOperatable && !checkBoxState && this.contentDataForShow.length > 0) {
      ::this.initCheckBoxState(this.contentDataForShow);
    }
  }

  componentWillUnmount() {
    console.log("unMount");
    this.contentDataForShow = null;
  }

  //初始化checkBox的状态
  initCheckBoxState(data) {
    let checkBoxState = this.state.checkBoxState || { selectAll: false},
        isNewPage = false;
    data.map((item) => {
      if(checkBoxState[item.id] == undefined) {
        isNewPage = true;
        checkBoxState[item.id] = false;
      }
    });
    if(isNewPage) {
      checkBoxState.selectAll = false;
    } else {
      checkBoxState.selectAll = this.checkBoxStateIterator(checkBoxState, data);
    }
    this.setState({
      checkBoxState: checkBoxState
    });
  }

  //对thClass和tdClass进行格式化
  formatClassName(className, index) {
    if(typeof className == "string") {
      return className;
    } else if(className instanceof Array) {
      return className[index];
    } else {
      return null;
    }
  }

  //checkBox click事件
  checkBoxClick(id) {
    let { checkBoxState } = this.state;
    checkBoxState[id] = !checkBoxState[id];
    if(checkBoxState[id]) {
      checkBoxState.selectAll = this.checkBoxStateIterator(checkBoxState, this.contentDataForShow);
    } else {
      checkBoxState.selectAll = false;
    }
    this.setState({
      checkBoxState: checkBoxState
    });
  }

  //全选click事件
  selectAllClick() {
    let { checkBoxState } = this.state,
        data = this.contentDataForShow;
    if(!checkBoxState) { return; }
    let nextSelectAll = !checkBoxState.selectAll;
    data.map((item) => {
      checkBoxState[item.id] = nextSelectAll;
    });
    checkBoxState.selectAll = nextSelectAll;
    this.setState({
      checkBoxState: checkBoxState
    });
  }

  //遍历checkBox是否全部选中
  checkBoxStateIterator(checkBoxState, data) {
    if(data.length == 0) { return false; }
    let result = true;
    data.map((item) => {
      if(checkBoxState[item.id] == false) {
        result = false;
      }
    });
    return result;
  }

  //表格排序
  sortData(data, columnIndex, isAscending) {
    let _this  = this;
    _this.contentDataForShow = data.sort(function(o1, o2) {
      if(_this.columnHasString(data, columnIndex)) {
        if(isAscending) {
          return _this.str2Unicode(o1[_this.headKeyList[columnIndex]]) > _this.str2Unicode(o2[_this.headKeyList[columnIndex]]);
        } else {
          return _this.str2Unicode(o1[_this.headKeyList[columnIndex]]) < _this.str2Unicode(o2[_this.headKeyList[columnIndex]]);
        }
      } else {
        if(isAscending) {
          return o1[_this.headKeyList[columnIndex]] >  o2[_this.headKeyList[columnIndex]];
        } else {
          return o1[_this.headKeyList[columnIndex]] <  o2[_this.headKeyList[columnIndex]];
        }
      }
    });
    _this.forceUpdate();
  }

  //该列是否含有字符类型数据
  columnHasString(data, columnIndex) {
    for(let i = 0; i < data.length; i++) {
      if(typeof(data[i][this.headKeyList[columnIndex]]) == "string") {
        return true;
      }
    }
    return false;
  }

  //将数字或字符串转换成unicode
  str2Unicode(str) {
    if(str == "") {return "";}
    if(typeof(str) == "number") {
      str = str + "";
    }
    let resultStr = "", char;
    for (let i = 0; i < str.length; i ++){
      char = str.charCodeAt(i).toString(16);
      while(char.length < 4) {
        char = '0'.concat(char);
      }
      resultStr = resultStr.concat(char);
    }
    return resultStr.toUpperCase();
  }

  render() {
    const { headData, thClass, tdClass, isOperatable, CheckBox } = this.props,
          { contentDataForShow } = this,
          { checkBoxState } = this.state;
    //默认每列等宽
    const columnWidth = isOperatable ? (95 / this.headLength) + "%" : (100 / this.headLength) + "%";
    //生成thead代码
    let headCodes = this.headNameList.map((item, index) => {
      return <th className={classNames(`thead-column-${index}`, this.formatClassName(thClass, index))}
                 style={{ width: columnWidth }} key={index} >
              {item}
              <span className="script superscript" onClick={() => this.sortData(contentDataForShow, index, false)} />
              <span className="script subscript" onClick={() => this.sortData(contentDataForShow, index, true)} />
             </th>;
    });
    //生成tbody代码
    let contentCodes = contentDataForShow.map( (item, index) => {
      let tdCodes = [], i = 0;
      for(let key in headData) {
        tdCodes.push(<td className={classNames(`tbody-column-${i}`, this.formatClassName(tdClass, i))}
                         key={i}>{item[key]}</td>);
        i++;
      }
      return <tr key={index}>
              {
                isOperatable &&
                <td>
                  <CheckBox checked={checkBoxState[item.id]} CheckBoxOnClick={::this.checkBoxClick} index={item.id} value={item.id} />
                </td>
              }
              {tdCodes}
             </tr>;
    });
    return(
      <table className="Table">
        <thead>
          <tr>
            {
              isOperatable && (this.headLength > 0) &&
              <td className="select-all" style={{ width: "5%" }}>
                <CheckBox checked={checkBoxState && checkBoxState.selectAll} CheckBoxOnClick={::this.selectAllClick} value={null} />
              </td>
            }
            {headCodes}
          </tr>
        </thead>
        <tbody>
          {contentCodes}
        </tbody>
      </table>
    );
  };
}

Table.propTypes = {
  headData: PropTypes.object.isRequired,
  contentData: PropTypes.array.isRequired,
  thClass: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  tdClass: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  isOperatable: PropTypes.bool,
  CheckBox: PropTypes.any,
  rowsForOnePage: PropTypes.number,
  pageIndex: PropTypes.number
};

export default Table;