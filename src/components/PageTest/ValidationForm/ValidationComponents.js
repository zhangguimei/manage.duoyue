'use strict';
import React, {PropTypes} from 'react';
import ErrorShow from './ErrorShow';
import Tree from '../../UIComponent/Tree/Tree';
/*
* 1. InputF must have props: field. This is the flag of this input.
* 2. InputF can not be used as type: file.
* 3. When Input is used as radio, you should provide another props: childs,for an array.
*/
export class InputF extends React.Component {

  getInputByType() {
    const {field, inputType, children, placeholder, className = ''} = this.props;
    const inputErrorClass = field && field.error && field.touched ? "error-input" : "";
    let input;
    if(!inputType) {
      input = <input type="text" {...field} className={`${field.name}-input ${className} ${inputErrorClass}`} name={field.name} placeholder={placeholder} />
    } else if(inputType == "textarea"){
      input = <textarea {...field} className={`${field.name}-textarea ${className} ${inputErrorClass}`} name={field.name} placeholder={placeholder} />;
    } else if(inputType == "file") {
      throw Error('InputF can not be used as file');
    } else if(inputType == "radio" || inputType == "checkbox") {
      if(!children ) {
        input = <input type={inputType} {...field} className={`${field.name}-input ${className} ${inputErrorClass}`} name={field.name} placeholder={placeholder} />
      } else if(children){
        input  = children.map((item, index) => {
          return (
            <div className={`${field.name}-box`} key={index}>
              <input type={inputType} {...field} value={item.value} className={`${field.name}-input ${className} ${inputErrorClass}`} name={field.name} placeholder={placeholder} />
              <span>{item.content}</span>
            </div>
          )
        })
      }
    } else {
      input = <input type="text" {...field} className={`${field.name}-input ${className} ${inputErrorClass}`} name={field.name} placeholder={placeholder} />
    }

    return input;
  }

  render() {
    const {field, required, label, defaultPrompt, showError = true} = this.props;
    return (
      <section className={`InputF ${field.name}`}>
        <label className={`label-${field.name}`}>
          <span className={`label-span ${required ? "required" : ""}`}>{label}</span>
          {
            this.getInputByType()
          }
        </label>
        {
          showError && <ErrorShow field={field} defaultPrompt={defaultPrompt || ""}/>
        }
      </section>
    );
  }
}

InputF.propTypes = {
  field: PropTypes.object.isRequired,
  inputType: PropTypes.string,
  children: PropTypes.array,
  defaultPrompt: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string
};

/*
* For Select Input
*/
export class SelectF extends React.Component {
  render() {
    const {field, options, multiple = false, defaultPrompt, showError = true, label, className = "" } = this.props;
    return (
      <section className={`SelectF ${field.name}`}>
        { 
          label &&
            <label className="label-select">{label}</label>
        }
        <select {...field} multiple={multiple} className={`select-${field.name} ${className}`}>
          {options.map(item => <option key={item.value} value={item.value} className={`option-${field.name}`}>{item.content}</option>)}
        </select>
        {
          showError && <ErrorShow field={field} defaultPrompt={defaultPrompt || ""}/>
        }
      </section>
    )
  }
}

SelectF.propTypes = {
  field: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    content: PropTypes.any.isRequired
  })).isRequired
};

/*
* For Input Number
**/

export class InputNumber extends React.Component {

  changeValue(type) {
    const {field} = this.props;
    let value = type == "add" ? Number(field.value) + 1 : Number(field.value) - 1;
    field.onUpdate(value);
  }

  render() {
    const {field, showError = true, defaultPrompt, label, className = ""} = this.props;
    const inputErrorClass = field && field.error && field.touched ? "error-input" : "";
    return (
      <section className="InputNumber">
        {
          label &&
          <label className="label-number">{label}</label>
        }
        <div className="number">
          <input type="text" {...field} className={`number-input ${inputErrorClass} ${className}`}/>
          <div className="number-box">
            <i className="ic ic-fold modify-input" onClick={() => this.changeValue('add')}/>
            <i className="ic ic-unfold modify-input" onClick={() => this.changeValue('reduce')}/>
          </div>
        </div>
        {
          showError && <ErrorShow field={field} defaultPrompt={defaultPrompt || ""}/>
        }
      </section>
    );
  }
}

/*
*  For Input TreeData
*  Must be provide treeData
*/
export class InputTree extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showTree: false
    }
  }

  toggleShowTree() {
    this.setState({
      showTree: !this.state.showTree
    })
  }

  clickItem(data) {
    const {field} = this.props, {showTree} = this.state;
    field.onUpdate(data.name);
    if(showTree) {
      this.toggleShowTree();
    }
  }

  render() {
    const {field, treeData, label, showError = true, defaultPrompt, required = false, className = ""} = this.props,
          {showTree} = this.state;
    const inputErrorClass = field && field.error && field.touched ? "error-input" : "";
    return (
      <section className="InputTree tree">
        <div className="tree-box">
          {
            label && <span className={`label-tree ${required && "required"}`}>{label}</span>
          }
          <input type="text" {...field} className={`tree-input ${inputErrorClass} ${className}`} readOnly onClick={::this.toggleShowTree}/>
          <span onClick={() => this.clickItem("")} className="clear-tree">清除</span>
          {
            showTree && treeData &&
            <div className="tree-component">
               <Tree data={treeData} clickItem={::this.clickItem}/>
            </div>
          }
          {
            showError && <ErrorShow field={field} defaultPrompt={defaultPrompt || ""}/>
          }
        </div>
      </section>
    )
  }
}

InputTree.propTypes = {
  field: PropTypes.object.isRequired,
  treeData: PropTypes.array.isRequired,
  defaultPrompt: PropTypes.string,
  label: PropTypes.string
};


