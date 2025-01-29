import { useState } from "react";
import { useGetNewsArticlesAPI } from "../../../api/getNewsArticles";
import { Article } from "../../../entity/Article/Article";

type HomeHooks = {
    keyword?: string;
    fromDate?: string;
    toDate?: string;
    source?: string;
    language: string;
    sortBy: string;
    page: number;
    articles?: Article[];
    isLoading: boolean;
    isError: boolean;
    totalPages: number;
    handleSearch: () => void;
    handleInputChange: (key: string, value: string) => void;
    handleSetPage: (page: number) => void;
};

export const useHomeHooks = (): HomeHooks => {
    const [params, setParams] = useState({
        keyword: "bitcoin",
        fromDate: undefined,
        toDate: undefined,
        source: undefined,
        sortBy: "popularity",
        language: "en",
        page: 1,
    });
    const pageSize = 10;

    const {
        data: newsArticlesResponse,
        isLoading,
        isError,
        refetch,
    } = useGetNewsArticlesAPI(
        {
            q: params.keyword,
            from: params.fromDate,
            to: params.toDate,
            domains: params.source,
            language: params.language,
            sortBy: params.sortBy,
            pageSize,
            page: params.page,
        },
        {
            enabled: true,
        }
    );

    const articles = newsArticlesResponse?.data.articles;

    const totalPages = Math.ceil(
        (newsArticlesResponse?.data.totalResults || 0) / pageSize
    );

    const handleSearch = () => {
        setParams((prev) => ({ ...prev, page: 1 }));
        refetch();
    };

    const handleInputChange: HomeHooks["handleInputChange"] = (key, value) => {
        setParams((prev) => ({
            ...prev,
            [key]: key === "source" ? value.split(",") : value,
        }));
    };

    const handleSetPage: HomeHooks["handleSetPage"] = (page) => {
        setParams((prev) => ({ ...prev, page }));
    };

    return {
        ...params,
        articles,
        isLoading,
        isError,
        totalPages,
        handleSearch,
        handleInputChange,
        handleSetPage,
    };
};
