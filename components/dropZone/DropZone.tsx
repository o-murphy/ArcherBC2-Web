import React, { useCallback, useState } from "react";

interface DropZoneProps {
    children: React.ReactNode;
    onDropFile: (file: File) => void;
}

export const DropZoneWeb = ({ children, onDropFile }: DropZoneProps) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) {
                onDropFile(file);
            }
        },
        [onDropFile],
    );

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                margin: 8,
                borderRadius: 24,
                borderWidth: 2,
                borderStyle: "dashed",
                borderColor: isDragging ? "#2196f3" : "#555",
                backgroundColor: isDragging
                    ? "rgba(33, 150, 243, 0.1)"
                    : "transparent",
                transition: "background-color 0.2s, border-color 0.2s",
            }}
        >
            {children}
        </div>
    );
};
