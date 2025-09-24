import Link from "next/link";
import React from "react";
import Card from "../atoms/Card";

const DashboardPage = () => {
  const quickLinks = [
    {
      title: "Ambil Nomor Antrian",
      description: "Ambil nomor antrian untuk dilayani",
      href: "/queue-ticket",
      icon: "confirmation_number",
      color: "!bg-blue-500",
    },
    {
      title: "Display Antrian",
      description: "Lihat display antrian yang sedang dilayani",
      href: "/queue-display",
      icon: "list",
      color: "!bg-purple-500",
    },
    {
      title: "Cek Status Antrian",
      description: "Cek status nomor antrian Anda",
      href: "/queue-status",
      icon: "search",
      color: "!bg-green-500",
    },
    {
      title: "Operator Counter",
      description: "Panel untuk operator counter",
      href: "/counter-operator",
      icon: "person",
      color: "!bg-amber-500",
    },
  ];
  return (
    <div className="space-y-8">
      <Card>
        <h1 className="text-3xl font-bold text-gray-900">
          Selamat Datang di Sistem Manajemen Antrian
        </h1>
        <p className="text-gray-600 mt-2">
          Sistem ini membantu mengelola antrian pengunjung dan memantau status
          layanan counter.
        </p>
      </Card>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Statistik Antrian Hari Ini
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="!bg-yellow-50 !border-yellow-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-yellow-800 text-sm font-medium">Menunggu</p>
                <h3 className="text-3xl font-bold text-yellow-900 mt-1">1</h3>
              </div>
              <span className="material-symbols-outlined text-yellow-500 text-3xl">
                timer
              </span>
            </div>
          </Card>

          <Card className="!bg-blue-50 !border-blue-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-800 text-sm font-medium">
                  Sedang Dilayani
                </p>
                <h3 className="text-3xl font-bold text-blue-900 mt-1">12</h3>
              </div>
              <span className="material-symbols-outlined text-blue-500 text-3xl">
                supervisor_account
              </span>
            </div>
          </Card>

          <Card className="!bg-green-50 !border-green-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-800 text-sm font-medium">Selesai</p>
                <h3 className="text-3xl font-bold text-green-900 mt-1">5</h3>
              </div>
              <span className="material-symbols-outlined text-green-500 text-3xl">
                task_alt
              </span>
            </div>
          </Card>

          <Card className="!bg-red-50 !border-red-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-800 text-sm font-medium">Dilewati</p>
                <h3 className="text-3xl font-bold text-red-900 mt-1">4</h3>
              </div>
              <span className="material-symbols-outlined text-red-500 text-3xl">
                skip_next
              </span>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Akses Cepat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block">
              <Card className="h-full transition-all hover:shadow-md hover:scale-[1.01]">
                <div className="flex flex-col h-full">
                  <div
                    className={`${link.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}
                  >
                    <span className="material-symbols-outlined text-white">
                      {link.icon}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {link.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {link.description}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
