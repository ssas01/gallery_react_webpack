## 样式 loader

### sass-loader

> 安装依赖，新版的需要 node-sass。可能对 webpack 版本也有需要，安装的时候注意版本。

### autoprefixer-loader

> 注意样式相关包的配置顺序，以及如何配置 autoprefixer-loader

### 引入

> 可以使用 require 或 import，引入的是 scss 文件

## 如何规划数据

### 不变动

> 关于 image 的数组其实是不动的，不宜放到 state

### 变动

> 每项都有自己的状态，刚开始是想在不变动数据上扩展一下。项目是将其单独列出来为 state。注意的点，就是相关的，但是要分离。

## 反转动画

> 使用 c3 属性。完整的代码请参考 scss 文件

+ `perspective: 1000px`
    - 动画效果之外的父元素
    - 视角
    - 越大，动画效果越小
+ `transition: all .6s ease-in-out`
    - 动画效果中的父元素
+ `transform-style: preserver-3d`
    - 动画效果中的父元素
+ `transform: rotateY(180deg) translateX(1px)`
    - 动画效果中子元素，注意操作顺序
+ `backface-visibility: hidden`
    - 动画效果中子元素
    - 背对屏幕时，不可见
+ `transform-origin: 50% 50% 0`
    - 动画父子元素都能用
    - 转换元素的位置

> 注意点

+ 当元素或者效果出不来的时候，检查`overflow: auto/hidden`
+ 注意 `perspective` 和 `transform-style`的位置

## 字体

> iconfonts

1. `iconfonts.cn` 收藏图标
2. 生成文件
+ 包含四类字体文件
+ 包含图标对应的`\exxx`
3. 使用
+ webpack 需要配置 `url-loader`, 相关的文件后缀
+ `@font-face`
+ 类样式名或者伪元素

> 滑度

1. 灰阶
2. 亚像素
+ 更粗
+ 消耗内存
3. 设置
+ `-webkit-font-smoothing: antialiased;`
+ `-moz-osx-font-smoothing: grayscale;`