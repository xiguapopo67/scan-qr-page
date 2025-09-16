// QR码扫描应用主页面，集成扫码功能和结果展示
"use client";

import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import QRScanner from "@/components/QRScanner";
import ScanResult from "@/components/ScanResult";

export default function Home() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScanSuccess = (result: string) => {
    setScanResult(result);
    setError(null);
  };

  const handleScanError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleScanAgain = () => {
    setScanResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar isBordered>
        <NavbarBrand>
          <div className="flex items-center gap-2">
            <div className="text-2xl">📱</div>
            <p className="font-bold text-inherit">QR码扫描器</p>
          </div>
        </NavbarBrand>
        <NavbarContent justify="end">
          <div className="text-sm text-default-500">
            基于 Next.js + HeroUI
          </div>
        </NavbarContent>
      </Navbar>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
          {!scanResult ? (
            <QRScanner
              onScanSuccess={handleScanSuccess}
              onScanError={handleScanError}
            />
          ) : (
            <ScanResult
              result={scanResult}
              onScanAgain={handleScanAgain}
            />
          )}

          {error && (
            <div className="mt-4 p-4 bg-danger-50 border border-danger-200 rounded-lg max-w-md">
              <p className="text-danger-600 text-sm text-center">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
