/*
 *  Project : MatchList
 *  Date    : 2016.6.29
 *  Author  : Zhou Xian
 *  Declare : Entry Link
 */
import React, {PropTypes} from 'react';
import MatchInputs from './MatchInputs';

class EntryLink extends React.Component {
  constructor(props) {
    super(props);
    this.inputShowID = [];
  }

  componentWillMount() {
    for (let i = 0; i < 10; i++) {
      this.inputShowID.push({
        "id": i,
        "isSelected": true
      });
    }
  }

  render() {
    const {matchInfo}=this.props, {inputShowID}=this;
    return (
      <div className="EntryLink">
        <div className="clearfix">
          <div className="entryLink-pic left">
            <img src={matchInfo.entryImg}/>
            <div className="entry-btn">进入报名</div>
          </div>
          <div className="entryLink-inputs left">
            <MatchInputs checkData={inputShowID} data={matchInfo}/>
          </div>
          <div className="entryLink-url left">
            <div className="entryLink-url-item">
              <div>洛克里尼</div>
              <div>http://v2.duoyue.me/wechat/11356/5580/match/display.aspx?id=31</div>
            </div>
            <div className="entryLink-url-item">
              <div>煮酒风云</div>
              <div>http://v2.duoyue.me/wechat/11356/5594/match/display.aspx?id=31</div>
            </div>
            <div className="entryLink-url-item">
              <div>吉品印象</div>
              <div>http://v2.duoyue.me/wechat/11356/5563/match/display.aspx?id=31</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EntryLink.propTypes = {
  matchInfo: PropTypes.object
};

export default EntryLink;