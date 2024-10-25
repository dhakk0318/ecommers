import React from "react";

const CurrentBookings = () => {
  return (
    <div className="bg-white  rounded    ">
      <table className="min-w-full p-4 mt-2 ">
        <thead>
          <tr className="bg-zinc-100 ">
            {["ID", "User", "Date", "Status"].map((header) => (
              <th key={header} className="p-2 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            {
              id: 1,
              user: "Alice Johnson",
              date: "2024-09-19",
              status: "Confirmed",
            },
            { id: 2, user: "Bob Smith", date: "2024-09-20", status: "Pending" },
            {
              id: 3,
              user: "Charlie Brown",
              date: "2024-09-21",
              status: "Confirmed",
            },
            {
              id: 4,
              user: "David Wilson",
              date: "2024-09-22",
              status: "Pending",
            },
            {
              id: 5,
              user: "Eva Green",
              date: "2024-09-23",
              status: "Confirmed",
            },
          ].map(({ id, user, date, status }) => (
            <tr key={id}>
              <td className="p-4">{id}</td>
              <td className="p-4">{user}</td>
              <td className="p-4">{date}</td>
              <td className="p-4">{status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button className=" p-2 =">⬅</button>
        <button className=" p-2 ">➡</button>
      </div>
    </div>
  );
};

export default CurrentBookings;
