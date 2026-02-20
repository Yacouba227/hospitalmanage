'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserGroupIcon, DocumentTextIcon, CalendarIcon, ClipboardDocumentListIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import logo from '../../assets/Logo.png';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Tableau de bord', href: '/dashboard', icon: UserGroupIcon },
    { name: 'Patients', href: '/patients', icon: UserGroupIcon },
    { name: 'Dossiers médicaux', href: '/records', icon: DocumentTextIcon },
    { name: 'Rendez-vous', href: '/appointments', icon: CalendarIcon },
    { name: 'Ordonnances', href: '/prescriptions', icon: ClipboardDocumentListIcon },
    { name: 'Utilisateurs', href: '/users', icon: ShieldCheckIcon },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          {/* <div className="flex items-center">
            <Image 
              src={logo} 
              alt="Hospital Logo" 
              width={40} 
              height={40}
              className="rounded-md"
            />
            
          </div> */}
          <h1 className="text-xl text-center font-bold text-blue-600 dark:text-blue-400 ml-2">Système de Gestion Hôpital</h1>
        </div>
        
        <nav className="flex-1 px-2 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`${
                      isActive
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    } group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <span className="font-medium">U</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Administrateur</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@hospital.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;