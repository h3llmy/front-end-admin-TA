import Link from "next/link";
import { useRouter } from "next/router";

export default function SidebarButton({ href, svg, name, notif, onClick }) {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        onClick={onClick}
        className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
          router.pathname === href ? "bg-white dark:bg-gray-700" : ""
        }`}
      >
        {svg}
        <span className="flex-1 ml-3 whitespace-nowrap">{name}</span>
        {notif ? (
          <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
            {notif}
          </span>
        ) : null}
      </a>
    </Link>
  );
}
