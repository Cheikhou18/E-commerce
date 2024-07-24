import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  const isCategoryPage = location.pathname.includes("/category");

  if (isCategoryPage) {
    return (
      <nav className="bg-gray-100 p-3 rounded-md w-full">
        <ul className="flex text-gray-700 space-x-2">
          {paths.map((value, index) => {
            const to = `/${paths.slice(0, index + 1).join("/")}`;
            const isLast = index === paths.length - 1;

            return (
              <li key={to} className="flex items-center">
                <span className="mx-2">/</span>
                {isLast ? (
                  <span>{value}</span>
                ) : (
                  <Link to={to} className="hover:underline text-blue-600">
                    {value}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Breadcrumbs;
