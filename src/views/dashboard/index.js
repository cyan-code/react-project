import React, { useEffect, useRef } from 'react'
import { getDashBoardData } from '../../api/dashboard'
import echarts from 'echarts'

import 'echarts/map/js/china'

export default function DashBoard() {

  const chartsRef = useRef() // ref来确定容器

  useEffect(() => {
    getDashBoardData()
      .then(res => {
        console.log(res);
        const chartData = res.areaTree[0].children.map(province => ({
          name: province.name,
          value: province.total.nowConfirm
        }))
        const myEcharts = echarts.init(chartsRef.current)
        myEcharts.setOption({
          title: {
            text: '国内最新疫情情况',
            subtext: '数据来自腾讯',
            sublink: 'https://www.qq.com'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c}'
          },
          visualMap: {
            type: 'piecewise',
            pieces: [
              { gte: 10000, color: '#ff0000', colorAlpha: 1 },
              { gte: 1000, lt: 10000, color: '#ff0000', colorAlpha: 0.8 },
              { gte: 100, lt: 1000, color: '#ff0000', colorAlpha: 0.6 },
              { gte: 10, lt: 100, color: '#ff0000', colorAlpha: 0.4 },
              { gte: 1, lt: 10, color: '#ff0000', colorAlpha: 0.2 },
              { value: 0, color: '#ffffff' }
            ]
          },
          series: [
            {
              name: '疫情数据',
              type: 'map',
              mapType: 'china',
              label: { show: true },
              data: chartData
            }
          ]
        })
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  return (
    <div>
      {/* 需要一个具备宽高的容器来放置eCharts */}
      <div ref={chartsRef} style={{ width: 800, height: 600 }}></div>
    </div>
  )
}

