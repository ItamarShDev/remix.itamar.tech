import { Link, LinksFunction, Outlet } from "remix";
import styles from "~/styles/layout.css";
export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: styles }];
};
export default function BasePage() {
    return (
        <main data-theme="dark">
            <Outlet />
        </main>
    );
}