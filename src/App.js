import React, { useState } from "react";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
        ? "complicated"
        : "single",
  };
};

function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

export default function App() {
  const [data, setData] = useState(makeData(2));
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handelSearch = () => {
    const newData = data.filter((item) => {
      return item.age.toString() === search;
    });
    setData(newData);
  };

  return (
    <div>
      <input type="text" value={search} onChange={handleChange} />
      <button onClick={handelSearch}>search</button>
      <table>
        <tr>
          <th>age</th>
          <th>visits</th>
          <th>progress</th>
          <th>status</th>
        </tr>
        {data.map((item, index) => {
          return (
            <tr key={index}>
              <th>{item.age}</th>
              <th>{item.visits}</th>
              <th>{item.progress}</th>
              <th>{item.status}</th>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
