import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Pagination = ({ page, limit, totalPages }: { page: number; limit: number; totalPages: number }) => {

    const [currentPage, setCurrentPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [hasPrevPage, setHasPreviousPage] = useState(true);

    const start = (Number(page) - 1) * Number(limit) // 0, 5, 10 ...
    const end = start + Number(limit) // 5, 10, 15 ...

    const router = useRouter();
    const path = usePathname()

    const pagesCount = Math.ceil(totalPages / limit);

    if (pagesCount === 1) return null;

    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    console.log({ pagesCount, pages })


    const handlePageChange = (page: number) => {
        setCurrentPage(page);

        router.push(`${path}?page=${currentPage}&limit=${limit}`);
    };

    // useEffect(() => {
    //     const searchParams = new URLSearchParams(window.location.search)
    //     searchParams.set("page", (pagination.pageIndex + 1).toString())
    //     searchParams.set("limit", pagination.pageSize.toString())
    //     router.push(`?${searchParams.toString()}`, { scroll: false })
    // }, [pagination, router])

    return (
        <div className='pagination'>
            <div className="flex items-center justify-center gap-3">
                <div className="inline-flex justify-center gap-x-3">
                    <Button
                        className='primary-button'
                        disabled={!hasPrevPage}
                        onClick={() => {
                            if (currentPage > 0) setCurrentPage(currentPage - 1)
                            else setCurrentPage(0)
                            router.push(`${path}?page=${currentPage}&limit=${limit}`);
                        }}
                        variant={"ghost"}>
                        <span className="sr-only">Prev Page</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Button>

                    <div className="flex justify-center items-center text-sm text-gray-900">
                        {page} / {pagesCount}
                    </div>

                    <Button
                        className='primary-button'
                        disabled={!hasNextPage}
                        onClick={() => {
                            setCurrentPage(currentPage + 1);
                            router.push(`${path}?page=${currentPage}&limit=${limit}`);
                        }}
                        variant={"ghost"}>
                        <span className="sr-only">Next Page</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Pagination