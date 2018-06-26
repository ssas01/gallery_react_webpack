// 样式
require('normalize.css/normalize.css');
require('styles/App.scss');
// 库
import React from 'react';
// 加载数据
import imageDatas from './imageDatas';


// 处理数据，拼接图片地址
const imageDatasDeal = (function (imageDatasArr) {
    for (var i = 0; i < imageDatasArr.length; i++) {
        imageDatasArr[i].imageURL = require('../images/' + imageDatasArr[i].fileName);
    }
    return imageDatasArr;
})(imageDatas)

/*
* 在闭区间中产生随机数
*/
function getRandomBetween(low, top) {
    return Math.floor(Math.random() * (top - low + 1) + low)
}

/*
* 获取正负 30 范围内的度数
*/
function getRotate30() {
    return (Math.random() > 0.5 ? '' : '-' ) + Math.ceil(Math.random() * 15);
}

// 单个插图组件
class ImageFigure extends React.Component {
    handleClick(e) {
        if (this.props.arrage.isCenter) {
            this.props.changeInverse();
        }else {
            this.props.changeCenter();
        }
        e.preventDefault();
        e.stopPropagation();
    }
    render() {
        var styleObj = {};
        if (this.props.arrage.pos) {
            styleObj = this.props.arrage.pos;
        }

        if (this.props.arrage.rotate) {
            (['Webkit','ms','Moz','']).forEach(function (val) {
                styleObj[val + 'Transform'] = 'rotate('+ this.props.arrage.rotate +'deg)';
            }.bind(this))
        }

        let figureClassName = 'image-figure';
        if (this.props.arrage.isInverse) {
            figureClassName += ' is-inverse'
        }

        return (
            <figure className={figureClassName} style={styleObj} ref={this.props.figureRef}>
                <img src={this.props.data.imageURL} alt={this.props.data.title} onClick={this.handleClick.bind(this)}/>
                <figureCaption>
                    <h2 className="image-title">{this.props.data.title}</h2>
                    <div className="image-back" onClick={this.handleClick.bind(this)}>
                        {this.props.data.desc}
                    </div>
                </figureCaption>
            </figure>
        )
    }
}

class ControllerUnit extends React.Component {
    handleClick(e) {
        if (this.props.arrage.isCenter) {
            this.props.changeInverse();
        }else {
            this.props.changeCenter();
        }
        e.preventDefault();
        e.stopPropagation();
    }
    render() {
        let controllClassName = 'controller-unit'
        if (this.props.arrage.isCenter) {
            controllClassName += ' is-center';
            if (this.props.arrage.isInverse) {
                controllClassName += ' is-inverse';
            }
        }

        return (
            <span
             className={controllClassName}
             onClick={this.handleClick.bind(this)}
             ></span>
        )
    }
}

class AppComponent extends React.Component {
    state = {
        figureArrageArr: []
    };
    posRange = {};
    changeInverse(index) {
        // 不使用 setState 好像不会引起视图渲染
        let figureArrageArr = this.state.figureArrageArr;
        figureArrageArr[index].isInverse = !figureArrageArr[index].isInverse;
        this.setState({
            figureArrageArr: figureArrageArr
        })

    }
    changeCenter(centerIndex) {
        this.arrageFigurePostion(centerIndex);
    }
    componentDidMount() {
        // 计算范围
        const stageW = this.stageSec.scrollWidth,
            stageH = this.stageSec.scrollHeight,
            figureW = this.figureElem[0].scrollWidth,
            figureH = this.figureElem[0].scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2),
            halfFigureW = Math.ceil(figureW / 2),
            halfFigureH = Math.ceil(figureH /2);
        this.posRange = {
            bothSide: {
                secLeftX: [-halfFigureW, halfStageW - halfFigureW * 3],
                secRightX: [halfStageW + halfFigureW, stageW - halfFigureW],
                y: [-halfFigureH, stageH - halfFigureH]
            },
            topSide: {
                x: [halfStageW - halfFigureW, halfStageW],
                secTopY: [-halfFigureH, halfStageH - halfFigureH * 3]
            },
            centerPos: {
                left: halfStageW - halfFigureW,
                top: halfStageH - halfFigureH
            }
        }
        // 调用 设置位置 的方法
        this.arrageFigurePostion.call(this,0);
    }
    arrageFigurePostion(centerIndex) {
        let secLeftX = this.posRange.bothSide.secLeftX,
            secRightX = this.posRange.bothSide.secRightX,
            y = this.posRange.bothSide.y,
            x = this.posRange.topSide.x,
            secTopY = this.posRange.topSide.secTopY,
            centerPos = this.posRange.centerPos;
        let figureArrageArr = this.state.figureArrageArr;
        // 取出来，是因为随意选择，如果不取出来，可能会重复设置
        // 设置中部图片
        let middleFigureArr = figureArrageArr.splice(centerIndex,1);
        middleFigureArr[0] = {
            pos: centerPos,
            rotate: 0,
            isInverse: false,
            isCenter: true
        }
        // 设置头部图片
        let topFigureNumber = Math.floor(Math.random() * 2);
        let topFigureIndex = Math.floor(Math.random * (figureArrageArr.length - topFigureNumber));
        let topFigureArr = figureArrageArr.splice(topFigureIndex,topFigureNumber);
        /*--- 不知道数组会不会有数据 ---*/
        topFigureArr.forEach(function (topFigure,index) {
            topFigureArr[index] = {
                pos: {
                    left: getRandomBetween(x[0],x[1]),
                    top: getRandomBetween(secTopY[0],secTopY[1])
                },
                rotate: getRotate30(),
                isInverse: false,
                isCenter:false
            }
        })
        // 设置两侧图片
        figureArrageArr.forEach(function(figure,index) {
            let leftOrRight = [];
            if (Math.random() > 0.5) {
                leftOrRight = secLeftX;
            }else {
                leftOrRight = secRightX;
            }
            figureArrageArr[index] = {
                pos: {
                    left: getRandomBetween(leftOrRight[0],leftOrRight[1]),
                    top: getRandomBetween(y[0],y[1])
                },
                rotate: getRotate30(),
                isInverse: false,
                isCenter: false
            }
        })
        // 将取出的值插回
        if (topFigureNumber) {
            figureArrageArr.splice(topFigureIndex,0,topFigureArr[0])
        }
        figureArrageArr.splice(centerIndex,0,middleFigureArr[0])
        // 设置 state
        this.setState({
            figureArrageArr: figureArrageArr
        })
    }
    render() {
        this.figureElem = [];
        let figures = [], controllers = [];
        imageDatasDeal.forEach(function (imageData,index) {
            // 初始化
            if (!this.state.figureArrageArr[index]) {
                this.state.figureArrageArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0,
                    isInverse: false,
                    isCenter: false
                }
            }
            figures.push(<ImageFigure
             data={imageData}
             arrage={this.state.figureArrageArr[index]}
             key={index}
             changeInverse={this.changeInverse.bind(this,index)}
             changeCenter={this.changeCenter.bind(this,index)}
             figureRef={figure => this.figureElem[index] = figure}/>)

            controllers.push(<ControllerUnit
             key={index}
             arrage={this.state.figureArrageArr[index]}
             changeInverse={this.changeInverse.bind(this,index)}
             changeCenter={this.changeCenter.bind(this,index)}
            />)
        }.bind(this))

        return (
            <section className="stage" ref={sec => this.stageSec = sec}>
                <section className="image-sec">
                    {figures}
                </section>
                <nav className="controller-nav">
                    {controllers}
                </nav>
            </section>
        );
    }
}

export default AppComponent;