import {
  DirectorHome,
  DirectorManagers,
  Sectors,
  Employees,
  MyProfile,
  ManagerHome,
  EmployeeHome,
  MyTasks,
  CreateTask,
  EmployeeProfile,
  SectorDetails,
  Notes,
  ArchivedTasks,
  AllTasks,
  FinishTask,
} from "../pages";

const director_routes = [
  {
    key: 0,
    path: "/",
    title: "Bosh sahifa",
    icon: <span className="fa-solid fa-home" />,
    element: <DirectorHome />,
    showInNav: true,
  },
  {
    key: 1,
    path: "/director",
    element: <DirectorHome />,
    showInNav: false,
  },
  {
    key: 2,
    path: "/director/sectors",
    title: "Bo'limlar",
    icon: <span className="fa-solid fa-layer-group" />,
    element: <Sectors />,
    showInNav: true,
    isLink: true,
  },
  {
    key: 9,
    path: "/director/sector/:id",
    element: <SectorDetails />,
    showInNav: false,
  },
  {
    key: 3,
    path: "/director/managers",
    title: "Menejerlar",
    icon: <span className="fa-solid fa-user-tie" />,
    element: <DirectorManagers />,
    showInNav: true,
  },
  {
    key: 4,
    path: "/director/employees",
    title: "Xodimlar",
    icon: <span className="fa-solid fa-user-group" />,
    element: <Employees />,
    showInNav: true,
  },
  {
    key: 8,
    path: "/director/employees/:id",
    element: <EmployeeProfile />,
    showInNav: false,
  },
  {
    key: 5,
    path: "/director/tasks",
    title: "Vazifa yuklash",
    icon: <span className="fa-solid fa-list-check" />,
    element: <CreateTask />,
    showInNav: false,
  },
  {
    key: 15,
    path: "/director/finish-task/:id",
    element: <FinishTask />,
    showInNav: false,
  },
  {
    key: 10,
    path: "/director/my-notes",
    title: "Mening qaydlarim",
    icon: <span className="fa-solid fa-calendar-check" />,
    element: <Notes />,
    showInNav: true,
  },
  {
    key: 11,
    path: "/director/archived-tasks",
    title: "Arxivlangan vazifalar",
    icon: <span className="fa-solid fa-archive" />,
    element: <ArchivedTasks />,
    showInNav: true,
  },
  {
    key: 6,
    path: "/my-profile",
    element: <MyProfile />,
    showInNav: false,
  },
  {
    key: 7,
    path: "/*",
    element: <DirectorHome />,
    showInNav: false,
  },
];

const manager_routes = [
  {
    key: 10,
    path: "/stats",
    title: "Korxona statistikasi",
    icon: <span className="fa-solid fa-pie-chart" />,
    element: <DirectorHome />,
    showInNav: sessionStorage.getItem("is_assigned_as_director") === "true",
  },
  {
    key: 0,
    path: "/",
    title: "Bosh sahifa",
    icon: <span className="fa-solid fa-home" />,
    element: <ManagerHome />,
    showInNav: true,
  },
  {
    key: 1,
    path: "/manager",
    element: <ManagerHome />,
    showInNav: false,
  },
  {
    key: 2,
    path: "/manager/sectors",
    title: "Bo'lim",
    icon: <span className="fa-solid fa-layer-group" />,
    element: <SectorDetails />,
    showInNav: true,
  },
  {
    key: 3,
    path: "/manager/employees",
    title: "Xodimlar",
    icon: <span className="fa-solid fa-user-group" />,
    element: <Employees />,
    showInNav: true,
  },
  {
    key: 8,
    path: "/manager/employees/:id",
    element: <EmployeeProfile />,
    showInNav: false,
  },
  {
    key: 15,
    path: "/manager/finish-task/:id",
    element: <FinishTask />,
    showInNav: false,
  },
  {
    key: 4,
    path: "/manager/my-tasks",
    title: "Mening vazifalarim",
    icon: <span className="fa-solid fa-thumbtack" />,
    element: <MyTasks />,
    showInNav: true,
  },
  {
    key: 5,
    path: "/manager/tasks",
    title: "Vazifa yuklash",
    icon: <span className="fa-solid fa-list-check" />,
    element: <CreateTask />,
    showInNav: false,
  },
  {
    key: 9,
    path: "/manager/my-notes",
    title: "Mening qaydlarim",
    icon: <span className="fa-solid fa-calendar-check" />,
    element: <Notes />,
    showInNav: true,
  },
  {
    key: 11,
    path: "/manager/archived-tasks",
    title: "Arxivlangan vazifalarim",
    icon: <span className="fa-solid fa-archive" />,
    element: <ArchivedTasks />,
    showInNav: true,
  },
  {
    key: 6,
    path: "/my-profile",
    element: <MyProfile />,
    showInNav: false,
  },
  {
    key: 7,
    path: "/*",
    element: <ManagerHome />,
    showInNav: false,
  },
];

