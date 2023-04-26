import React, {useState, useEffect} from 'react';
import { Tabs } from 'antd';
import { WordCloudPlot } from './components/wordCloudPlot'
import { DrinkVisual } from './components/drinksVisual'
import { CustomFlowchart } from './components/customFlowchart'
import { AsyRequestTreeGraph } from './components/asyRequestTreeGraph'
import { StateTreeGraph } from './components/stateTreeGraph'
import { MindMap } from './components/mindMap'

const onChange = (key, callBack) => {
  console.log(key);
  callBack(key)
};

export default function App() {
  const [activeKey, SetActiveKey] = useState('1')

  const items = [
    {
      key: '1',
      label: `Tab 1`,
      children: <WordCloudPlot activeKey={activeKey} setTab={'1'} />,
    },
    {
      key: '2',
      label: `Tab 2`,
      children:  <DrinkVisual activeKey={activeKey} setTab={'2'} />,
    },
    {
      key: '3',
      label: `Tab 3`,
      children: <CustomFlowchart activeKey={activeKey} setTab={'3'} />,
    },
    {
      key: '4',
      label: `Tab 4`,
      children: <AsyRequestTreeGraph activeKey={activeKey} setTab={'4'} />,
    },   
    {
      key: '5',
      label: `Tab 5`,
      children: <StateTreeGraph activeKey={activeKey} setTab={'5'} />,
    },    
    {
      key: '6',
      label: `Tab 6`,
      children: <MindMap activeKey={activeKey} setTab={'6'} />,
    },            
   ]; 

  return(
   <>
   <Tabs defaultActiveKey="1" items={items} onChange={(e)=>onChange(e, SetActiveKey)} />
   </>
  )
}