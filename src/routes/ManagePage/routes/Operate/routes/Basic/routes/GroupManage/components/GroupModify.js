/*
 *  Project : Basic
 *  Date    : 2016/7/6
 *  Author  : Melody Yuen
 *  Declare : GroupModify
 */

'use strict';
import React, {PropTypes} from 'react';
import FormItem from 'UIComponentFolder/FormComponent/FormItem';

class GroupModify extends React.Component {
  render() {
    const {data:{title}} = this.props;
    return (
      <div className="GroupModify">
        <form className="form-default">
          <FormItem title="群组名称" className="form-control w400" defaultValue={title} rules={{required: true}}
                    requireError/>
        </form>
      </div>
    );
  }
}

GroupModify.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string
  })
};

export default GroupModify;