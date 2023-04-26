import React, { useState, useEffect } from 'react';
import { Flowchart, FormWrapper, EdgeService, GroupService, CanvasService, EditorPanels } from '@ant-design/flowchart';

/**
 * 样式文件引入，实际项目中不要这么用，可以考虑在对应的less\sass文件中引入
 * eg:
 *  style.less
 *  @import (inline) '../../node_modules/antd/dist/antd.css';
 *  @import (inline) '../../node_modules/@ant-design/flowchart/dist/index.css';
 *  demo.tsx
 *  import './style.less'
 */
const createLink = (src) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.className = 'dynamic-link';
  link.href = src;
  document.getElementsByTagName('head')[0].appendChild(link);
};
createLink('https://unpkg.com/antd@4.24.3/dist/antd.css');
createLink('https://unpkg.com/@ant-design/flowchart@1.2.1/dist/index.css');

const PREFIX = 'flowchart-editor';
const { InputFiled, ColorPicker, Position, InputNumberFiled, Size } = EditorPanels;

const NodeComponent = (props) => {
  const { config, plugin = {} } = props;
  const { updateNode } = plugin;
  const [nodeConfig, setNodeConfig] = useState({
    ...config,
  });
  const onNodeConfigChange = (key, value) => {
    setNodeConfig({
      ...nodeConfig,
      [key]: value,
    });
    updateNode({
      [key]: value,
    });
  };
  useEffect(() => {
    setNodeConfig({
      ...config,
    });
  }, [config]);
  return (
    <div className={`${PREFIX}-panel-body`}>
      <div className={`${PREFIX}-panel-group`}>
        <h5>contents</h5>
        <InputFiled
          label={nodeConfig.name === 'custom-node-image' ? '지도주소' : '제목'}
          value={nodeConfig.label}
          onChange={(value) => {
            onNodeConfigChange('label', value);
          }}
        />
      </div>
      <div className={`${PREFIX}-panel-group`} style={{ borderBottom: 'none' }}>
        <h5>contents</h5>
        <Position
          x={nodeConfig.x}
          y={nodeConfig.y}
          onChange={(key, value) => {
            onNodeConfigChange(key, value);
          }}
        />
        <Size
          width={nodeConfig.width}
          height={nodeConfig.height}
          onChange={(key, value) => {
            onNodeConfigChange(key, value);
          }}
        />
        <ColorPicker
          label="충전재"
          value={nodeConfig.fill}
          onChange={(value) => {
            onNodeConfigChange('fill', value);
          }}
        />
        <ColorPicker
          label="액자"
          value={nodeConfig.stroke}
          onChange={(value) => {
            onNodeConfigChange('stroke', value);
          }}
        />
        <div className={`${PREFIX}-node-text-style`}>
          <InputNumberFiled
            label="글꼴크기"
            value={nodeConfig.fontSize}
            width={68}
            onChange={(value) => {
              onNodeConfigChange('fontSize', value);
            }}
          />
          <ColorPicker
            value={nodeConfig.fontFill}
            onChange={(value) => {
              onNodeConfigChange('fontFill', value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const NodeService = (props) => {
  return (
    <FormWrapper {...props}>
      {(config, plugin) => <NodeComponent {...props} plugin={plugin} config={config} />}
    </FormWrapper>
  );
};

export const controlMapService = (controlMap) => {
  controlMap.set('custom-node-service', NodeService);
  controlMap.set('custom-edge-service', EdgeService);
  controlMap.set('custom-group-service', GroupService);
  controlMap.set('custom-canvas-service', CanvasService);
  return controlMap;
};

const formSchemaService = async (args) => {
  const { targetType } = args;
  const isGroup = args.targetData?.isGroup;
  const groupSchema = {
    tabs: [
      {
        name: '설정',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '그룹명',
                name: 'custom-group-service',
                shape: 'custom-group-service',
                placeholder: '그룹이름',
              },
            ],
          },
        ],
      },
    ],
  };
  const nodeSchema = {
    tabs: [
      {
        name: '설정',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '노드명',
                name: 'custom-node-service',
                shape: 'custom-node-service',
                placeholder: '노드이름',
              },
            ],
          },
        ],
      },
    ],
  };
  const edgeSchema = {
    tabs: [
      {
        name: '설정',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '에지명',
                name: 'custom-edge-service',
                shape: 'custom-edge-service',
                placeholder: '에지이름',
              },
            ],
          },
        ],
      },
    ],
  };
  if (isGroup) {
    return groupSchema;
  }
  if (targetType === 'node') {
    return nodeSchema;
  }
  if (targetType === 'edge') {
    return edgeSchema;
  }
  return {
    tabs: [
      {
        name: '설정',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '',
                name: 'custom-canvas-service',
                shape: 'custom-canvas-service',
              },
            ],
          },
        ],
      },
    ],
  };
};

export const CustomFlowchart = () => {
  return (
    <div style={{ height: 600 }}>
      <Flowchart
        onSave={(d) => {
          console.log(d);
        }}
        toolbarPanelProps={{
          position: {
            top: 0,
            left: 0,
            right: 0,
          },
        }}
        scaleToolbarPanelProps={{
          layout: 'horizontal',
          position: {
            right: 0,
            top: -40,
          },
          style: {
            width: 150,
            height: 39,
            left: 'auto',
            background: 'transparent',
          },
        }}
        canvasProps={{
          position: {
            top: 40,
            left: 0,
            right: 0,
            bottom: 0,
          },
        }}
        nodePanelProps={{
          position: { width: 160, top: 40, bottom: 0, left: 0 },
        }}
        detailPanelProps={{
          position: { width: 200, top: 40, bottom: 0, right: 0 },
          controlMapService,
          formSchemaService,
        }}
      />
    </div>
  );
}