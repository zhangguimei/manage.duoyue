/*
 *  Date    : 2016.7.4
 *  Author  : Ao Zhenzhen
 *  Declare : 运营中心-展示设置-应用管理-微信二维码点击配置-响应消息
 */

'use strict';
import React from 'react';
import PhotoMaterial from 'PageComponentFolder/PhotoMaterial/PhotoMaterial';
import Tab from 'UIComponentFolder/Tab/Tab';
import Table from 'UIComponentFolder/Table/Table';
import Pagination from 'UIComponentFolder/Pagination/Pagination';
import styles from './WeiXinQRcode.scss';

class ResponseMessage extends PhotoMaterial {
  render() {
    const {pageIndex, tableData:{tableHeadData, tableContentData}, selectedID, showTable} = this.state,
      {itemsForOnePage, data, navData} = this.props;
    const totalPages = Math.ceil(tableContentData.length / itemsForOnePage),
      tabContent = navData.map((item) => {
        return Object.values(item)[0]
      }),
      TabItemsData = {
        content: tabContent,
        tabClass: {
          tabBox: "tab-nav",
          tabItemOn: "active"
        }
      };
    let allMultiData = [];//所有类型数据
    for (let i in data) {
      allMultiData = allMultiData.concat(data[i].tableContentData);
    }
    let selectedList = [];
    selectedID.forEach((id) => {
      selectedList = selectedList.concat(allMultiData.filter((item) => item.id == id));
    });
    return (
      <div className="PhotoMaterial">
        <div className="multi-left">
            {
              selectedList.length ? <ul className="qrcode-item-main">
                {
                  selectedList.map((item, index) => {
                    return (
                      <li className="inner" key={index}>
                        {
                          index == 0 && <div className="item">
                            {
                              selectedList.length == 1 &&
                              <div className="qrcode-tip-tit">{item.title}</div>
                            }
                            <div className="qrcode-tip-img">
                              <a href="javascript:;" onClick={() => this.props.toggleMessageLayer(item)}>
                                <img src={item.pic} alt={item.pic} title={item.pic}/>
                                <div className="meg-tit">{item.title}</div>
                              </a>
                            </div>

                            {
                              selectedList.length == 1 && <div>
                                <div className="qrcode-tip-abstract">{item.itemAbstract}</div>
                                <div><a href="javascript:;" onClick={() => this.props.toggleMessageLayer(item)}>查看全文</a>
                                </div>
                              </div>
                            }
                            <div className="delete" onClick={() => this.onDeleteClick(item.id)}>删除</div>
                          </div>
                        }
                        {
                          index > 0 && <div className="">
                            <a href="javascript:;" onClick={() => this.props.toggleMessageLayer(item)}>
                              <div className="item">
                                <div className="qrcode-item-tit left">{item.title}</div>
                                <div className="qrcode-item-img">
                                  <img src={item.pic} alt={item.pic} title={item.pic}/>
                                </div>
                              </div>
                            </a>
                            <div className="delete" onClick={() => this.onDeleteClick(item.id)}>删除</div>
                          </div>
                        }
                      </li>
                    )
                  })
                }
              </ul> : <div className="onMessage">没有响应信息</div>
            }
        </div>
        <div className="multi-main">
          <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange}/>
          <div className="form-inline">
            <div className="form-group form-group-sm">
              <label>分类&nbsp;&nbsp;</label>
              <input className="form-control"/>
            </div>
            <div className="form-group form-group-sm ml10">
              <label>文章标题&nbsp;&nbsp;</label>
              <input className="form-control"/>
            </div>
            <input className="btn btn-primary btn-sm w80 ml10" type="button" value="搜索"/>
          </div>
          <div className="table-wrap">
            {
              showTable &&
              <Table className="table-left" contentData={tableContentData} headData={tableHeadData} isOptional={true}
                     rowsForOnePage={itemsForOnePage} pageIndex={pageIndex}
                     checkBoxClick={::this.onCheckClick} initState={selectedID}/>
            }
            <Pagination totalPages={totalPages} index={pageIndex} onPageClick={::this.onPageClick}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ResponseMessage;