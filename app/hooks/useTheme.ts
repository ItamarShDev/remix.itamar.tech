import { useEffect, useState } from "react";

export function getCurrentThemeName() {
    if (document.body.dataset.theme) return document.body.dataset.theme;
    return "light";
}
export const setTheme = (newTheme: string) => {
    document.body.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
};
export function isDarkTheme() {
    const currentTheme = getCurrentThemeName();
    return currentTheme !== "light";
}
export function toggleDarkMode() {
    const newTheme = getCurrentThemeName() !== "light" ? "light" : "dark";
    setTheme(newTheme);
}

/**
 * uses System define theme
 * @param {Function} setTheme
 */
function setThemeFromSystem(setTheme: Function) {
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        setTheme("dark");
    } else {
        setTheme("light");
    }
    const sysTheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (sysTheme.addListener) {
        sysTheme.addListener((e) => {
            setTheme(e.matches ? "dark" : "light");
        });
    } else if (sysTheme.addEventListener) {
        sysTheme.addEventListener("change", (e) => {
            setTheme(e.matches ? "dark" : "light");
        });
    }
}

export default function useTheme(currentTheme: string = "light") {
    const [theme, setThemeName] = useState(currentTheme);
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            setThemeName(savedTheme);
        } else {
            setThemeFromSystem(setThemeName);
        }
        const listener = (e: any) => {
            if (typeof document !== "undefined") {
                setThemeName(document.body.dataset.theme);
            }
        };
        document.body.addEventListener("dataset", listener);
        return () => {
            document.body.removeEventListener("dataset", listener);
        };
    }, []);
    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    return {
        currentThemeName: theme,
        setTheme,
        isDarkTheme: theme === "dark",
        toggleDarkMode: () => {
            const newTheme = theme !== "light" ? "light" : "dark";
            setThemeName(newTheme);
        },
    };
}
