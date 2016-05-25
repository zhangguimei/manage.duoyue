import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import PageHeader from '../PageHeader/PageHeader';
import PageSidebar from '../PageSidebar/PageSidebar';
import styles from './Manage.scss';

class Manage extends React.Component {

  render() {
    const {children,defaultPath} = this.props;
    const headerData = [
      {
        "id": 1,
        "title": "用户中心",
        "icon":  "icon-user",
        "children": [
          {
            "id": 11,
            "title": "用户管理",
            "children": [
              {
                "id": 111,
                "title": "用户查询",
                "children": []
              },
              {
                "id": 112,
                "title": "用户图片",
                "children": []
              },
              {
                "id": 113,
                "title": "用户视频",
                "children": []
              },
              {
                "id": 114,
                "title": "群组管理",
                "children": []
              }
            ]
          },
          {
            "id": 12,
            "title": "资讯/评论",
            "children": [
              {
                "id":121,
                "title":"书籍咨询",
                "children":[]
              },
              {
                "id":122,
                "title":"文章评论",
                "children":[]
              },
              {
                "id":123,
                "title":"书籍评论",
                "children":[]
              },
              {
                "id":124,
                "title":"资源评论",
                "children":[]
              },
              {
                "id":125,
                "title":"商品咨询",
                "children":[]
              },
              {
                "id":126,
                "title":"微信直播",
                "children":[]
              }
            ]
          },
          {
            "id": 13,
            "title": "作者管理",
            "children": [
              {
                "id": 131,
                "title": "作者查询",
                "children": []
              },
              {
                "id": 132,
                "title": "作者分类",
                "children": []
              }
            ]
          },
          {
            "id": 14,
            "title": "圈子管理",
            "children": [
              {
                "id": 141,
                "title": "圈子查询",
                "children": []
              },
              {
                "id": 142,
                "title": "内容管理",
                "children": []
              }
            ]
          },
          {
            "id": 15,
            "title": "活动管理",
            "children": [
              {
                "id": 151,
                "title": "活动列表",
                "children": []
              },
              {
                "id": 152,
                "title": "活动相册",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "id": 2,
        "title": "资源中心",
        "icon": "icon-resource",
        "children": [
          {
            "id": 21,
            "title": "文章咨询",
            "children": [
              {
                "id": 211,
                "title": "文章查询",
                "children":[]
              },
              {
                "id": 212,
                "title": "文章分类",
                "children":[]
              }
            ]
          },
          {
            "id": 22,
            "title": "书籍管理",
            "children": [
              {
                "id": 221,
                "title": "书籍查询",
                "children": []
              },
              {
                "id": 222,
                "title": "书籍分类",
                "children": []
              }
            ]
          },
          {
            "id": 23,
            "title": "期刊管理",
            "children": [
              {
                "id": 231,
                "title": "期刊查询",
                "children": []
              },
              {
                "id": 232,
                "title": "期刊分类",
                "children": []
              }
            ]
          },
          {
            "id": 24,
            "title": "电子资源",
            "children": [
              {
                "id": 241,
                "title": "资源查询",
                "children": []
              },
              {
                "id": 242,
                "title": "资源统计",
                "children": []
              },
              {
                "id": 243,
                "title": "流量趋势",
                "children": []
              },
              {
                "id": 244,
                "title": "资源分类",
                "children": []
              }
            ]
          },
          {
            "id": 25,
            "title": "商品管理",
            "children": [
              {
                "id": 251,
                "title": "商品查询",
                "children": []
              },
              {
                "id": 252,
                "title": "商品分类",
                "children": []
              }
            ]
          },
          {
            "id": 26,
            "title": "众筹管理",
            "children": []
          },
          {
            "id": 27,
            "title": "视频管理",
            "children": [
              {
                "id": 271,
                "title": "视频查询",
                "children": []
              },
              {
                "id": 272,
                "title": "视频分类",
                "children": []
              }
            ]
          },
          {
            "id": 28,
            "title": "验证码商品",
            "children": []
          },
          {
            "id": 29,
            "title": "标签体系",
            "children": [
              {
                "id": 291,
                "title": "标签结构",
                "children": []
              },
              {
                "id": 292,
                "title": "扩展属性",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "title": "运营中心",
        "icon": "icon-operation",
        "children": [
          {
            "id": 21,
            "title": "公号列表",
            "children": []
          },
          {
            "id": 22,
            "title": "展示设置",
            "children": [
              {
                "id": 221,
                "title": "橱窗管理",
                "children": [
                  {
                    "id": 2211,
                    "title": "商品橱窗",
                    "children": []
                  },
                  {
                    "id": 2212,
                    "title": "书籍橱窗",
                    "children": []
                  },
                  {
                    "id": 2213,
                    "title": "资源橱窗",
                    "children": []
                  }
                ]
              },
              {
                "id": 222,
                "title": "发票选项",
                "children": []
              }
            ]
          },
          {
            "id": 23,
            "title": "基础配置",
            "children": [
              {
                "id": 231,
                "title": "公号设置",
                "children": []
              },
              {
                "id": 232,
                "title": "运营设置",
                "children": []
              },
              {
                "id": 233,
                "title": "响应消息",
                "children": []
              },
              {
                "id": 234,
                "title": "自定义菜单",
                "children": []
              },
              {
                "id": 235,
                "title": "群组管理",
                "children": []
              },
              {
                "id": 236,
                "title": "默认回复",
                "children": []
              }
            ]
          },
          {
            "id": 24,
            "title": "用户管理",
            "children": [
              {
                "id": 241,
                "title": "用户查询",
                "children": []
              },
              {
                "id": 242,
                "title": "收到的消息",
                "children": []
              },
              {
                "id": 243,
                "title": "图文素材",
                "children": []
              }
            ]
          },
          {
            "id": 25,
            "title": "应用管理",
            "children": [
              {
                "id": 251,
                "title": "二维码应用",
                "children": []
              },
              {
                "id": 252,
                "title": "关键字应用",
                "children": []
              },
              {
                "id": 253,
                "title": "红包应用",
                "children": [
                  {
                    "id": 2531,
                    "title": "红包活动",
                    "children": []
                  },
                  {
                    "id": 2532,
                    "title": "红包池",
                    "children": []
                  },
                  {
                    "id": 2533,
                    "title": "红包统计",
                    "children": []
                  }
                ]
              }
            ]
          },
          {
            "id": 26,
            "title": "消息管理",
            "children": [
              {
                "id": 261,
                "title": "模块消息群发",
                "children": []
              },
              {
                "id": 262,
                "title": "图文消息群发",
                "children": []
              },
              {
                "id": 263,
                "title": "短信消息群发",
                "children": []
              },
              {
                "id": 264,
                "title": "邮件消息群发",
                "children": []
              },
              {
                "id": 265,
                "title": "系统消息设置",
                "children": []
              },
              {
                "id": 266,
                "title": "消息发送日志",
                "children": []
              }
            ]
          },
          {
            "id": 27,
            "title": "统计分析",
            "children": [
              {
                "id": 271,
                "title": "流量统计",
                "children": [
                  {
                    "id": 2711,
                    "title": "流量统计",
                    "children": [
                      {
                        "id": 27111,
                        "title": "30天流量",
                        "children": []
                      },
                      {
                        "id": 27112,
                        "title": "书籍流量",
                        "children": []
                      },
                      {
                        "id": 27113,
                        "title": "文章流量",
                        "children": []
                      },
                      {
                        "id": 27114,
                        "title": "资源流量",
                        "children": []
                      },
                      {
                        "id": 27115,
                        "title": "商品流量",
                        "children": []
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": 28,
            "title": "商品管理",
            "children": [
              {
                "id": 281,
                "title": "商户列表",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "id":4,
        "title":"官网管理",
        "icon":"icon-home",
        "children":[
          {
            "id":41,
            "title":"网站列表",
            "children":[]
          },
          {
            "id":42,
            "title":"广告管理",
            "children":[]
          },
          {
            "id":43,
            "title":"模板管理",
            "children":[]
          },
          {
            "id":44,
            "title":"广告区域",
            "children":[]
          },
          {
            "id":45,
            "title":"静态页更新",
            "children":[]
          }
        ]
      },
      {
        "id":5,
        "title":"销售结算",
        "icon":"icon-sales",
        "children":[
          {
            "id":51,
            "title":"订单管理",
            "children":[
              {
                "id":511,
                "title":"订单查询",
                "children":[]
              },
              {
                "id":512,
                "title":"订单导出",
                "children":[]
              }
            ]
          },
          {
            "id":52,
            "title":"分销结算",
            "children":[]
          },
          {
            "id":53,
            "title":"购物车管理",
            "children":[
              {
                "id":531,
                "title":"购物车用户",
                "children":[]
              },
              {
                "id":532,
                "title":"购物车商品",
                "children":[]
              }
            ]
          }
        ]
      },
      {
        "id":6,
        "title":"分析引擎",
        "icon":"icon-analysis",
        "children":[
          {
            "id":61,
            "title":"用户分析",
            "children":[
              {
                "id":611,
                "title":"热力图",
                "children":[]
              },
              {
                "id":612,
                "title":"聚合图",
                "children":[]
              },
              {
                "id":613,
                "title":"海量图",
                "children":[]
              },
              {
                "id":614,
                "title":"男女分布",
                "children":[]
              },
              {
                "id":615,
                "title":"阅读排行",
                "children":[]
              },
              {
                "id":616,
                "title":"时长分析",
                "children":[]
              },
              {
                "id":617,
                "title":"用户增长",
                "children":[]
              }
            ]
          },
          {
            "id":62,
            "title":"资源分析",
            "children":[
              {
                "id":621,
                "title":"资讯排行",
                "children":[]
              },
              {
                "id":622,
                "title":"资讯时长",
                "children":[]
              },
              {
                "id":623,
                "title":"书籍排行",
                "children":[]
              },
              {
                "id":624,
                "title":"书籍时长",
                "children":[]
              }
            ]
          },
          {
            "id":63,
            "title":"销售分析",
            "children":[
              {
                "id":631,
                "title":"热销商品",
                "children":[]
              },
              {
                "id":632,
                "title":"销售统计",
                "children":[]
              }
            ]
          },
          {
            "id":64,
            "title":"时段分析",
            "children":[
              {
                "id":641,
                "title":"全部内容",
                "children":[]
              },
              {
                "id":642,
                "title":"自然关注",
                "children":[]
              },
              {
                "id":643,
                "title":"扫码关注",
                "children":[]
              },
              {
                "id":644,
                "title":"取消关注",
                "children":[]
              },
              {
                "id":645,
                "title":"扫一扫",
                "children":[]
              },
              {
                "id":646,
                "title":"浏览阅读",
                "children":[]
              },
              {
                "id":647,
                "title":"订单支付",
                "children":[]
              },
              {
                "id":648,
                "title":"参与支付",
                "children":[]
              },
              {
                "id":649,
                "title":"分享内容",
                "children":[]
              }
            ]
          }
        ]
      },
      {
        "id":7,
        "title":"系统管理",
        "icon":"icon-system",
        "children":[
          {
            "id":71,
            "title":"员工账号",
            "children":[]
          },
          {
            "id":72,
            "title":"角色权限",
            "children":[]
          },
          {
            "id":73,
            "title":"系统账号",
            "children":[]
          }
        ]
      }
    ];
    return (
      <div className="Manage">
        <PageHeader data={headerData} />
        <PageSidebar data={headerData} />
        <div className="PageMain">
          {children && React.cloneElement(this.props.children)}
        </div>
      </div>
    )
  }
}

Manage.propTypes = {
  children: PropTypes.node,
  defaultPath: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    defaultPath: ownProps.location.pathname
  }
}
export default connect(mapStateToProps)(Manage);