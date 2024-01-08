import React from "react";

const UserRankingTable = ({ users }) => {
  return (
    <div className="max-h-96 h-fit max-w-[100vw] w-full md:w-2/3 mx-0 md:mx-auto mb-28 md:mb-0 overflow-y-auto">
      <h3 className="text-lg font-medium text-center mb-2">
        Xodimlar reytingi 🏆
      </h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="sticky top-0 bg-gray-50">
          <tr>
            <th
              scope="col"
              className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              O'rin
            </th>
            <th
              scope="col"
              className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ism familiya
            </th>
            <th
              scope="col"
              className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Natija
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users?.map?.((user, ind) => (
            <tr key={ind} className={`px-6 py-4 hover:bg-gray-100`}>
              <td className="px-1 py-2 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                {ind === 0 ? "🥇" : ind === 1 ? "🥈" : ind === 2 ? "🥉" : ""}{" "}
                {ind + 1}
              </td>
              <td className="px-1 py-2 text-center whitespace-nowrap text-sm text-gray-500">
                {user?.first_name} {user?.last_name}
              </td>
              <td className="px-1 py-2 text-center whitespace-nowrap text-sm text-gray-500">
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
