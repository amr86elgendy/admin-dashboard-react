
export const recentOrdersColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Order Date',
    dataIndex: 'orderDate',
    key: 'orderDate',
  },
  {
    title: 'Delivery Status',
    dataIndex: 'deliveryStatus',
    key: 'deliveryStatus',
    // render: (tag) => (
    //   <Tag color={color} key={tag}>
    //     {tag.toUpperCase()}
    //   </Tag>
    // ),
  },
  '',
];

export const recentOrdersData = [
  {
    id: '1',
    customer: 'John Brown',
    orderDate: 'New York No. 1 Lake Park',
    deliveryStatus: 'Delivered',
  },
  {
    id: '2',
    customer: 'Jim Green',
    orderDate: 'London No. 1 Lake Park',
    deliveryStatus: 'in progress',
  },
  {
    id: '3',
    customer: 'Joe Black',
    orderDate: 'Sidney No. 1 Lake Park',
    deliveryStatus: 'canceled',
  },
];
