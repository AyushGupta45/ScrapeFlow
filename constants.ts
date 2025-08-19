import { HomeIcon, Layers2Icon, ShieldCheckIcon } from "lucide-react"
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 6;
export const MAX_PAGE_SIZE = 100;
export const MIN_PAGE_SIZE = 1;
export const sidebarRoutes = [
    {
        href: "/",
        label: "Home",
        icon: HomeIcon,
    },
    {
        href: "/workflows",
        label: "Workflows",
        icon: Layers2Icon,
    },
    {
        href: "/credentials",
        label: "Credentials",
        icon: ShieldCheckIcon,
    },
]