import { json, Link, useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import type { LoaderFunction } from "remix";
import { Quote } from "@prisma/client";

type LoaderData = {
    quoteListItems: Quote[];
};

export const loader: LoaderFunction = async () => {
    const data: LoaderData = {
        quoteListItems: await db.quote.findMany(),
    };
    return json(data);
};

export default function Index() {
    const quotes = useLoaderData();
    console.log(quotes);

    return (
        <>
            {/* <h1>Quotes</h1> */}
            <Link to="/posts">posts</Link>
        </>
    );
}
