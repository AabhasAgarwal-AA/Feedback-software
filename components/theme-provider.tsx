"use client";
import { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThmeProvider} from "next-themes";
export function ThemeProvider({children, ...props}: ThemeProviderProps){
    return <NextThmeProvider {...props}>{children}</NextThmeProvider>

}