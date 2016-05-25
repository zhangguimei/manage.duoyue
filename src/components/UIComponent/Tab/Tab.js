import React, {PropTypes}from 'react';

class Tab extends React.Component {

  constructor(props) {
    super(props);
    let typeIndex = this.props.typeIndex || 0;
    this.state = {
      index: typeIndex
    }
  }

  handleClick(index) {
    this.setState({
      index: index
    });
    this.props.onTypeChange(index);
  }

  componentWillMount() {
    this.props.onTypeChange(this.state.index);
  }

  render() {
    const {content, tabClass} = this.props.TabItemsData;
    let picCode, picUrl, titleCode, itemClassName;
    return (
      <ul className={tabClass.tabBox}>
        {
          content.map((item, index) => {
            itemClassName = this.state.index == index ? tabClass.tabItemOn : tabClass.tabItemDefault;
            if(item.pic) {
              picUrl = this.state.index == index ? item.pic.on : item.pic.default;
              picCode = <span className='tab-item-pic' style={{ 'backgroundImage' : picUrl }}></span>;
            } else {
              picCode = null;
            }
            titleCode = item.title ? <span className="tab-title">{item.title}</span> : item;
            return (
              <li className={itemClassName} onClick={ () => this.handleClick(index) } key={index}>
                {picCode}
                {titleCode}
              </li>
            );
          })
        }
      </ul>
    );
  }
}

Tab.propTypes = {
  TabItemsData: PropTypes.object.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  typeIndex: PropTypes.number
};

export default Tab;