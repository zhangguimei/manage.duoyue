import React, {PropTypes}from 'react';
import shouldComponentUpdate from '../../../../utils/shouldComponentUpdate';

class Tab extends React.Component {

  static defaultProps = {
    typeIndex: 0
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  handleClick(index) {
    this.props.onTypeChange(index);
  }

  componentWillMount() {
    this.props.onTypeChange(this.props.typeIndex);
  }

  render() {
    const { TabItemsData: {content, tabClass}, typeIndex } = this.props;
    let picCode, picUrl, titleCode, itemClassName;
    return (
      <ul className={tabClass.tabBox}>
        {
          content.map((item, index) => {
            itemClassName = typeIndex == index ? tabClass.tabItemOn : tabClass.tabItemDefault;
            if(item.pic) {
              picUrl = typeIndex == index ? item.pic.on : item.pic.default;
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
  typeIndex: PropTypes.number.isRequired
};

export default Tab;