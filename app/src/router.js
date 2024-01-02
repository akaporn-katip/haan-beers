import HomePage from "@/page/home/home.js";
import Root from "@/root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./error-page";
import MainLayout from "./layout/main-layout";
import CreateBillPage from "./page/bill/create-bill";
import SummaryPage from "./page/bill/summary";
import CallbackPage from "./page/callback/callback";
import VerifyLogin from "./component/firebase/verify-login";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <VerifyLogin>
            <MainLayout />
          </VerifyLogin>
        ),
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
      {
        path: "/api/auth/callback/line",
        element: <CallbackPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
