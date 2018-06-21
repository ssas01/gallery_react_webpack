require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

// 获取图片的相关数据
import imageDatas from './imageDatas';
// 根据图片名称请求图片
const imageDatasDeal = (function (imageDatasArr) {
    for (var i = 0; i < imageDatasArr.length; i++) {
        imageDatasArr[i].imageURL = require('../images/' + imageDatasArr[i].fileName);
    }
    return imageDatasArr;
})(imageDatas)

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
          <section className="image-sec"></section>
          <nav className="controller-nav"></nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
