import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const genreOptions = [
  { value: "", label: "Semua Genre" },
  { value: "fiksi", label: "Fiksi" },
  { value: "non-fiksi", label: "Non-Fiksi" },
  { value: "teknologi", label: "Teknologi" },
  { value: "sejarah", label: "Sejarah" },
  { value: "bisnis", label: "Bisnis" },
  { value: "self-help", label: "Self-Help" },
];

export default function BookFilters({ onFilterChange, filters }) {
    const handleGenreChange = (genre) => {
        onFilterChange({ ...filters, genre: filters.genre === genre ? "" : genre });
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-grow w-full">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                    placeholder="Cari berdasarkan judul atau penulis..."
                    value={filters.search || ""}
                    onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                    className="pl-12 h-12 text-base bg-[var(--bg-light-gray)] border-transparent focus:bg-white focus:border-gray-300 transition-colors"
                />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
                {genreOptions.map(option => (
                    <button
                        key={option.value}
                        onClick={() => handleGenreChange(option.value)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border-2
                            ${filters.genre === option.value
                                ? 'bg-[var(--primary-green)] text-white border-[var(--primary-green)]'
                                : 'bg-white hover:border-gray-400 text-gray-600 border-gray-200'
                            }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}