const employee_routes = [
  {
    key: 6,
    path: "/stats",
    title: "Korxona statistikasi",
    icon: <span className="fa-solid fa-pie-chart" />,
    element: <DirectorHome />,
    showInNav: sessionStorage.getItem("is_assigned_as_director") === "true",
  },
  {
    key: 0,
    path: "/",
    title: "Bosh sahifa",
    icon: <span className="fa-solid fa-home" />,
    element: <EmployeeHome />,
    showInNav: true,
  },
  {
    key: 1,
    path: "/employee",
    element: <EmployeeHome />,
    showInNav: false,
  },
  {
    key: 2,
    path: "/employee/my-tasks",
    title: "Mening vazifalarim",
    icon: <span className="fa-solid fa-list-check" />,
    element: <MyTasks />,
    showInNav: true,
  },
  {
    key: 15,
    path: "/xodim/finish-task/:id",
    element: <FinishTask />,
    showInNav: false,
  },
  {
    key: 5,
    path: "/employee/my-notes",
    title: "Mening qaydlarim",
    icon: <span className="fa-solid fa-calendar-check" />,
    element: <Notes />,
    showInNav: true,
  },
  {
    key: 11,
    path: "/employee/archived-tasks",
    title: "Arxivlangan vazifalarim",
    icon: <span className="fa-solid fa-archive" />,
    element: <ArchivedTasks />,
    showInNav: true,
  },
  {
    key: 3,
    path: "/my-profile",
    element: <MyProfile />,
    showInNav: false,
  },
  {
    key: 4,
    path: "/*",
    element: <EmployeeHome />,
    showInNav: false,
  },
];

const admin_routes = [
  {
    key: 0,
    path: "/",
    title: "Bosh sahifa",
    icon: <span className="fa-solid fa-home" />,
    element: <DirectorHome />,
    showInNav: true,
  },
  {
    key: 1,
    path: "/admin",
    element: <DirectorHome />,
    showInNav: false,
  },
  {
    key: 13,
    path: "/admin/all-tasks",
    title: "Barcha vazifalar",
    icon: <span className="fa-solid fa-circle-check" />,
    element: <AllTasks />,
    showInNav: true,
  },
  {
    key: 2,
    path: "/admin/sectors",
    title: "Bo'limlar",
    icon: <span className="fa-solid fa-layer-group" />,
    element: <Sectors />,
    showInNav: true,
    isLink: true,
  },
  {
    key: 12,
    path: "/admin/sector/:id",
    element: <SectorDetails />,
    showInNav: false,
  },
  {
    key: 3,
    path: "/admin/managers",
    title: "Menejerlar",
    icon: <span className="fa-solid fa-user-tie" />,
    element: <DirectorManagers />,
    showInNav: true,
  },
  {
    key: 4,
    path: "/admin/employees",
    title: "Xodimlar",
    icon: <span className="fa-solid fa-user-group" />,
    element: <Employees />,
    showInNav: true,
  },
  {
    key: 8,
    path: "/admin/employees/:id",
    element: <EmployeeProfile />,
    showInNav: false,
  },
  {
    key: 5,
    path: "/admin/tasks",
    title: "Vazifa yuklash",
    icon: <span className="fa-solid fa-list-check" />,
    element: <CreateTask />,
    showInNav: false,
  },
  {
    key: 15,
    path: "/admin/finish-task/:id",
    element: <FinishTask />,
    showInNav: false,
  },
  {
    key: 10,
    path: "/admin/my-notes",
    title: "Mening qaydlarim",
    icon: <span className="fa-solid fa-calendar-check" />,
    element: <Notes />,
    showInNav: true,
  },
  {
    key: 11,
    path: "/admin/archived-tasks",
    title: "Arxivlangan vazifalar",
    icon: <span className="fa-solid fa-archive" />,
    element: <ArchivedTasks />,
    showInNav: true,
  },
  {
    key: 6,
    path: "/my-profile",
    element: <MyProfile />,
    showInNav: false,
  },
  {
    key: 7,
    path: "/*",
    element: <DirectorHome />,
    showInNav: false,
  },
];

export { director_routes, manager_routes, employee_routes, admin_routes };
