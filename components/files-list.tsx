"use client";

import { Models } from "node-appwrite";
import Card from "./card";
import Pagination from "./pagination";
import { useSearchParams } from "next/navigation";


export const FileList = ({ files }: { files: any }) => {

    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    console.log({ page, limit });

    return (
        <section className="flex flex-col items-center justify-center">
            <div className="file-list">
                {files.documents.map((file: Models.Document) => (
                    <Card key={file.$id} file={file} />
                ))}
            </div>
            <Pagination totalPages={files.total} page={page} limit={limit} />
        </section>
    )
}
