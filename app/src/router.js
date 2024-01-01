import HomePage from "@/page/home/home.js";
import Root from "@/root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./error-page";
import MainLayout from "./layout/main-layout";
import CreateBillPage from "./page/bill/create-bill";
import SummaryPage from "./page/bill/summary";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            id: "home",
            path: "/",
            element: <HomePage />,
          },
          {
            id: "create-bill",
            path: "/create",
            element: <CreateBillPage />,
          },
        ],
      },
      {
        path: "/bill",
        element: <MainLayout />,
        children: [
          {
            id: "summary-bill",
            path: ":docId",
            element: <SummaryPage />,
          },
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
