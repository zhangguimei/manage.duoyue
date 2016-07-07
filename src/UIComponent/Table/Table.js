/*
 *  Last Modify Date: 2016.06.29
 *  Author  : CastileMan
 *  Declare : 优化表格功能
 * */
"use strict";
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import {Map, is, fromJS} from 'immutable';
import { Link } from 'react-router';
import shouldComponentUpdate from 'UtilsFolder/shouldComponentUpdate';

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
 * CheckBox:                You can deliver your own checkbox components through this prop, or you can ignore
 *                          this prop and use the default CheckBox.
 *
 * rowsForOnePage:          If you use this components with Pagination components together, this prop is used
 *                          for setting the row number of table showing in one page. MUST be set with
 *                          pageIndex together.
 *
 * pageIndex:               MUST be set with rowsForOnePage together.
 *
 * editable:                MUST be a Boolean, default value is false.
 *
 * deletable:               MUST be a Boolean, default value is false. MUST be set with deleteDataFunc together.
 *
 * deleteDataFunc:          MUST be a function, MUST set the deletable prop as true at the same time.
 **/

class Table extends React.Component {
  static defaultProps = {
    headData: [],                   //表头数据
    isOptional: false,              //表格是否可选
    CheckBox: DefaultCheckBox,      //可传自定义checkbox组件
    pageIndex: 0,                   //表格当前页数
    editable: false,                //表格是否可双击进行编辑
    deletable: false,               //表格数据是否可删除
    initState: [],                  //表格checkbox初始状态数据
    className:''                    //自定义类
  };

  constructor(props) {
    super(props);
    this.state = {
      editLocation: {
        key: null,
        id: -1
      }
    };
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.startIndex = 0;
    if(this.props.rowsForOnePage) {
      this.endIndex = this.props.rowsForOnePage;
    }
    this.headNameList = [];
    this.headKeyList = [];
  }

