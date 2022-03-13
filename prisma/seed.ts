import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
    const itamar = await db.user.create({
        data: {
            username: "itamar",
            // this is a hashed version of "twixrox"
            passwordHash:
                "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
        },
    });
    await Promise.all(
        getQuotes().map((quote) => {
            return db.quote.create({ userId: itamar.id, ...quote });
        })
    );
}

seed();

function getQuotes() {
    return [
        {
            author: "Rohan Sheth",
            role: "Product manager",
            profile: "https://www.linkedin.com/in/rohan-r-sheth",
            text: "Itamar is hands down the best SW engineer I have ever worked with",
        },
        {
            author: "Rohan Sheth",
            role: "Product manager",
            profile: "https://www.linkedin.com/in/rohan-r-sheth",
            text: "Truly unique in his ability for big picture thinking",
        },
        {
            author: "Rohan Sheth",
            role: "Product manager",
            profile: "https://www.linkedin.com/in/rohan-r-sheth",
            text: "Truly unique in his ability for user-centered design",
        },
        {
            author: "Rohan Sheth",
            role: "Product manager",
            profile: "https://www.linkedin.com/in/rohan-r-sheth",
            text: "Truly unique in his ability to be process oriented",
        },
        {
            author: "Rohan Sheth",
            role: "Product manager",
            profile: "https://www.linkedin.com/in/rohan-r-sheth",
            text: "Most importantly, really fun to be around",
        },
        {
            author: "Rohan Sheth",
            role: "Product manager",
            profile: "https://www.linkedin.com/in/rohan-r-sheth",
            text: "Always comes to meetings with a positive energy",
        },
        {
            author: "Rohan Sheth",
            role: "Product manager",
            profile: "https://www.linkedin.com/in/rohan-r-sheth",
            text: "Shows great initiative in wanting to understand end user",
        },
        {
            author: "Rohan Sheth",
            role: "Product manager",
            profile: "https://www.linkedin.com/in/rohan-r-sheth",
            text: "Actively participate and contribute thoughtful insights during user research studies",
        },
        {
            author: "Rohan Sheth",
            role: "Product manager",
            profile: "https://www.linkedin.com/in/rohan-r-sheth",
            text: "Built the company’s first data analysis tool",
        },
        {
            author: "Rohan Sheth",
            role: "Product manager",
            profile: "https://www.linkedin.com/in/rohan-r-sheth",
            text: "Great at communicating ideas and collaborating with everyone",
        },
    ];
}
