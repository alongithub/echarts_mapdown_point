import echarts from 'echarts'
import {treeCodemap, codemapjson} from './codemapjson'
import getoptions from './options.js'
import state, {cbs} from './state'
import data from './data.js'
import './style.less'


document.getElementById('navbar').onclick = () => {
    state.orgcode = '110000'
}


export function drawmap() {
    echarts.dispose(document.getElementById('app'));
    const myCharts = echarts.init(document.getElementById('app'));

    if (state.level === '3') {
        // 到区一级为point绑定事件
        myCharts.on('click',{seriesName: 'school'}, (params) => {
            console.log(params);
        });
    } else {
        // 省市级绑定点击下钻事件
        myCharts.on('click', (params) => {
            const cityName = params.name
            if (treeCodemap[cityName] == undefined) {
                console.log('该地区不可查看')
            } else {
                state.orgcode = treeCodemap[cityName]
            }
        });
    }
    
    
    echarts.registerMap('beijing', codemapjson[state.orgcode]);
    var option = getoptions(data[state.orgcode], state.level);
    myCharts.setOption(option);
    
}

// 注册订阅者
cbs.push(drawmap)
drawmap()
