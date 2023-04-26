import React, { useState, useEffect, useContext, useRef } from 'react';
import { Mix } from '@ant-design/plots';

import { DataView } from '@antv/data-set';
import { Space, Table, Form, Input } from 'antd';

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

export const DrinkVisual = () => {
  const [data, setData] = useState([
    ['Cosmopolitan', 51, 45, 6],
    ['Martini', 67, 39, 28],
    ['Mojito', 19, 11, 8],
    ['Margarita', 47, 33, 14],
    ['Mai Tai', 32, 20, 12],
    ['Beer', 70, 20, 50],
  ]) 

  const [yearData, c] = useState([
    ['2010', 60, 176, 35, 25],
    ['2011', 51, 136, 25, 26],
    ['2012', 73, 196, 35, 38],
    ['2013', 84, 315, 43, 41],
    ['2014', 79, 203, 36, 33],
    ['2015', 89, 286, 41, 48],
  ])

  let dIndex = 0, yIndex = 0
  
  const [drinksDataSource, setDrinksDataSource] = useState(
    data.map((d) => ({
      key : (++dIndex).toString(),
      drinks : d[0],
      female : d[3],
      male : d[2],
      total : d[1],

    }))    
  )

  const drinksColumns = [
    {
      title: 'Drinks',
      dataIndex: 'drinks',
      key: 'drinks',
    },
    {
      title: 'Female',
      dataIndex: 'female',
      key: 'female',
      editable: true,
    },
    {
      title: 'Male',
      dataIndex: 'male',
      key: 'male',
      editable: true,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },    
  ];
  const [orderedDataSource, setOrderedDataSource] = useState(
    yearData.map((d) => ({
      key : (++yIndex).toString(),
      year : d[0],
      male : d[3],
      female : d[4],
      total : d[1],
    }))    
  )

  const orderedColumns = [
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Male',
      dataIndex: 'male',
      key: 'male',
      editable: true,
    },
    {
      title: 'Female',
      dataIndex: 'female',
      key: 'female',
      editable: true,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },    
  ];

  // useEffect(() => {

  // }, [drinksDataSource, orderedDataSource]);

  const config = {
    height: 500,
    padding: 'auto',
    tooltip: {
      showMarkers: false,
    },
    views: [
      {
        data: data.map((d) => ({
          type: d[0],
          value: d[1],
        })),
        region: {
          start: {
            x: 0,
            y: 0,
          },
          end: {
            x: 0.5,
            y: 0.4,
          },
        },
        coordinate: {
          type: 'theta',
          cfg: {
            radius: 0.85,
          },
        },
        axes: {
          value: {
            title: {
              text: 'Drinks',
            },
            grid: null,
            tickLine: null,
            line: false,
            ticks: false,
          },
        },
        geometries: [
          {
            type: 'interval',
            xField: '1',
            yField: 'value',
            colorField: 'type',
            mapping: {},
            adjust: {
              type: 'stack',
            },
          },
        ],
        interactions: [
          {
            type: 'element-active',
          },
          {
            type: 'association-highlight',
          },
        ],
      },
      {
        data: new DataView()
          .source(
            data.map((d) => ({
              type: d[0],
              male: d[2],
              female: d[3],
            })),
          )
          .transform({
            type: 'fold',
            fields: ['male', 'female'],
            key: 'gender',
            value: 'value',
          }).rows,
        region: {
          start: {
            x: 0.5,
            y: 0,
          },
          end: {
            x: 1,
            y: 0.45,
          },
        },
        coordinate: {
          cfg: {
            isTransposed: true,
          },
        },
        axes: {
          value: false,
        },
        geometries: [
          {
            type: 'interval',
            xField: 'type',
            yField: 'value',
            colorField: 'gender',
            mapping: {},
            adjust: {
              type: 'dodge',
              marginRatio: 0,
            },
          },
        ],
      },
      {
        data: yearData.map((d) => ({
          year: d[0],
          ordered: d[1],
        })),
        region: {
          start: {
            x: 0,
            y: 0.52,
          },
          end: {
            x: 0.48,
            y: 1,
          },
        },
        axes: {
          year: {
            title: {
              text: 'Drinks ordered',
            },
          },
        },
        meta: {
          ordered: {
            min: 40,
            max: 90,
          },
        },
        geometries: [
          {
            type: 'area',
            xField: 'year',
            yField: 'ordered',
            mapping: {},
          },
          {
            type: 'line',
            xField: 'year',
            yField: 'ordered',
            mapping: {
              style: {
                lineWidth: 0.5,
              },
            },
          },
        ],
      },
      {
        data: new DataView()
          .source(
            yearData.map((d) => ({
              year: d[0],
              male: d[3],
              female: d[4],
            })),
          )
          .transform({
            type: 'fold',
            fields: ['male', 'female'],
            key: 'gender',
            value: 'turnout',
          }).rows,
        region: {
          start: {
            x: 0.52,
            y: 0.52,
          },
          end: {
            x: 1,
            y: 1,
          },
        },
        axes: {
          year: {
            title: {
              text: 'Turnout by gender',
            },
          },
        },
        geometries: [
          {
            type: 'interval',
            xField: 'year',
            yField: 'turnout',
            colorField: 'gender',
            adjust: {
              type: 'dodge',
              marginRatio: 0,
            },
            mapping: {},
          },
        ],
        interactions: [
          {
            type: 'element-active',
          },
          {
            type: 'association-sibling-highlight',
          },
        ],
      },
    ],
  };
  
  const drinksDataHandleSave = (row) => {
    const newDrinksData = [...drinksDataSource];
    const newData = [...data];
    const index = newDrinksData.findIndex((item) => row.key === item.key);
    const drinksItem = newDrinksData[index];
    const nfemale = (typeof row.female === 'string') ? Number(row.female) : row.female
    const nmale = (typeof row.male === 'string') ? Number(row.male) : row.male

    row.female = nfemale
    row.male = nmale
    row.total = nfemale + nmale

    newDrinksData.splice(index, 1, {
      ...drinksItem,
      ...row,
    });
    setDrinksDataSource(newDrinksData);

    const item = newData[index];
    item[3] = nfemale
    item[2] = nmale
    item[1] = row.total
    setData(newData)
  };

  const yearDataHandleSave = (row) => {
    const newYearData = [...orderedDataSource];
    const newData = [...yearData];
    const index = newYearData.findIndex((item) => row.key === item.key);
    const yearItem = newYearData[index];
    const nfemale = (typeof row.female === 'string') ? Number(row.female) : row.female
    const nmale = (typeof row.male === 'string') ? Number(row.male) : row.male

    row.female = nfemale
    row.male = nmale
    row.total = nfemale + nmale

    newYearData.splice(index, 1, {
      ...yearItem,
      ...row,
    });
    setOrderedDataSource(newYearData);

    const item = newData[index];
    item[4] = nfemale
    item[3] = nmale
    item[1] = row.total
    setYearData(newData)
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const dColumns = drinksColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave : drinksDataHandleSave,
      }),
    };
  });

  const oColumns = orderedColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: yearDataHandleSave,
      }),
    };
  });

  return( 
    <>
      <Space.Compact block>
        <Table components={components} rowClassName={() => 'editable-row'} dataSource={drinksDataSource} columns={dColumns} style={{ width: '50%' }}/>
        <Table components={components} rowClassName={() => 'editable-row'} dataSource={orderedDataSource} columns={oColumns} style={{ width: '50%' }}/>
      </Space.Compact>
      <Mix {...config} />
    </>
  )
}