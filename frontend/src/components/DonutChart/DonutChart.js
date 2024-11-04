import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";


const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function DonutChart({ given_data, data_type }) {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (given_data) {
      if (data_type != "spentData") {
        setCategories(given_data.income_by_category);
      }
      else {
        setCategories(given_data.spent_by_category)
      }
      const updatedData = categories.map((item) => {
        let value = 0
        if (data_type != "spentData") {
          value = (item.total_income_amount / given_data.total_income_amount) * 100;
        }
        else {
          value = (item.total_spent_amount / given_data.total_spent_amount) * 100;
        }
        return {
          category: item.category,
          value: value,
          color: getRandomColor(),
        };
      });

      setData(updatedData);
    }

  }, [given_data]);

  return (
    <>
      <div style={{
        width: "100%", height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <ResponsiveContainer width="80%" height="80%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div >

      <div className="text-start px-2 pb-4">
        {data.map((item, index) => (
          <div key={index} className="d-flex align-items-center px-2">
            <div className='rounded' style={{
              height: "1em",
              width: "1em",
              backgroundColor: item.color
            }}></div>
            <span className='px-1'>{item.category}</span>
          </div>
        ))}
      </div>
    </>
  );
}
