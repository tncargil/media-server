import { useState, useMemo } from "react";

export const FileSearch = (initialFiles) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredFiles = useMemo(() => {
        if (!initialFiles) return [];

        return initialFiles.filter((file) =>
            file.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [initialFiles, searchTerm]);

    return {
        searchTerm,
        setSearchTerm,
        filteredFiles,
    };
};
