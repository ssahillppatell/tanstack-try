import React from 'react'
import ReactECharts from 'echarts-for-react'

export interface ChartProps {
  option: Record<string, unknown>
  height?: number | string
}

const Chart = ({ option, height = 360 }: ChartProps) => {
  return (
    <ReactECharts
      option={option}
      opts={{ renderer: 'svg' }}
      style={{ height: typeof height === 'number' ? `${height}px` : height, width: '100%' }}
    />
  )
}

export default Chart
