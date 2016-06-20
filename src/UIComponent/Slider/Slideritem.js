import React, {PropTypes} from 'react';
import  { Link } from 'react-router';

class SliderItem extends React.Component {

  render() {
    const item = this.props.data;
    let title = this.props.title;
    let contentCode = item.href ?
        <Link to={item.href || '#'}>
          <div className="slider-img-container">
            <img src={item.url} alt={item.title} title={item.title}/>
          </div>
          {title && <span className="slider-item-title">{item.title}</span> }
        </Link>
        : <div>
      <div className="slider-img-container">
        <img src={item.url} alt={item.title} title={item.title}/>
      </div>
      {title && <span className="slider-item-title">{item.title}</span> }
    </div>
    return (
        <li className="SliderItem slider-item" key={item.id}>
          {contentCode}
        </li>
    );
  }
}

SliderItem.propTypes = {
  data: PropTypes.shape({
    href: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired
};

export default SliderItem;