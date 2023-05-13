import { useEffect, useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handdleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-gray-100 border-b border-gray-700 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              {/* <img
                src="/images/blip_footer.png"
                className="h-8 mr-3"
                alt="Logo"
              /> */}
              <span className="self-center font-semibold text-2xl whitespace-nowrap dark:text-white text-gray-900">
                Admin Semua Aplikasi Indonesia
              </span>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={handdleTheme}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-bold text-gray-900 dark:text-gray-300">
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            </label>
          </div>
        </div>
      </nav>
    </>
  );
}
