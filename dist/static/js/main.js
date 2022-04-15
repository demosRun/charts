// 雷达图.csv
window.mockData1 = `序号,领域,最大显示,留言量,回复量
1,城建,1000,790,531
2,交通,1000,417,324
3,教育,1000,863,917
4,就业,1000,544,575
5,三农,1000,140,225
6,政务,1000,417,444
7,环保,1000,283,269
8,医疗,1000,200,234
9,治安,1000,118,77
10,企业,1000,314,292
11,金融,1000,81,93
12,旅游,1000,52,161
13,文娱,1000,111,47
`

// 漏斗图,饼状图,极坐标图
window.mockData2 = `城建,790
交通,417
教育,863
就业,544
三农,140
政务,417
环保,283
`

// 散点图
window.mockData3 = `宽度,高度
10,8.04
8.07,6.95
13,7.58
9.05,8.81
11,8.33
14,7.66
13.4,6.81
10,6.33
14,8.96
12.5,6.82
9.15,7.2
11.5,7.2
3.03,4.23
12.2,7.83
2.02,4.47
1.05,3.33
4.05,4.96
6.03,7.24
12,6.26
12,8.84
7.08,5.82
5.02,5.68
`

// 折线图,柱状图
window.mockData4 = `项目,留言量,回复量
一月,790,531
二月,417,324
三月,863,917
四月,544,575
五月,140,225
六月,417,444
七月,283,269
八月,200,234
九月,118,77
十月,314,292
十一月,81,93
十二月,52,161`


// 正负条形图
window.mockData5 = `类型,回复量,未处理条数
城建,790,-531
交通,417,-324
教育,863,-917
就业,544,-575
三农,140,-225
政务,417,-444
环保,283,-269
医疗,200,-234`

function parseCSV (data, parallel) {
  let returnData = []
  data = data.replace(/\r\n/g, "\n")
  // 判断是否反向
  if (parallel) {
    const temp1 = data.split('\n')
    for (let index = 0; index < temp1.length; index++) {
      const element = temp1[index].split(',');
      
      for (let index2 = 0; index2 < element.length; index2++) {
        const element2 = element[index2];
        if (!returnData[index2]) returnData[index2] = []
        returnData[index2].push(element2)
      }
    }
  } else {
    data.split('\n').forEach(element => {
      if (element) returnData.push(element.split(','))
    });
  }
  
  console.log(returnData)
  return returnData
}


function radarHandle (fileContent) {
  const chartData = parseCSV(fileContent)
  const chartData2 = parseCSV(fileContent, true)
  console.log(chartData, chartData2)
  return {
    radar: {
      // shape: 'circle',
      indicator: chartData.slice(1).map((temp) => {
        return { name: temp[1], max: temp[2] }
      })
    },
    legend: {
      data: chartData[0].slice(1)
    },
    color: ['#b3402b', '#ba5342', '#c16654', '#c97a6b', '#f0cb7a'],
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        areaStyle: {},
        label: {
          show: true,
          formatter: function (params) {
            return params.value;
          }
        },
        data: chartData2.slice(3).map((temp) => {
          return {
            value: temp.slice(1),
            name: temp[0]
          }
        })
      }
    ]
  }
}

function funnelHandle (fileContent) {
  const chartData = parseCSV(fileContent)
  const chartData2 = parseCSV(fileContent, true)
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}({d}%)'
    },
    legend: {
      data: chartData2[0]
    },
    color: ['#b3402b', '#ba5342', '#c16654', '#c97a6b', '#f0cb7a'],
    series: [
      {
        name: 'Funnel',
        type: 'funnel',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside'
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          label: {
            fontSize: 20
          }
        },
        data: chartData.map((temp) => {
          return {
            value: temp[1],
            name: temp[0]
          }
        })
      }
    ]
  }
}


function lineHandle (fileContent) {
  const chartData = parseCSV(fileContent)
  const chartData2 = parseCSV(fileContent, true)
  return {
    xAxis: {
      data: chartData2[0].slice(1)
    },
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {
      type: 'category',
      type: 'value',
      axisLine: { show: true }
    },
    color: ['#b3402b', '#ba5342', '#c16654', '#c97a6b', '#f0cb7a'],
    series: chartData2.slice(1).map((temp) => {
      return {
        data: temp.slice(1),
        name: temp[0],
        label: {
          show: true,
          position: 'top'
        },
        type: 'line'
      }
    })
  }
}

function barHandle (fileContent) {
  const chartData = parseCSV(fileContent)
  const chartData2 = parseCSV(fileContent, true)
  return {
    xAxis: {
      type: 'category',
      data: chartData2[0].slice(1)
    },
    yAxis: {
      type: 'value'
    },
    color: ['#b3402b', '#ba5342', '#c16654', '#c97a6b', '#f0cb7a'],
    series: chartData2.slice(1).map((temp) => {
      return {
        data: temp.slice(1),
        name: temp[0],
        label: {
          show: true,
          position: 'top'
        },
        type: 'bar'
      }
    })
  }
}

