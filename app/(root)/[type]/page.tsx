import React from "react";
import Sort from "@/components/sort";
import { getFiles } from "@/server/actions/files.actions";
import { Models } from "node-appwrite";
import Card from "@/components/card";
import { convertFileSize, getFileTypesParams } from "@/lib/utils";
import { getCurrentUser } from "@/server/actions/users.actions";
import Pagination from "@/components/pagination";
import { FileList } from "@/components/files-list";

const Page = async ({ searchParams, params }: SearchParamProps) => {
    const type = ((await params)?.type as string) || "";
    const searchText = ((await searchParams)?.query as string) || "";
    const sort = ((await searchParams)?.sort as string) || "";

    const page = parseInt(((await searchParams)?.page as string) || "0");
    const limit = parseInt(((await searchParams)?.limit as string) || "12");

    const types = getFileTypesParams(type) as FileType[];

    const { files, totalSpace } = await getFiles({ types, searchText, sort, page, limit });

    return (
        <div className="page-container">
            <section className="w-full">
                <h1 className="h1 capitalize">{type}</h1>

                <div className="total-size-section">
                    <p className="body-1">
                        Total: <span className="h5">{convertFileSize(totalSpace)}</span>
                    </p>

                    <div className="sort-container">
                        <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>

                        <Sort />
                    </div>
                </div>
            </section>

            {/* Render the files */}
            {files.total > 0 ? (
                <FileList files={files} />
            ) : (
                <p className="empty-list">No files uploaded</p>
            )}


        </div>
    );
};

export default Page;