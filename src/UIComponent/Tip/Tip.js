import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import styles from './Tip.scss';

class Tip extends React.Component {

  render() {
    const {title="", itemData=[], isLink=false, titleUrl=""} = this.props;
    let TipContent =
      (<ul className="tip-ul">
        <li className="title item">
          {
            isLink ? <Link to={titleUrl}>{title}</Link> : {title}
          }
        </li>
        {
          itemData.map((item, i)=> {
            return (
              <li className="item" key={i}>
                {
                  isLink ? <Link to={item.url}>{item.name}</Link> : <li className="item" key={i}>{item}</li>
                }
              </li>
            )

          })
        }
      </ul>);
    return (
      <div className="Tip">
        {TipContent}
      </div>
    );
  }
}

Tip.propTypes = {
  className: PropTypes.string,
  isLink: PropTypes.bool,
  titleUrl: PropTypes.string,
  itemData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.url
  }))
};

export default Tip;

