import React, { useState, useEffect } from "react";
import { Book } from "@/entities/Book";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, BarChart2, Star, Clock } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import BookCard from "../components/books/BookCard";
import BookForm from "../components/books/BookForm";
import BookFilters from "../components/books/BookFilters";

function StatCard({ icon: Icon, value, label, color }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

export default function BooksPage() {
    const [books, setBooks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [filters, setFilters] = useState({
        search: "",
        genre: "",
        status: ""
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        setIsLoading(true);
        const fetchedBooks = await Book.list("-updated_date");
        setBooks(fetchedBooks);
        setIsLoading(false);
    };

    const handleSubmit = async (bookData) => {
        if (editingBook) {
            await Book.update(editingBook.id, bookData);
        } else {
            await Book.create(bookData);
        }
        setShowForm(false);
        setEditingBook(null);
        loadBooks();
    };

    const handleEdit = (book) => {
        setEditingBook(book);
        setShowForm(true);
    };

    const filteredBooks = books.filter(book => {
        const matchesSearch = !filters.search || 
            book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            book.author.toLowerCase().includes(filters.search.toLowerCase());
        
        const matchesGenre = !filters.genre || book.genre === filters.genre;
        const matchesStatus = !filters.status || book.reading_status === filters.status;
        
        return matchesSearch && matchesGenre && matchesStatus;
    });

    const stats = {
        total: books.length,
        selesai: books.filter(b => b.reading_status === "selesai").length,
        sedang_dibaca: books.filter(b => b.reading_status === "sedang_dibaca").length
    };

    return (
        <div className="min-h-screen bg-[var(--bg-light-gray)] p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <StatCard icon={BookOpen} value={stats.total} label="Total Buku" color="bg-blue-400" />
                      <StatCard icon={Star} value={stats.selesai} label="Buku Selesai" color="bg-emerald-500" />
                      <StatCard icon={Clock} value={stats.sedang_dibaca} label="Sedang Dibaca" color="bg-orange-400" />
                    </div>
                </motion.div>

                {/* Filters & Actions */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 sticky top-24 z-30">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="w-full md:w-auto flex-grow">
                          <BookFilters onFilterChange={setFilters} filters={filters} />
                        </div>
                        <div className="w-full md:w-auto">
                            <Button 
                                onClick={() => setShowForm(true)}
                                className="w-full bg-[var(--primary-green)] hover:bg-[var(--primary-green-dark)] shadow-md text-base px-6 py-3 h-auto"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Tambah Buku
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array(8).fill(0).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse shadow-sm">
                                <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded mb-6 w-1/2"></div>
                                <div className="h-20 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : filteredBooks.length > 0 ? (
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <AnimatePresence>
                            {filteredBooks.map((book) => (
                                <BookCard
                                    key={book.id}
                                    book={book}
                                    onEdit={handleEdit}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16 bg-white rounded-2xl"
                    >
                        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Tidak ada buku ditemukan
                        </h3>
                        <p className="text-gray-500">
                           Coba ubah filter atau tambahkan buku baru ke koleksi Anda.
                        </p>
                    </motion.div>
                )}

                {/* Form Modal */}
                <AnimatePresence>
                    {showForm && (
                        <BookForm
                            book={editingBook}
                            onSubmit={handleSubmit}
                            onCancel={() => {
                                setShowForm(false);
                                setEditingBook(null);
                            }}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}