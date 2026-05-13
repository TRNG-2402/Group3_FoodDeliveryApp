import {
    MdFastfood,
    MdDashboard,
    MdRestaurant,
    MdDeliveryDining,
} from "react-icons/md";

import { FaShoppingBag, FaUserCircle } from "react-icons/fa";

import { IoSettingsSharp } from "react-icons/io5";

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

                <Link to="/dashboard" className="sidebarLink">
                    <SidebarItem icon={<MdDashboard />} text="Dashboard" />
                </Link>

                <Link to="/restaurants" className="sidebarLink">
                    <SidebarItem icon={<MdRestaurant />} text="Restaurants" />
                </Link>

                <Link to="/orders" className="sidebarLink">
                    <SidebarItem icon={<FaShoppingBag />} text="Orders" />
                </Link>

                <Link to="/delivery" className="sidebarLink">
                    <SidebarItem icon={<MdDeliveryDining />} text="Delivery" />
                </Link>

                <Link to="/profile" className="sidebarLink">
                    <SidebarItem icon={<FaUserCircle />} text="Profile" />
                </Link>

                <Link to="/settings" className="sidebarLink">
                    <SidebarItem icon={<IoSettingsSharp />} text="Settings" />
                </Link>

            </div>
        </aside>
    );
};