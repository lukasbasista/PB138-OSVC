import IRoute from "./interfaces/route";
import JobsPage from "./components/pages/jobs";
import ClientsPage from "./components/pages/clients";
import CategoriesPage from "./components/pages/categories";

const routes: IRoute[] = [
  {
    path: '/',
    name: 'Jobs',
    component: JobsPage,
    exact: true,
    button: "Log work",

  },
  {
    path: '/clients',
    name: 'Clients',
    component: ClientsPage,
    exact: true,
    button: "Add client",
  },
  {
    path: '/categories',
    name: 'Categories',
    component: CategoriesPage,
    exact: true,
    button: "Add categoryBox",
  },
]

export default routes