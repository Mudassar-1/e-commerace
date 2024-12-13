import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  
  const sidebarLinks = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: "bx bx-home",
      sIcon: "bx bxs-home",
    },
    {
      label: "Orders",
      href: "/admin/order",
      icon: "bx bx-cart",
      sIcon: "bx bxs-cart",
    },
    {
      label: "Products",
      href: "/admin/product",
      icon: "bx bx-label",
      sIcon: "bx bxs-label",
    },
    {
      label: "Categories",
      href: "/admin/categories",
      icon: "bx bx-category",
      sIcon: "bx bxs-category",
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: "bx bx-group",
      sIcon: "bx bxs-group",
    },
    {
      label: "Analytics",
      href: "/admin/analytic",
      icon: "bx bx-chart",
      sIcon: "bx bxs-chart",
    },
  ];



  return (
    <div className="border-solid h-screen relative justify-between flex flex-col">
      <div
        className={` p-4   overflow-hidden transition-all duration-300 ${
          isExpanded ? "w-56" : "w-20"
        }`}
      >
        <div className="flex justify-between items-center">
                    <Link href={"/"} className="flex  items-center">
                      <img
                        className={`w-20 transition-all duration-300 ${
                          isExpanded ? "block" : "w-16 mt-4"
                        }`}
                        src="/logo2.png"
                        alt=""

                      />
            <span className={`text-xl font-bold text-orange-500 ${ isExpanded ? "block" : "hidden"}`}>-Shop</span>
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {sidebarLinks.map((v, i) => (
            <Link
              key={i}
              className={`flex p-2 gap-2 border rounded-md items-center ${pathname === v.href ? "bg-orange-200" : ""}`}
              href={v.href}
            >
              <i
                className={`text-xl ${pathname === v.href ? v.sIcon : v.icon} ${
                  isExpanded ? "null" : "pl-1"
                }`}
              ></i>
              <div className={`${isExpanded ? "block" : "hidden"}`}>
                {v.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-11">
        {/* <p>logout</p> */}
        <button
          onClick={toggleSidebar}
          className="text-gray-500 text-xl hover:text-gray-700 border border-orange-50 bg-orange-100 hover:bg-orange-200 focus:outline-non absolute -right-4 bottom-3 w-8 h-8 rounded-full cursor-pointer"
        >
          <i
            className={`bx ${
              isExpanded ? "bx-chevron-left" : "bx-chevron-right"
            }`}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