function scatterHandle (fileContent) {
  const chartData = parseCSV(fileContent)
  const chartData2 = parseCSV(fileContent, true)
  return {
    xAxis: {
      type: 'value',
      name: chartData[0][0],
    },
    yAxis: {
      type: 'value',
      name: chartData[0][1],
    },
    tooltip: {
      trigger: 'item',
      formatter: '{c}'
    },
    color: ['#b3402b', '#ba5342', '#c16654', '#c97a6b', '#f0cb7a'],
    series: [
      {
        symbolSize: 20,
        data: chartData.slice(1),
        type: 'scatter'
      }
    ]
  }
}

function roseHandle (fileContent) {
  const chartData = parseCSV(fileContent)
  const chartData2 = parseCSV(fileContent, true)
  return {
    legend: {
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        label: {
          formatter: '{b}: {@2012} ({d}%)'
        },
        color: ['#b0222e', '#f0cb7a', '#f9d895', '#f0cb7a', '#b3402b', '#ba5342', '#c97a6b', '#d89f94', '#dfb3aa'],
        data: chartData.map((temp) => {
          return {
            value: temp[1],
            name: temp[0]
          }
        })
      }
    ]
  }
}

function pieHandle (fileContent) {
  const chartData = parseCSV(fileContent)
  const chartData2 = parseCSV(fileContent, true)
  return {
    legend: {
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [160, 250],
        center: ['50%', '50%'],
        label: {
          formatter: '{b}: {@2012} ({d}%)'
        },
        color: ['#b0222e', '#f0cb7a', '#f9d895', '#f0cb7a', '#b3402b', '#ba5342', '#c97a6b', '#d89f94', '#dfb3aa'],
        data: chartData.map((temp) => {
          return {
            value: temp[1],
            name: temp[0]
          }
        })
      }
    ]
  }
}

function bar2Handle (fileContent) {
  const chartData = parseCSV(fileContent)
  const chartData2 = parseCSV(fileContent, true)
  console.log(chartData, chartData2)
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: chartData[0].slice(1)
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value'
      }
    ],
    color: ['#b0222e', '#f0cb7a', '#f9d895', '#f0cb7a', '#b3402b', '#ba5342', '#c97a6b', '#d89f94', '#dfb3aa'],
    yAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        data: chartData2[0].slice(1)
      }
    ],
    series: [
      {
        name: chartData2[1][0],
        type: 'bar',
        label: {
          show: true,
          position: 'inside'
        },
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: chartData2[1].slice(1)
      },
      {
        name: chartData2[2][0],
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          position: 'left'
        },
        emphasis: {
          focus: 'series'
        },
        data: chartData2[2].slice(1)
      }
    ]
  }
}

function categoryHandle (fileContent) {
  const chartData = parseCSV(fileContent)
  const chartData2 = parseCSV(fileContent, true)
  console.log(chartData, chartData2)
  return {
    polar: {
      radius: [30, '80%']
    },
    angleAxis: {
      startAngle: 90
    },
    radiusAxis: {
      type: 'category',
      data: chartData2[0]
    },
    color: ['#b0222e', '#f0cb7a', '#f9d895', '#f0cb7a', '#b3402b', '#ba5342', '#c97a6b', '#d89f94', '#dfb3aa'],
    tooltip: {},
    series: {
      type: 'bar',
      data: chartData2[1],
      coordinateSystem: 'polar',
      label: {
        show: true,
        position: 'middle',
        formatter: '{b}: {c}'
      }
    }
  }
}

function exportChart () {
  owo.tool.panel('<div class="owo-sw-panel"><div class="sw-title"><span>图片导出</span><span>代码导出</span><span>导出视频</span></div><div class="sw-pannel"  style="height: 500px;"><div class="item"><h4>右键图片另存为到本地</h4><img class="share"></div><div class="item"><h4>复制代码到页面中使用</h4><textarea>' + `<link rel="stylesheet" href="https://cunchu.site/work/login/standard.css" charset="utf-8">\r\n<script src="./static/js/echarts.min.js.js" type="text/javascript"  charset="UTF-8"></script>\r\n<div id="chart"></div><script type="text/javascript" charset="UTF-8">echarts.init(chartDom)</script>` + '</textarea></div><div class="item"><h3>敬请期待</h3></div><div class="item">4</div></div></div>', '选择导出形式', (val) => {
    setTimeout(() => {
      new tabIt(document.querySelectorAll('.sw-title span'), document.querySelectorAll('.sw-pannel .item'))
      document.querySelector('.share').src = document.querySelector('.chart-box canvas').toDataURL()
    }, 0);
  })
}