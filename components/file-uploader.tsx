"use client";

import { usePathname } from "next/navigation";
import React, { useCallback, useState } from "react";


interface Props {
    ownerId: string;
    accountId: string;
    className?: string;
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {

    const path = usePathname();
    // const { toast } = useToast();
    const [files, setFiles] = useState<File[]>([]);



    return (
        <div>FileUploader</div>
    )
}

export default FileUploader