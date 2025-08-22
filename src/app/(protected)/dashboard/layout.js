import TodosProvider from "@/app/context/todosContext";
import Sidebar from "./Sidebar";
import { getCurrentUser } from "@/app/auth";
import CategoryProvider from "@/app/context/categoryContext";
import { Suspense } from "react";
import Spinner from "@/app/components/Spinner";

const DashboardLayout = async ({ children }) => {
  const user = await getCurrentUser();
  return (
    <TodosProvider>
      <CategoryProvider>
        <div className="bg-gradient-to-r from-violet-50 to-cyan-50 min-h-screen">
          <Sidebar user={user} />
          <Suspense fallback={<Spinner />}>
            <main className=" lg:ml-64 lg:p-6 p-3">{children}</main>
          </Suspense>
        </div>
      </CategoryProvider>
    </TodosProvider>
  );
};
export default DashboardLayout;
