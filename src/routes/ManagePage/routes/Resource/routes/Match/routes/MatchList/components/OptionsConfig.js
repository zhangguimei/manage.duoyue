/*
 *  Project : MatchList
 *  Date    : 2016.6.29
 *  Author  : Zhou Xian
 *  Declare : Options Config
 */
import React, {PropTypes} from 'react';

import Table from 'UIComponentFolder/Table/Table';
import ShowPage from 'UIComponentFolder/Modals/ShowPage';
import Modal from 'UIComponentFolder/Modals/Modal';

import MatchInputs from './MatchInputs';

class OptionsConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBoxState: false,
      showModal: false
    };
    this.inputShowID = [];
  }

  componentWillMount() {
    for (let i = 0; i < 10; i++) {
      this.inputShowID.push({
        "id": i,
        "isSelected": false
      });
    }
  }

  selectInputItem(id, isSelected) {
    this.inputShowID.map((item)=> {
      if(id == item.id) {
        item.isSelected = isSelected;
        return;
      }
    });
    this.forceUpdate();
  }

  createInputPage() {
    const {showModal} = this.state;
    this.setState({
      showModal: !showModal
    });
  }

  render() {
    const {tableData, matchInfo} = this.props, {inputShowID} = this, {showModal} = this.state;
    return (
      <div className="OptionsConfig clearfix">
        <div className="config-left left">
          <MatchInputs checkData={inputShowID} data={matchInfo}/>
        </div>
        <div className="config-right left">
          <div className="form-config form-inline">
            <div className="related-search-box">
              <input className="w200 form-control input-sm"/>
              <button className="btn btn-primary btn-sm w80 ml10">查询</button>
              <button className="btn btn-primary btn-sm right" onClick={::this.createInputPage}>新增表单选项</button>
            </div>
          </div>
          <div className="config-table">
            <Table headData={tableData.tableHeadData} contentData={tableData.tableContentData}
                   isOptional={true} checkBoxClick={::this.selectInputItem}/>
          </div>
        </div>
        {
          showModal &&
          <Modal onModalClick={::this.createInputPage}>
            <ShowPage closeShowPage={::this.createInputPage} width="50%" height="70%">
              <div className="showPageTable form-horizontal form-horizontal-lg">
                <div className="form-group">
                  <label className="control-label"><span className="text-danger">*</span>选项类型：</label>
                  <div className="control-body">
                    <select name="item_input_type" className="form-control">
                      <option value="0">文本域</option>
                      <option value="1">多行文本域</option>
                      <option value="2">单选按钮</option>
                      <option value="3">复选框</option>
                      <option value="4">选择（列表/菜单）</option>
                      <option value="5">2级选择（列表/菜单）</option>
                      <option value="6">文件域</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label"><span className="text-danger">*</span>选项名称：</label>
                  <div className="control-body">
                    <input type="text" className="w200 form-control"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label"><span className="text-danger">*</span>选项说明：</label>
                  <div className="control-body">
                    <input type="text" className="w200 form-control"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">数据类型：</label>
                  <div className="control-body">
                      <select name="item_data_type" className="form-control">
                        <option value="text">不限</option>
                        <option value="Number">数字</option>
                        <option value="Chinese">汉字</option>
                        <option value="English">字母</option>
                        <option value="Date">日期</option>
                        <option value="Email">邮箱</option>
                        <option value="Mobile">手机</option>
                        <option value="Phone">固话</option>
                        <option value="IdCard">身份证</option>
                      </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">备注说明：</label>
                  <div className="control-body">
                    <input type="text" className="w200 form-control"/>
                  </div>
                </div>
              </div>
            </ShowPage>
          </Modal>
        }
      </div>
    )
  }
}

OptionsConfig.propTypes = {
  tableData: PropTypes.object,
  matchInfo: PropTypes.object
};

export default OptionsConfig;