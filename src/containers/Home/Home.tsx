import { FC } from "react";
import { useHomeHooks } from "./Home.hooks";
import {
    FiSearch,
    FiCalendar,
    FiGlobe,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import { FaSort } from "react-icons/fa";

export const Home: FC = () => {
    const {
        keyword,
        fromDate,
        toDate,
        source,
        language,
        sortBy,
        page,
        articles,
        isLoading,
        isError,
        totalPages,
        handleSearch,
        handleInputChange,
        handleSetPage,
    } = useHomeHooks();

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        News Articles
                    </h1>

                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) =>
                                    handleInputChange("keyword", e.target.value)
                                }
                                placeholder="Search keywords..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div className="relative">
                                <FiCalendar className="absolute left-3 top-3.5 text-gray-400" />
                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "fromDate",
                                            e.target.value
                                        )
                                    }
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="relative">
                                <FiCalendar className="absolute left-3 top-3.5 text-gray-400" />
                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "toDate",
                                            e.target.value
                                        )
                                    }
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <input
                                type="text"
                                value={source}
                                onChange={(e) =>
                                    handleInputChange("source", e.target.value)
                                }
                                placeholder="News source"
                                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <div className="relative">
                                <FiGlobe className="absolute left-3 top-3.5 text-gray-400" />
                                <select
                                    value={language}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "language",
                                            e.target.value
                                        )
                                    }
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="de">German</option>
                                    <option value="fr">French</option>
                                </select>
                            </div>

                            <div className="relative">
                                <FaSort className="absolute left-3 top-3.5 text-gray-400" />
                                <select
                                    value={sortBy}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "sortBy",
                                            e.target.value
                                        )
                                    }
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="relevancy">Relevancy</option>
                                    <option value="popularity">
                                        Popularity
                                    </option>
                                    <option value="publishedAt">
                                        Published At
                                    </option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleSearch}
                            disabled={isLoading}
                            className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
                        >
                            Search News
                        </button>
                    </div>
                </div>

                {isError && !articles && (
                    <div className="p-4 mb-4 rounded-lg text-center">
                        Try Searching for some keywords (e.g. bitcoin, Apple,)
                    </div>
                )}

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <ImSpinner8 className="animate-spin text-4xl text-blue-500" />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {articles?.map((article, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    {article.urlToImage && (
                                        <img
                                            src={article.urlToImage}
                                            alt={article.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                            {article.description}
                                        </p>
                                        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                                            <span>{article.source.name}</span>
                                            <span>
    {new Date(article.publishedAt).toISOString().split('T')[0].split('-').reverse().join('-')}
</span>

                                        </div>
                                        <a
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-600 font-medium text-sm"
                                        >
                                            Read more →
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {articles && articles?.length > 0 && (
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() =>
                                        handleSetPage(Math.max(1, page - 1))
                                    }
                                    disabled={page === 1}
                                    className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <FiChevronLeft className="inline" />{" "}
                                    Previous
                                </button>

                                <span className="px-4 py-2">
                                    Page {page} of {totalPages}
                                </span>

                                <button
                                    onClick={() =>
                                        handleSetPage(
                                            Math.min(totalPages, page + 1)
                                        )
                                    }
                                    disabled={page === totalPages}
                                    className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Next <FiChevronRight className="inline" />
                                </button>
                            </div>
                        )}
                    </>
                )}

                {!isLoading && articles?.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No articles found. Try adjusting your search filters.
                    </div>
                )}
            </div>
        </div>
    );
};
