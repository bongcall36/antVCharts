import React from 'react';
import { FlowAnalysisGraph } from '@ant-design/graphs';

export const StateTreeGraph = () => {
  const data = {
    nodes: [
      {
        id: '-3',
        value: {
          title: '소스페이지A',
          items: [
            {
              text: 'PV노출',
              value: '10.30만',
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png',
            },
          ],
        },
      },
      {
        id: '-2',
        value: {
          title: '소스페이지B',
          items: [
            {
              text: 'UV클릭',
              value: '10.30만',
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png',
            },
          ],
        },
      },
      {
        id: '-1',
        value: {
          title: '소스페이지C',
          items: [
            {
              text: 'UV페이지방문',
            },
          ],
        },
      },
      {
        id: '0',
        value: {
          title: '이벤트페이지',
          items: [
            {
              text: 'UV페이지방문',
            },
          ],
        },
      },
      {
        id: '1',
        value: {
          title: '페이지 A로 이동',
          items: [
            {
              text: 'UV페이지방문',
            },
          ],
        },
      },
      {
        id: '2',
        value: {
          title: '페이지 B로 이동',
          items: [
            {
              text: 'UV페이지방문',
            },
          ],
        },
      },
      {
        id: '3',
        value: {
          title: '페이지 C로 이동',
          items: [
            {
              text: 'UV페이지방문',
            },
          ],
        },
      },
      {
        id: '4',
        value: {
          title: '페이지 D로 이동',
          items: [
            {
              text: 'UV페이지방문',
            },
          ],
        },
      },
      {
        id: '5',
        value: {
          title: '페이지 E로 이동',
          items: [
            {
              text: 'UV페이지방문',
            },
          ],
        },
      },
      {
        id: '6',
        value: {
          title: '페이지 F로 이동',
          items: [
            {
              text: 'UV페이지방문',
            },
          ],
        },
      },
      {
        id: '6',
        value: {
          title: '페이지 F로 이동',
          items: [
            {
              text: 'UV페이지방문',
            },
          ],
        },
      },
      {
        id: '7',
        value: {
          title: '페이지 G로 이동',
          items: [
            {
              text: 'UV페이지방문',
            },
          ],
        },
      },
      {
        id: '8',
        value: {
          title: '페이지 H로 이동',
          items: [
            {
              text: 'UV페이지방문',
            },
          ],
        },
      },
    ],
    edges: [
      {
        source: '-3',
        target: '0',
        value: '소스A',
      },
      {
        source: '-2',
        target: '0',
        value: '소스B',
      },
      {
        source: '-1',
        target: '0',
        value: '소스C',
      },
      {
        source: '0',
        target: '1',
      },
      {
        source: '0',
        target: '2',
      },
      {
        source: '0',
        target: '3',
      },
      {
        source: '0',
        target: '4',
      },
      {
        source: '0',
        target: '5',
      },
      {
        source: '2',
        target: '6',
      },
      {
        source: '3',
        target: '7',
      },
      {
        source: '4',
        target: '8',
      },
    ],
  };
  const config = {
    data,
    nodeCfg: {
      size: [140, 25],
      badge: {
        style: (cfg) => {
          const ids = ['-3', '-2', '-1'];
          const fill = ids.includes(cfg.id) ? '#c86bdd' : '#5ae859';
          return {
            fill,
            radius: [2, 0, 0, 2],
          };
        },
      },
      items: {
        padding: 6,
        containerStyle: {
          fill: '#fff',
        },
        style: (cfg, group, type) => {
          const styles = {
            icon: {
              width: 12,
              height: 12,
            },
            value: {
              fill: '#f00',
            },
            text: {
              fill: '#aaa',
            },
          };
          return styles[type];
        },
      },
      nodeStateStyles: {
        hover: {
          stroke: '#1890ff',
          lineWidth: 2,
        },
      },
      title: {
        containerStyle: {
          fill: 'transparent',
        },
        style: {
          fill: '#000',
          fontSize: 12,
        },
      },
      style: {
        fill: '#E6EAF1',
        stroke: '#B2BED5',
        radius: [2, 2, 2, 2],
      },
    },
    edgeCfg: {
      label: {
        style: {
          fill: '#aaa',
          fontSize: 12,
          fillOpacity: 1,
        },
      },
      style: (edge) => {
        const stroke = edge.target === '0' ? '#c86bdd' : '#5ae859';
        return {
          stroke,
          lineWidth: 1,
          strokeOpacity: 0.5,
        };
      },
      edgeStateStyles: {
        hover: {
          lineWidth: 2,
          strokeOpacity: 1,
        },
      },
    },
    markerCfg: (cfg) => {
      const { edges } = data;
      return {
        position: 'right',
        show: edges.find((item) => item.source === cfg.id),
      };
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
  };

  return <FlowAnalysisGraph {...config} />;
}