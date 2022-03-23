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
  return {
    radar: {
      // shape: 'circle',
      indicator: chartData.map((temp) => {
        return { name: temp[1], max: temp[2] }
      })
    },
    legend: {
      data: chartData[0].slice(1)
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
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
      formatter: '{b} : {d}%'
    },
    legend: {
      data: chartData2[0]
    },
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