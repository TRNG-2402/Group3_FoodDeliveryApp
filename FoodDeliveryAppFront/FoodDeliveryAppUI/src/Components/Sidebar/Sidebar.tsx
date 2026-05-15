import {
    MdFastfood,
    MdDashboard,
} from "react-icons/md";

import { FaShoppingBag } from "react-icons/fa";


import { Link } from "react-router-dom";

import { SidebarItem } from "./SidebarItem";

import "./Sidebar.style.css";

export const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebarLogo">
                <MdFastfood className="sidebarLogoIcon" />

                <h2>Turbo Feast</h2>
            </div>

            <div className="sidebarMenu">

                <Link to="/restaurant" className="sidebarLink">
                    <SidebarItem icon={<MdDashboard />} text="Dashboard" />
                </Link>


                <Link to="/orders" className="sidebarLink">
                    <SidebarItem icon={<FaShoppingBag />} text="Orders" />
                </Link>


            </div>
        </aside>
    );
};