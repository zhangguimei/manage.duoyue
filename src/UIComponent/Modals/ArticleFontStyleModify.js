import React, {PropTypes}  from 'react';
import classnames from 'classnames';
import styles from './ArticleFontStyleModify.scss';

class ArticleFontStyleModify extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showFontFamily: true, //控制字体选择的显示
      color: "white" //控制组件的颜色
    }
  }

  onReturnClick() {
    this.setState({
      showFontFamily: !this.state.showFontFamily
    })
  }

  onTypeClick(e) {
    let target = e.target, classname = target.getAttribute("class");
    let type = target.getAttribute("type"), value = classname.substring(0, classname.indexOf(" "));
    this.setState({
      [type]: value
    });
    this.props.onTypeChangeClick(type, value);
  }

  render() {
    const { data: {color, fontFamily, readType} } = this.props;
    let fontData = {
      "fontFamily": [
        {"name": "FZSSJW", "title": "书宋简体"},
        {"name": "FZLTXHJW", "title": "兰亭纤黑"},
        {"name": "YaHei", "title": "默认字体"}
      ],
      "color": ["white", "gray", "green", "pint", "blue"],
      "readType": [
        {"name": "horizontal", "title": "左右滑动"},
        {"name": "vertical", "title": "上下滑动"}
      ]
    };
    let hoverClass = color == "black" ? "night-active" : "normal-active";
    let fontFamilyCode = fontData.fontFamily.map((item, index) => {
      return (
          <span className="articleStyleFont" key={index}>
          <span className={classnames(item.name ,"articleFontContent", item.name == fontFamily ? hoverClass : "")}
                type="fontFamily"
                onClick={::this.onTypeClick}>{item.title}</span>
        </span>
      );
    });
    let colorCode = fontData.color.map((item, i) => {
      return (
          <span className="bg-container text-center" key={i}>
            <span className={classnames(item, "fontStyleItem", item == color ? hoverClass : "")} type="color"
                  onClick={::this.onTypeClick}/>
          </span>
      )
    });
    let readTypeCode = fontData.readType.map((item, index) => {
      return (
          <span key={index} className={classnames(item.name ,"fz-btn", item.name == readType ? hoverClass : "")}
                type="readType" onClick={::this.onTypeClick}>{item.title}</span>
      );
    });

    return (
        <div className="ArticleFontStyleModify">
          <div className="StyleBox">
            <div className="arrow ic ic-caretdown"></div>
            <div className={"checkstyle"}>
              <div className="top">
                <span className="row-title">大小</span>

                <div className="fz-panel">
                  <span className="small fz-btn " type="size" onClick={::this.onTypeClick}>A-</span>
                  <span className="big fz-btn " type="size" onClick={::this.onTypeClick}>A+</span>
                </div>
              </div>
              <div className="middle">
                <span className="row-title">字体</span>

                <div className="font-panel">
                  {fontFamilyCode}
                </div>
              </div>
              <div className="swipe-model">
                <span className="row-title">模式</span>

                <div className="fz-panel">
                  {readTypeCode}
                </div>
              </div>
              {
                color != "black" &&
                <div className="bottom">
                  <span className="row-title">背景</span>

                  <div className="bg-panel">
                    {colorCode}
                  </div>
                </div>
              }
            </div>
          </div>
          )
        </div>
    );
  }
}

ArticleFontStyleModify.propTypes = {
  data: PropTypes.shape({
    color: PropTypes.string,
    PropTypes: PropTypes.string,
    readType: PropTypes.string
  }).isRequired,
  ArticleFontStyleModify: PropTypes.func
};
export default ArticleFontStyleModify;