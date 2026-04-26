import { useState, useMemo } from "react";

export const FileFilter = (initialFiles) => {
    const [searchTerm, setSearchTerm] = useState("");

    const FileFilter = useMemo(() => {
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
