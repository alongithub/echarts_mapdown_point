import schoolicon from './icon/school'

export default (data, level) => {
    const map = {
        name: '地区',
        type: 'map',
        map: 'beijing',
        roam: true,
        label: {
            normal: {
                show: true,
                fontSize: 13,
                color: '#fff', // 007191 2091a1 淡蓝

            },
            emphasis: {
                show: true,
                color: '#fff',
            },
        },
        itemStyle: {
            borderWidth: 1,
            borderColor: '#01FAFC', // 01FAFC  0A1838
            areaColor: '#248DEA', // 0670A2  02071E
        },
        emphasis: {
            itemStyle: {
                areaColor: level !== '3' ? '#FACC14' : '#248DEA', // 'rgba(50,142,235,0.5)', // rgba(204,173,4,1)
            }
        },
        data,
        layoutCenter: ['50%', '50%'],
        layoutSize: '100%',
    }
    const school = {
        name: 'school',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: data,
        encode: {
            value: 2
        },
        symbolSize: 16,
        symbol: schoolicon,
        label: {
            normal: {
                show: true,//显示市区标签
                textStyle: { color: "#fff" },//省份标签字体颜色
                verticalAlign: 'bottom',
                formatter: (a) => {
                    return `{styleName|${a.data.name}}`
                },
                rich: {
                    styleName: {
                        color: '#fff',
                        lineHeight: '40'
                    }
                }
            },
            emphasis: {//对应的鼠标悬浮效果
                show: true,    //关闭文字 （这东西有问题得关）
                textStyle: { color: "#800080" }
            }
        },
        itemStyle: {
            normal: {
                borderWidth: .5,//区域边框宽度
                borderColor: '#009fe8',//区域边框颜色
                areaColor: "#ffefd5",//区域颜色
            },
            emphasis: {
                show: true,
                borderWidth: .5,
                borderColor: '#4b0082',
                areaColor: "#f47920",
            }
        }
    }
    return {
        tooltip: {
            show: level !== '3',
            trigger: 'item',
            formatter: d => {
                if (d.data) {
                    return d.data.name
                        + '<br>报考考生总数：' + d.data.value;
                } else {
                    return '';
                }
            },
        },
        ...level !== '3' ? {} : {
            geo: map
        },
        series: level !== '3' ? [map] : [school],
    }
}