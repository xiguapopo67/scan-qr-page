// 客户端Provider组件，包装HeroUI和主题Provider
"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="light">
            <HeroUIProvider>
                {children}
            </HeroUIProvider>
        </NextThemesProvider>
    );
}
