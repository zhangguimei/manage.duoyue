/*
 *  Project : MatchList
 *  Date    : 2016.6.29
 *  Author  : Zhou Xian
 *  Declare : Match Input
 */
import React, {PropTypes} from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

const sexRadio = [
    {
      "id": 11,
      "value": "男"
    },
    {
      "id": 12,
      "value": "女"
    }
  ],
  hobbyCheckbox = [
    {
      "id": 21,
      "value": "吃吃吃"
    },
    {
      "id": 22,
      "value": "看电影"
    },
    {
      "id": 23,
      "value": "听歌"
    },
    {
      "id": 24,
      "value": "码代码"
    }
  ],
  addressSelect = [
    {
      "id": 1,
      "value": "湖北",
      "subOptions": [
        {
          "id": 11,
          "value": "武汉"
        },
        {
          "id": 12,
          "value": "荆州"
        },
        {
          "id": 13,
          "value": "黄石"
        }
      ]
    },
    {
      "id": 2,
      "value": "广东",
      "subOptions": [
        {
          "id": 21,
          "value": "广州"
        },
        {
          "id": 22,
          "value": "深圳"
        },
        {
          "id": 23,
          "value": "湛江"
        }
      ]
    },
    {
      "id": 3,
      "value": "湖南",
      "subOptions": [
        {
          "id": 31,
          "value": "长沙"
        },
        {
          "id": 32,
          "value": "衡阳"
        },
        {
          "id": 33,
          "value": "湘潭"
        }
      ]
    }
  ],
  jobSelect = [
    {
      "id": 41,
      "value": "学生"
    },
    {
      "id": 42,
      "value": "教师"
    },
    {
      "id": 43,
      "value": "程序员"
    },
    {
      "id": 44,
      "value": "无工作"
    }
  ];

class MatchInputs extends React.Component {
  render() {
    const {data, checkData}=this.props;
    return (
      <div className="MatchInputs form-inline">
        <div className="inputs-header">{data.title}</div>
        <div className="input-container">
          {
            checkData[0].isSelected &&
            <FormItem type="radio" name="sex" title="性别" defaultValue={11} options={sexRadio}/>
          }
          {
            checkData[1].isSelected &&
            <FormItem type="text" name="age" title="年龄" className="form-control"/>
          }
          {
            checkData[2].isSelected &&
            <FormItem type="textarea" name="desc" title="详情" className="form-control"/>
          }
          {
            checkData[3].isSelected &&
            <FormItem type="imageUpload" name="headImg" title="头像"/>
          }
          {
            checkData[4].isSelected &&
            <FormItem type="checkbox" name="hobby" title="爱好" defaultValue={[]} options={hobbyCheckbox}/>
          }
          {
            checkData[5].isSelected &&
            <FormItem type="dblSelect" name="address" title="地址" className="form-control" defaultValue={[]}
                      options={addressSelect}/>
          }
          {
            checkData[6].isSelected &&
            <FormItem type="text" name="phoneNum" title="手机号" className="form-control"/>
          }
          {
            checkData[7].isSelected &&
            <FormItem type="text" name="name" title="姓名" className="form-control"/>
          }
          {
            checkData[8].isSelected &&
            <FormItem type="select" name="job" title="职业" defaultValue="" options={jobSelect} className="form-control"/>
          }
          {
            checkData[9].isSelected &&
            <FormItem type="text" name="peopleNum" title="人数" className="form-control"/>
          }
        </div>
      </div>
    )
  }
}
MatchInputs.propTypes = {
  data: PropTypes.object,
  checkData: PropTypes.array
};
export default MatchInputs;