import React from 'react';
import { MindMapGraph } from '@ant-design/graphs';

export const MindMap = () => {
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
              text: '비율',
              value: '30%',
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/iFh9X011qd/7797962c-04b6-4d67-9143-e9d05f9778bf.png',
            },
          ],
        },
        children: [
          {
            id: 'A2-1',
            value: {
              title: '중국북부',
              items: [
                {
                  text: '비율',
                  value: '30%',
                },
              ],
            },
          },
        ],
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
              items: [
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

  const level = [-2, -1, 0, 1, 2];
  const levelTexts = level.map((l) => {
    if (l < 0) return `${Math.abs(l)}레이어업스트림`;
    if (l > 0) return `${Math.abs(l)}레이어다운스트림`;
    return `마스터노드`;
  });
  const containerWidth = 800;
  const width = 120;
  const LevelFC = () => (
    <React.Fragment>
      {levelTexts.map((l) => (
        <div
          key={l}
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              width,
              display: 'block',
              height: '32px',
              lineHeight: '32px',
              backgroundColor: '#f0f0f0',
              borderRadius: '2px',
              color: 'rgba(0, 0, 0, 0.65)',
            }}
          >
            {l}
          </span>
        </div>
      ))}
    </React.Fragment>
  );

  const nodeSize = [width, 40];
  const config = {
    data: data,
    autoFit: false,
    width: containerWidth,
    // level: 5,
    layout: {
      getHeight: () => {
        return 40;
      },
      getWidth: () => {
        return nodeSize[0];
      },
      getVGap: () => {
        return 16;
      },
      getHGap: () => {
        return (containerWidth / level.length - width) / 2;
      },
    },
    // level,
    nodeCfg: {
      getChildren,
      size: nodeSize,
      padding: 4,
      style: {
        stroke: '#5AD8A6',
      },
      items: {
        padding: [4, 0],
      },
      customContent: (item, group, cfg) => {
        const { startX, startY, width } = cfg;
        const { text, value, icon, trend } = item;
        const tagWidth = 28;
        const tagHeight = 16;
        group?.addShape('rect', {
          attrs: {
            x: 0,
            y: 0,
            width: nodeSize[0],
            height: nodeSize[1] + 8,
            fillOpacity: 0.1,
          },
          // group 内唯一字段
          name: `container-${Math.random()}`,
        });
        group?.addShape('rect', {
          attrs: {
            x: startX,
            y: startY,
            width: tagWidth,
            height: tagHeight,
            fill: '#47c796',
          },
          // group 内唯一字段
          name: `tag-${Math.random()}`,
        });
        group?.addShape('text', {
          attrs: {
            textBaseline: 'middle',
            textAlign: 'center',
            x: startX + tagWidth / 2,
            y: startY + tagHeight / 2,
            text: '크라우드',
            fill: '#fff',
            fontSize: 10,
          },
          // group 内唯一字段
          name: `text-${Math.random()}`,
        });
        group?.addShape('text', {
          attrs: {
            textBaseline: 'middle',
            textAlign: 'start',
            x: startX + tagWidth + 4,
            y: startY + tagHeight / 2,
            text: '크라우드서비스이름',
            fill: 'rgba(0,0,0,.65)',
            fontSize: 10,
          },
          // group 内唯一字段
          name: `text-${Math.random()}`,
        });
        const textMargin = 10;
        const sense = group?.addShape('text', {
          attrs: {
            textBaseline: 'top',
            textAlign: 'start',
            x: startX,
            y: startY + tagHeight + textMargin,
            text: '해당장면：',
            fill: 'rgba(0,0,0,.45)',
            fontSize: 10,
          },
          // group 内唯一字段
          name: `text-${Math.random()}`,
        });
        group?.addShape('text', {
          attrs: {
            textBaseline: 'top',
            textAlign: 'start',
            x: sense.getBBox().maxX,
            y: startY + tagHeight + textMargin,
            text: '이것은 장면입니다',
            fill: 'rgba(0,0,0,.45)',
            fontSize: 10,
          },
          // group 内唯一字段
          name: `text-${Math.random()}`,
        });
      },
    },
    markerCfg: (cfg) => {
      const { children = [], id } = cfg;
      if (id === 'A0') {
        return [
          {
            position: 'left',
            show: !!children?.length,
          },
          {
            position: 'right',
            show: !!children?.length,
          },
        ];
      }
      return {
        position: 'right',
        show: !!children?.length,
      };
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
  };

  return (
    <div style={{ width: containerWidth }}>
      <div style={{ display: 'flex', height: '32px', textAlign: 'center' }}>{LevelFC()}</div>
      <MindMapGraph {...config} />
    </div>
  );
}