import React, {PropTypes}  from 'react';

import styles from './ModifyStyle.scss';

const colorStyle = {
  white: {
    fontcolor: "#333",
    bgcolor: "#fff",
    bordercolor: "#ddd",
    topbordercolor: "#ddd",
    blackbordercolor: "rgb(221, 221, 221)",
    whitebackcolor: "#fff",
    whitebordercolor: "rgb(194, 147, 100)",
    whitecolor: "#333",
    blackcolor: "#fff",
    blackbackcolor: "#333"
  },
  black: {
    fontcolor: "rgb(136, 136, 136)",
    bgcolor: "black",
    bordercolor: "#333",
    topbordercolor: "#666",
    blackbordercolor: "rgb(194, 147, 100)",
    whitebackcolor: "#fff",
    whitebordercolor: "#333",
    whitecolor: "#333",
    blackcolor: "rgb(136, 136, 136)",
    blackbackcolor: "rgb(30, 30, 30)"
  }
};

class ModifyStyle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      color: "white"
    };
  }

  onStyleChange(e) {
    let type = e.target.getAttribute("type"),
        styleClass = e.target.getAttribute("class").split(' ')[0],
        onModifyClick = this.props.onModifyClick;
    e.stopPropagation();
    this.setState({
      [type]: styleClass
    });
    onModifyClick(styleClass);
  }

  render() {
    let color = this.state.color;
    let style = colorStyle[color];
    return (
        <section className="ModifyStyle"
                 style={{backgroundColor: style.bgcolor, border: "1px solid "+style.bordercolor}}>
          <span className={`top-${color}`}></span>

          <div className="top" style={{color: style.fontcolor, borderBottom: "1px solid "+style.topbordercolor}}>
            <span className="small text-center" type="fontSize" onClick={::this.onStyleChange}
                  style={{borderRight: "1px solid "+ style.topbordercolor}}>A-</span>
            <span className="big text-center" type="fontSize" onClick={::this.onStyleChange}>A+</span>
          </div>
          <div className="bottom text-center">
            <span className="white " type="color" onClick={::this.onStyleChange}
                  style={{borderColor: style.whitebordercolor, backgroundColor: style.whitebackcolor, color: style.whitecolor}}>A</span>
            <span className="black " type="color" onClick={::this.onStyleChange}
                  style={{borderColor: style.blackbordercolor, backgroundColor: style.blackbackcolor, color: style.blackcolor}}>A</span>
          </div>
        </section>
    );
  }
}

ModifyStyle.propTypes = {
  onModifyClick: PropTypes.func
};
export default ModifyStyle;