import React, {PropTypes}  from 'react';
import ChartJS from  'chart.js';
import {is, fromJS} from 'immutable';

import shouldComponentUpdate from '../../utils/shouldComponentUpdate';
import styles from './Chart.scss';

const defaultColor = (opacity = 1) => {
  return `rgba(74, 154, 211, ${opacity})`;
};

const setDefaultGlobalConfig = (origin = [], config = {}) => {
  switch (origin.length) {
    case 1:
      ChartJS.defaults.global[origin[0]] = fromJS(ChartJS.defaults.global[origin[0]]).merge(config).toJS();
      break;
    case 2:
      ChartJS.defaults.global[origin[0]][origin[1]] = fromJS(ChartJS.defaults.global[origin[0]][origin[1]]).merge(config).toJS();
      break;
    default:
      break;
  }
};

setDefaultGlobalConfig(['elements', 'line'], {
  borderColor: defaultColor(),
  borderWidth: 2,
  backgroundColor: defaultColor(0.5)
});

setDefaultGlobalConfig(['elements', 'point'], {
  radius: 4,
  backgroundColor: defaultColor(0.5),
  borderWidth: 1,
  borderColor: defaultColor(),
  hoverRadius: 5
});

setDefaultGlobalConfig(['elements', 'rectangle'], {
  backgroundColor: defaultColor(0.5),
  borderWidth: 1,
  borderColor: defaultColor()
});

setDefaultGlobalConfig(['legend'], {
  display: false
});

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.myChart = null;
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  initMyChart(chartData) {
    const {type, data, options} = chartData;
    let myChartCvs = this.refs.myChartCvs;
    myChartCvs && (
      this.myChart = new ChartJS(myChartCvs, {
        type: `${type}`,
        data: data,
        options: options
      })
    )
  }

  updateChart(newData) {
    this.myChart.destroy();
    this.initMyChart(newData);
  }

  componentDidMount() {
    this.initMyChart(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const IthisProps = fromJS(this.props), InextProps = fromJS(nextProps);
    if (!is(IthisProps, InextProps)) {
      this.updateChart(nextProps);
    }
  }

  componentWillUnmount() {
    this.myChart.destroy();
  }

  render() {
    const {width, height} = this.props;
    return (
      <div className="Chart">
        <canvas className="chart-cvs" ref="myChartCvs" width={width} height={height}></canvas>
      </div>
    );
  }
}

Chart.PropTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired
};

export default Chart;