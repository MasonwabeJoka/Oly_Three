import useFormStore from "@/app/(dashboard)/dashboard/post-your-ad-BU/store/useFormStore";
import {usePathname} from "next/navigation";

const DashboardSidebarData = () => {
  const pathname= usePathname()
 const data = [
  {
    id: 1,
    icon: '/icons/dashboard-sidebar/home.png',
    active_icon: '/icons/dashboard-sidebar/home-hovered.png',
    label: 'Home',
    link: '/dashboard',
    active: pathname === "/dashboard",
    onClick: () => {}
},
{
    id: 2,
    icon: '/icons/dashboard-sidebar/post-your-ad.png',
    active_icon: '/icons/dashboard-sidebar/post-your-ad-hovered.png',
    label: 'Post Your Ad',
    link: '/dashboard/post-your-ad',
    active: pathname.startsWith("/dashboard/post-your-ad"),
    onClick: () => {}
},
{
    id: 3,
    icon: '/icons/dashboard-sidebar/messages.png',
    active_icon: '/icons/dashboard-sidebar/messages-hovered.png',
    label: 'Messages',
    link: '/dashboard/messages',
    active: pathname === "/dashboard/messages",
    onClick: () => {}
},
{
    id: 4,
    icon: '/icons/dashboard-sidebar/my-ads.png',
    active_icon: '/icons/dashboard-sidebar/my-ads-hovered.png',
    label: 'My Ads',
    link: '/dashboard/my-ads',
    active: pathname === "/dashboard/my-ads",
    onClick: () => {}
},
{
    id: 5,
    icon: '/icons/dashboard-sidebar/liked-ads.png',
    active_icon: '/icons/dashboard-sidebar/liked-ads-hovered.png',
    label: 'Liked Ads',
    link: '/dashboard/liked-ads',
    active: pathname === "/dashboard/liked-ads",
    onClick: () => {}
},
{
    id: 6,
    icon: '/icons/dashboard-sidebar/notifications.png',
    active_icon: '/icons/dashboard-sidebar/notifications-hovered.png',
    label: 'Notifications',
    link: '/dashboard/notifications',
    active: pathname === "/dashboard/notifications",
    onClick: () => {}
},
{
    id: 7,
    icon: '/icons/dashboard-sidebar/settings.png',
    active_icon: '/icons/dashboard-sidebar/settings-hovered.png',
    label: 'Settings',
    link: '/dashboard/settings',
    active: pathname === "/dashboard/settings",
    onClick: () => {}
},
{
    id: 8,
    icon: '/icons/dashboard-sidebar/exit.png',
    active_icon: '/icons/dashboard-sidebar/logout-hovered.png',
    label: 'Logout',
    link: '',
    active: pathname === "",
    onClick: () => {} 
},
];

return data
}

export default DashboardSidebarData
