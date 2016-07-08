'use strict';
import React from 'react';
import {findDOMNode} from 'react-dom';
import config from './config';
import tools from './tools.js';

class ShowThumbnailImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: "" 
    }
  }

  componentDidMount() {
    const {file} = this.props, img = findDOMNode(this.refs.img);
    this.changeSrc(file, img);
  }

  changeSrc(file, img) {
    const _this = this;
    let setUrl = (url) => {
      _this.setState({
        imgUrl: url
      });
    };

    if(img) {
      tools.getUrlByFile(file, setUrl);
    }
  }

  componentWillReceiveProps(np) {
    const img = findDOMNode(this.refs.img);
    if(np.file.name != this.props.file.name) {
      this.setState({
        imgUrl: ""
      });
      this.changeSrc(np.file, img)
    }
  }

  render() {
    const {file} = this.props, reg = config.imgExq, {imgUrl} = this.state;
    return (
      <div className="ShowBreviaryImg">
        {
          file.name.toLowerCase().match(reg) && imgUrl && <img src="" alt={file.name} ref="img" height="50" width="50"/>
        }
      </div>
    );
  }
}

export default ShowThumbnailImg;