  //初始化checkBox的状态
  initCheckBoxState(data) {
    const { initState } = this.props;
    const checkBoxState = this.state.checkBoxState || {selectAll: false};
    let IcheckBoxState = fromJS(checkBoxState),
        key,
        checked = false;
    data.map((item) => {
      key = item.id;
      if(IcheckBoxState.get(key.toString()) == undefined) {
        checked = initState.indexOf(key) >= 0;
        IcheckBoxState = IcheckBoxState.set(key.toString(), checked);
      }
    });
    IcheckBoxState = IcheckBoxState.set("selectAll", this.checkBoxStateIterator(IcheckBoxState.toJS(), data));
    this.setState({
      checkBoxState: IcheckBoxState.toJS()
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
    const { checkBoxState } = this.state,
      { checkBoxClick } = this.props;
    let IcheckBoxState = fromJS(checkBoxState);
    IcheckBoxState = IcheckBoxState.set(id.toString(), !IcheckBoxState.get(id.toString()));
    if(IcheckBoxState.get(id.toString())) {
      IcheckBoxState = IcheckBoxState.set("selectAll", this.checkBoxStateIterator(IcheckBoxState.toJS(), this.contentDataForShow));
      checkBoxClick && checkBoxClick(id, true);
    } else {
      IcheckBoxState = IcheckBoxState.set("selectAll", false);
      checkBoxClick && checkBoxClick(id, false);
    }
    this.setState({
      checkBoxState: IcheckBoxState.toJS()
    });
  }

  //全选click事件
  selectAllClick() {
    const { checkBoxState } = this.state,
          data = this.contentDataForShow,
          { checkBoxClick } = this.props;
    let IcheckBoxState = fromJS(checkBoxState);
    if(!IcheckBoxState) {
      return;
    }
    let nextSelectAll = !IcheckBoxState.get("selectAll");
    data.map((item) => {
      IcheckBoxState = IcheckBoxState.set(item.id.toString(), nextSelectAll);
      checkBoxClick && checkBoxClick(item.id, nextSelectAll);
    });
    IcheckBoxState = IcheckBoxState.set("selectAll", nextSelectAll);
    this.setState({
      checkBoxState: IcheckBoxState.toJS()
    });
  }

  //遍历checkBox是否全部选中
  checkBoxStateIterator(checkBoxState, data) {
    if(data.length == 0) {
      return false;
    }
    for(let item of data) {
      if(checkBoxState[item.id] == false) {
        return false;
      }
    }
    return true;
  }

  //表格排序
  sortData(data, columnIndex, isAscending) {
    let _this = this,
      key = _this.headKeyList[columnIndex];
    if(_this.columnHasString(data, columnIndex)) {
      _this.contentDataForShow = data.sort(function(o1, o2) {
        if(_this.str2Unicode(o1[key]) > _this.str2Unicode(o2[key])) {
          return isAscending ? -1 : 1;
        } else if(_this.str2Unicode(o1[key]) < _this.str2Unicode(o2[key])) {
          return isAscending ? 1 : -1;
        } else {
          return 0;
        }
      });
    } else {
      _this.contentDataForShow = data.sort(function(o1, o2) {
        if(isAscending) {
          return o2[key] - o1[key];
        } else {
          return o1[key] - o2[key];
        }
      });
    }
    _this.forceUpdate();
  }

  //该列是否含有字符类型数据
  columnHasString(data, columnIndex) {
    for (let i = 0; i < data.length; i++) {
      if(typeof(data[i][this.headKeyList[columnIndex]]) == "string") {
        return true;
      }
    }
    return false;
  }

  //将数字或字符串转换成unicode
  str2Unicode(str) {
    if(str == "") {
      return "";
    }
    if(typeof(str) == "number") {
      str = str + "";
    }
    let resultStr = "", char;
    for (let i = 0; i < str.length; i++) {
      char = str.charCodeAt(i).toString(16);
      while (char.length < 4) {
        char = '0'.concat(char);
      }
      resultStr = resultStr.concat(char);
    }
    return resultStr.toUpperCase();
  }

  //表格单元格双击可编辑
  tdOnDblClick(e, key, id) {
    if(!this.props.editable || e.target.nodeName != "TD") {return;}
    this.editTDDOM = e.target;
    this.setState({
      editLocation: {
        key,
        id
      }
    });
  }

  inputOnBlur(e, key, id) {
    if(!this.props.editable || e.target.nodeName != "INPUT") {return;}
    let editInput = e.target,
        inputText = editInput.value.trim(),
        isInputAllNumber = true;
    if(inputText == "") {
      inputText = "无";
    } else {
      for (let char of inputText) {
        if(char < "0" || char > "9") {
          isInputAllNumber = false;
          break;
        }
      }
      if(isInputAllNumber) {
        inputText = parseInt(inputText, 10);
      }
    }
    for (let i = this.startIndex; i < this.endIndex; i++) {
      if(this.props.contentData[i].id == id) {
        this.props.contentData[i][key] = inputText;
        break;
      }
    }
    for (let i = 0; i < this.props.rowsForOnePage; i++) {
      if(this.contentDataForShow[i].id == id) {
        this.contentDataForShow[i][key] = inputText;
        break;
      }
    }
    this.editTDDOM.innerText = inputText;
    this.setState({
      editLocation: {
        key: null,
        id: -1
      }
    });
    this.editTDDOM = null;
    this.forceUpdate();
  }

  //表格可调整每列的宽度
  onMouseMove(e) {
    let node = e.target,
        thDOM = this.dragThDOM,
        mouseX = e.pageX,
        tdRight = node.getBoundingClientRect().right,
        dragDistance;
    if(!["TD", "TH"].includes(node.nodeName)) { return; }
    if(mouseX <= tdRight && mouseX >= tdRight - 5) {
      node.style.cursor = "e-resize";
    } else {
      node.style.cursor = "default";
    }
    if(this.dragStartX != undefined && this.dragStartX != null) {
      dragDistance = mouseX - this.dragStartX;
      thDOM.style.width = this.dragThInitWidth + dragDistance + "px";
    }
  }

  onMouseDown(e, columnIndex) {
    let node = e.target,
        mouseX = e.pageX,
        tdRight = node.getBoundingClientRect().right;
    if(mouseX <= tdRight && mouseX >= tdRight - 5) {
      this.dragStartX = e.pageX;
      this.dragThDOM = this.refs[`column${columnIndex}`];
      if(this.dragThDOM.style.width.indexOf("%") > 0) {
        this.turnPercentToNum();
      }
      this.dragThInitWidth = this.dragThDOM.clientWidth
    }
  }

  onMouseUp() {
    if(this.dragStartX != undefined && this.dragStartX != null) {
      this.dragStartX = null;
      this.dragThInitWidth = null;
      this.dragThDOM = null;
    }
  }

  turnPercentToNum() {
    let thDOM;
    for(let i = 0; i < this.headNameList.length; i++) {
      thDOM = this.refs[`column${i}`];
      thDOM.style.width = thDOM.clientWidth + "px";
    }
  }

  //删除
  deleteData(id) {
    const { deletable, deleteDataFunc } = this.props;
    if(deletable) {
      deleteDataFunc && deleteDataFunc(id);
    }
  }

  componentWillMount() {
    let { isOptional, headData, contentData, pageIndex, rowsForOnePage } = this.props;
    for (let key in headData) {
      this.headNameList.push(headData[key]);
      this.headKeyList.push(key);
    }
    this.contentDataForShow = (pageIndex && rowsForOnePage)
      ? contentData.slice(this.startIndex, this.endIndex)
      : contentData;
    if(isOptional && this.contentDataForShow.length > 0) {
      ::this.initCheckBoxState(this.contentDataForShow);
    }
  }

  componentWillReceiveProps(nextProps) {
    let { isOptional } = this.props,
      { checkBoxState } = this.state,
      { headData, pageIndex, rowsForOnePage, contentData } = nextProps;
    if(this.headNameList.length == 0) {
      for (let key in headData) {
        this.headNameList.push(headData[key]);
        this.headKeyList.push(key);
      }
    }
    //表格翻页
    if(pageIndex) {
      if((this.props.rowsForOnePage != rowsForOnePage) || (this.props.pageIndex != pageIndex)
        || !is(this.props.contentData, contentData)  || this.contentDataForShow.length < 1) {
        this.startIndex = (pageIndex - 1) * rowsForOnePage;
        this.endIndex = pageIndex * rowsForOnePage;
        this.contentDataForShow = contentData.slice(this.startIndex, this.endIndex);
        ::this.initCheckBoxState(this.contentDataForShow);
      }
    } else if(!pageIndex) {
      this.contentDataForShow = contentData;
    }
    if(isOptional && !checkBoxState && this.contentDataForShow.length > 0) {
      ::this.initCheckBoxState(this.contentDataForShow);
    }
  }

  componentWillUnmount() {
    this.contentDataForShow = null;
  }

  render() {
    const { thClass, tdClass, isOptional, CheckBox, deletable, className } = this.props,
          { contentDataForShow } = this,
          { checkBoxState, editLocation } = this.state;
    //默认每列等宽
    const columnWidth = isOptional ? (95 / this.headNameList.length) + "%" : (100 / this.headNameList.length) + "%";
    //生成thead代码
    let headCodes = this.headNameList.map((item, index) => {
      return <th className={classNames(`thead-column-${index}`, this.formatClassName(thClass, index))}
                   ref={`column${index}`} key={index} onMouseMove={(e) => this.onMouseMove(e)}
                 onMouseDown={(e) => this.onMouseDown(e, index)} onMouseUp={::this.onMouseUp}>
              {item}
              <span title="对当前页升序排序" className="script superscript"
                    onClick={() => this.sortData(contentDataForShow, index, false)}/>
              <span title="对当前页降序排序" className="script subscript"
                    onClick={() => this.sortData(contentDataForShow, index, true)}/>
             </th>;
    });
    //生成tbody代码
    let contentCodes = contentDataForShow.map((item, index) => {
      let tdCodes = [];
      for(let i = 0; i < this.headKeyList.length; i++) {
        let key = this.headKeyList[i],
            tdContent = item[key];
        if(key == editLocation.key && item.id == editLocation.id) {
          tdContent = <input className="edit-input" ref="editInput" type="text" autofocus="autofocus" defaultValue={item[key]}
                             onBlur={(e) => this.inputOnBlur(e, key, item.id)} />
        }
        if(key == "img") {
          tdContent = item.imgLink ?
            <Link to={item.imgLink}><img src={item.imgSrc} alt="图片"/></Link>
            :
            <img className="img" src={item.imgSrc} alt="图片"/>;
        } else if(key == "link") {
          tdContent = <Link to="item.href">{item[key]}</Link>
        }
          tdCodes.push(<td className={classNames(`tbody-column-${i}`, this.formatClassName(tdClass, i))}
                           key={i} onDoubleClick={(e) => this.tdOnDblClick(e, key, item.id)} onMouseMove={(e) => this.onMouseMove(e)}
                           onMouseDown={(e) => this.onMouseDown(e, i)} onMouseUp={::this.onMouseUp}>
                        {tdContent}
                        {
                          deletable && (i == this.headKeyList.length - 1) &&
                          <i className="ic ic-close" onClick={() => this.deleteData(item.id)} />
                        }
                       </td>);
      }
      return <tr key={index}>
              {
                isOptional &&
                <td>
                  <CheckBox checked={checkBoxState[item.id]} checkBoxOnClick={::this.checkBoxClick}
                            index={item.id} value={item.id}/>
                </td>
              }
              {tdCodes}
             </tr>;
    });
    return (
      <table className={`Table ${className}`}>
        <thead>
        <tr>
          {
            isOptional && (this.headNameList.length > 0) &&
            <th title="全选当前页" className="select-all" style={{ width: "5%" }}>
              <CheckBox name="isAll" checked={checkBoxState && checkBoxState.selectAll}
                        checkBoxOnClick={::this.selectAllClick} value={null}/>
            </th>
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
  isOptional: PropTypes.bool,
  CheckBox: PropTypes.any,
  rowsForOnePage: PropTypes.number,
  pageIndex: PropTypes.number,
  editable: PropTypes.bool,
  deletable: PropTypes.bool,
  deleteDataFunc: PropTypes.func,
  checkBoxClick: PropTypes.func,
  initState: PropTypes.array
};

export default Table;