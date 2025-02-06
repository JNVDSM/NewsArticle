import axios, { AxiosResponse } from "axios";
import {
    useQuery,
    UseQueryOptions,
    UseQueryResult,
} from "@tanstack/react-query";
import { Article } from "../entity/Article/Article";

type NewsArticleParams = {
    q?: string;
    from?: string;
    to?: string;
    domains?: string;
    language?: string;
    sortBy?: string;
    pageSize: number;
    page: number;
};

type GetNewsArticlesAPIResponse = {
    articles: Article[];
    totalResults: number;
};

type GetNewsArticlesResponse = AxiosResponse<{
    articles: Article[];
    totalResults: number;
}>;





export const getNewsArticles = async (
    params: NewsArticleParams
): Promise<GetNewsArticlesResponse> => {
    const response = await axios.get<GetNewsArticlesAPIResponse>(
        '/api/news',  // This will now be proxied correctly
        { params }
    );

    const articles = response.data.articles.map(
        (article) => new Article(article)
    );

    return { ...response, data: { ...response.data, articles } };
};


export const useGetNewsArticlesAPI = (
    params: NewsArticleParams,
    options?: Omit<
        UseQueryOptions<GetNewsArticlesResponse>,
        "queryKey" | "queryFn"
    >
): UseQueryResult<GetNewsArticlesResponse> => {
    return useQuery({
        queryKey: ["news", params],
        queryFn: () => getNewsArticles(params),
        ...options,
    });
};
