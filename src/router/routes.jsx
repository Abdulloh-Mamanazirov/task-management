import {
  DirectorHome,
  DirectorManagers,
  Sectors,
  Employees,
  MyProfile,
  ManagerHome,
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
    key: 5,
    path: "/director/tasks",
    title: "Vazifalar",
    icon: <span className="fa-solid fa-list-check" />,
    element: <>Director tasks</>,
    showInNav: true,
  },
  {
    key: 5,
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
    title: "Bo'limlar",
    icon: <span className="fa-solid fa-layer-group" />,
    element: <Sectors />,
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
    key: 4,
    path: "/manager/my-tasks",
    title: "Mening vazifalarim",
    icon: <span className="fa-solid fa-thumbtack" />,
    element: <>manager my tasks</>,
    showInNav: true,
  },
  {
    key: 5,
    path: "/manager/tasks",
    title: "Vazifalar",
    icon: <span className="fa-solid fa-list-check" />,
    element: <>manager tasks</>,
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
    key: 0,
    path: "/",
    title: "Bosh sahifa",
    icon: <span className="fa-solid fa-home" />,
    element: <>employee home</>,
    showInNav: true,
  },
  {
    key: 1,
    path: "/employee",
    element: <>employee home</>,
    showInNav: false,
  },
  {
    key: 2,
    path: "/employee/my-tasks",
    title: "Mening vazifalarim",
    icon: <span className="fa-solid fa-list-check" />,
    element: <>employee my tasks</>,
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
    element: <>employee home</>,
    showInNav: false,
  },
];

export { director_routes, manager_routes, employee_routes };
