/*
* Config Of UpLoad
*/
const config = {
  maxSize: 10*1024*1024,  //单个最大上传大小
  //allMaxSize: 20*1024*1024, //总共最大上传大小
  maxNum: 10,  //最大上传数量,
  imgExq: /.jpeg|.jpg|.gif|.png|.bmp|.svg$/,  //可以上传图片的类型
  typeExq: /.zip|.rar|.txt|.xml|.jpeg|.jpg|.gif|.png|.bmp|.svg|.mp3|.mp4|.pdf$/ //所有允许上传的文件类型
};

export default config;