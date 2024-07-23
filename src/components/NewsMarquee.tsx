import styles from "../styles/NewsMarquee.module.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";
import Image from 'next/image';

interface Article {
    title: string;
    description: string;
    urlToImage: string;
    url: string;
}
const NewsMarquee = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [articles2, setArticles2] = useState<Article[]>([]);
    console.log(process.env.NEWS_API_KEY);
    useEffect(() => {
        // ist 
        const fetchData = async () => {
            //const response = await axios.get(`https://newsapi.org/v2/everything?q=crypto&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}&pageSize=20`);
            const newsApiKey = process.env.NEWS_API_KEY;
            const response = await axios.get(`https://newsapi.org/v2/everything?q=crypto&sortBy=publishedAt&apiKey=CG-yhTuwCSmxptGNLBavvfeNQB7&pageSize=20`);
            const filteredArticles = response.data.articles.filter((article: Article) => article.urlToImage !== null);
            setArticles(filteredArticles);
        };
        fetchData();
        //2nd
    }, []);
    return (
        <div className={styles.newsMarqueeMainParent}>
            <p className="text-2xl font-semibold mt-4 pl-1 -mb-2"> Stay Updated </p>
            {articles.map((article, index) => (
                <div key={index} className="">
                    <Link href={article.url} target="_blank" rel="noopener noreferrer" className="items-center flex gap-5">
                    <div className="imageContainer">
                        <Image
                            src={article.urlToImage}
                            alt={article.title}
                            width={176} // Equivalent to w-44 (44 * 4)
                            height={176} // Equivalent to h-44 (44 * 4)
                            className="sm:h-32 h-44"
                        />
                        </div>
                        <div className="flex flex-col gap-1 w-64">
                            <p className="font-semibold sm:text-base text-sm"> {article.title.substring(0, 50)}...</p>
                            <p className=" text-gray-500 font-semibold text-sm">{article.description.substring(0, 90)}...</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}
export default NewsMarquee
/*  
*/