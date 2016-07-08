'use strict';
import config from './config';

define( function() {
  var upload;
  upload = {
    checkNumAndSize(files, num, size) {  //检测添加的文件的大小和数量是否合法
      if(!files instanceof Array) {
        throw Error('Files Must Be An Array');
      }
      if(!files[0].size) {
        throw Error("Files Detail Must Be FileUpload")
      }

      var hasOverSize = false,
        maxSize = size || config.maxSize,
        maxNum = num || config.maxNum;

      files.map(function(item) {
        if( maxSize < item.size) {
          hasOverSize = true;
        }
      });

      if(hasOverSize) {
        return {
          "status": false,
          "message": "文件大小超出限制"
        }
      }

      if( maxNum < files.length) {
        return {
          "status": false,
          "message": "文件数量超过限制"
        }
      }

      return {
        "status": true
      }
    },
    getUrlByFile(file, callback) {  //通过图片对象，读取图片URL
      if(FileReader == "undefined") {
        throw Error("Can Not Use FileReader")
      }

      let reader = new FileReader();
      reader.addEventListener('load', () => {
        callback && callback(reader.result);
      }, false);

      if(file) {
        reader.readAsDataURL(file);
      }
    }

  };

  return upload;
});