import React from "react";

const ThreePage = ({ data }) => {
  return (
    <div className="mt-5">
      {data?.length > 0 ? (
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th className="border p-2">Vazifa</th>
              <th className="border p-2">Tugash sanasi</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, ind) => (
              <tr key={ind} className="border text-center">
                <th className="border p-2">
                  {JSON.parse(item?.text?.[0]?.text ?? {})}
                </th>
                <td className="border p-2 min-w-[128px]">{item?.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col gap-2 items-center">
          <img src="empty.png" alt="empty" className="w-32 mx-auto" />
          <p>Topshiriq mavjud emas</p>
        </div>
      )}
    </div>
  );
};

export default ThreePage;
