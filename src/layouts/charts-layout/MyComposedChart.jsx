/* eslint-disable react/prop-types */
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: "Page B",
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: "Page C",
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: "Page D",
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: "Page E",
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: "Page F",
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];

const MyComposedChart = ({ firstChartWidth }) => {
  return (
    <ComposedChart width={firstChartWidth} height={240} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid stroke="#0284C7" />
      <Area type="monotone" dataKey="amt" fill="#00C49F" stroke="#00C49F" />
      <Bar dataKey="pv" barSize={20} fill="#D75310 " />
      <Line type="monotone" dataKey="uv" stroke="#FFBB28" />
    </ComposedChart>
  );
};

export default MyComposedChart;
