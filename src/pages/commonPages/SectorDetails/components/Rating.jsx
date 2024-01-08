import React from "react";

const UserRankingTable = ({ users }) => {
  return (
    <div className="max-h-96 h-fit max-w-[100vw] mb-28 md:mb-0 overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="sticky top-0 bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              O'rin
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ism familiya
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Natija
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users?.map?.((user, ind) => (
            <tr
              key={ind}
              className={`${
                ind === 0
                  ? "bg-green-200"
                  : ind === 1
                  ? "bg-sky-200"
                  : ind === 2
                  ? "bg-orange-100"
                  : ""
              } px-6 py-4 hover:bg-gray-100`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {ind + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user?.first_name} {user?.last_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user?.finished_protsent}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRankingTable;
