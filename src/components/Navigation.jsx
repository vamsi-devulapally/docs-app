import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, User } from 'lucide-react';
import Logo from './Logo';
import { navItems } from '../nav-items';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbs = [{ name: 'Dashboard', path: '/' }];

    pathnames.forEach((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      const navItem = navItems.find(item => item.to === routeTo);
      if (navItem) {
        breadcrumbs.push({ name: navItem.title, path: routeTo });
      }
    });

    return breadcrumbs;
  };

  return (
    <nav className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Logo />
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-primary-dark transition duration-150 ease-in-out"
              >
                {item.title}
              </Link>
            ))}
            <button className="bg-white text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition duration-150 ease-in-out">
              Book Appointment
            </button>
            <User className="h-6 w-6 text-white cursor-pointer" />
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-primary-dark">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-light"
                onClick={toggleMenu}
              >
                {item.title}
              </Link>
            ))}
            <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-light">
              Book Appointment
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 bg-gray-100">
        <div className="text-sm breadcrumbs">
          <ul className="flex items-center space-x-2">
            {getBreadcrumbs().map((breadcrumb, index) => (
              <React.Fragment key={breadcrumb.path}>
                {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
                <li>
                  <Link to={breadcrumb.path} className="text-primary hover:text-primary-dark">
                    {breadcrumb.name}
                  </Link>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
