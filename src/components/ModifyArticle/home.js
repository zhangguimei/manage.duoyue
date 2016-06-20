import React, {PropTypes} from 'react';
import ArticleTop from './ArticleTop';
import Tab from '../UIComponent/Tab/Tab';
import BasicInfo from './basicInfo';
import Source from './source';
import Cookies from './cookies';
import Recommend from './recommend';
import Tags from './tags';
import Code from './code';
import Account from './account'
import styles from './ModifyArticle.scss';
const navData = [{'info': '基本信息'}, {'source': '资源'}, {'tag': '标签'}, {'maxCard': '二维码'}, {'Cookies': '浏览记录'}, {'account': '分账设置'}, {'recommend': '相关推荐'}];
const tabContent = navData.map((item) => {
  return Object.values(item)[0]
});

let TabItemsData = {
  content: tabContent,
  tabClass: {
    tabBox: "article-nav clearfix",
    tabItemOn: "over left",
    tabItemDefault: "out left"
  }
};
class ModifyPageHome extends React.Component {
  constructor(props) {
    super(props);
    this.type = 0; //记录当前资源类型
    this.changed = true; //判断是否资源类型发生变化
    this.state = {
      index: 0
    };
  }

  onTypeChange(index) {
    this.setState({
      index: index
    });
  }

  render() {
    const {index} =this.state,
      {data} = this.props;
    return (
      <div className="ModifyPageHome">
        <ArticleTop data={data}/>
        <Tab TabItemsData={TabItemsData} onTypeChange={::this.onTypeChange}/>
        { index == 0 && <BasicInfo data={data}/>}
        { index == 1 && <Source/>}
        { index == 2 && <Tags/>}
        { index == 3 && <Code/>}
        { index == 4 && <Cookies/>}
        { index == 6 && <Recommend/>}
        { index == 5 && <Account/>}
      </div>
    )
  }
}

ModifyPageHome.PropTypes = {
  data: PropTypes.array.isRequired,
  TabItemsData: PropTypes.array.isRequired,
  onTypeChange: PropTypes.func.isRequired
}

export default ModifyPageHome;
