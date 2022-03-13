import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import useTheme from "~/hooks/useTheme";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
    return { title: "New Remix App" };
};
function Document({
    children,
    title = `Remix: So great, it's funny!`,
}: {
    children: React.ReactNode;
    title?: string;
}) {
    const { currentThemeName } = useTheme();
    useEffect(() => {
        console.log(currentThemeName);

        document.body.dataset.theme = currentThemeName;
    }, [currentThemeName]);
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <Links />
            </head>
            <body data-theme="light">
                {children}
                <LiveReload />
            </body>
        </html>
    );
}

export default function App() {
    return (
        <Document>
            <Outlet />
        </Document>
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <Document title="Uh-oh!">
            <div className="error-container">
                <h1>App Error</h1>
                <pre>{error.message}</pre>
            </div>
        </Document>
    );
}
