import React from 'react';
import { DecompositionTreeGraph } from '@ant-design/graphs';

export const AsyRequestTreeGraph = () => {
  const data = {
    id: 'A0',
    value: {
      title: '주문량',
      items: [
        {
          text: '3031만',
        },
      ],
    },
    children: [
      {
        id: 'A1',
        value: {
          title: '중국남부',
          items: [
            {
              text: '1152만',
            },
            {
              text: '비율',
              value: '30%',
            },
          ],
        },
        children: [
          {
            id: 'A11',
            value: {
              title: '광동',
              items: [
                {
                  text: '1152만',
                },
                {
                  text: '비율',
                  value: '30%',
                },
              ],
            },
          },
          {
            id: 'A12',
            value: {
              title: '광시',
              items: [
                {
                  text: '1152만',
                },
                {
                  text: '비율',
                  value: '30%',
                },
              ],
            },
          },
          {
            id: 'A13',
            value: {
              title: '하이난',
              items: [
                {
                  text: '1152만',
                },
                {
                  text: '비율',
                  value: '30%',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'A2',
        value: {
          title: '중국북부',
          items: [
            {
              text: '595만',
            },
            {
              text: '비율',
              value: '30%',
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png',
            },
          ],
        },
      },
    ],
  };

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          [1, 2].map(() => ({
            id: 'A2' + Math.random().toString(),
            value: {
              title: '비동기 노드' + Math.random().toString(),
              items: [
                {
                  text: '595만',
                },
                {
                  text: '비율',
                  value: '50%',
                  icon: 'https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png',
                },
              ],
            },
          })),
        );
      }, 1000);
    });
  };

  const getChildren = async () => {
    const asyncData = await fetchData();
    return asyncData;
  };

  const config = {
    data,
    autoFit: false,
    nodeCfg: {
      getChildren,
    },
    markerCfg: (cfg) => {
      return {
        show: true,
      };
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
  };

  return <DecompositionTreeGraph {...config} />;
}