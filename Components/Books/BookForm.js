import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookPlus, X, Save } from "lucide-react";

export default function BookForm({ book, onSubmit, onCancel }) {
    const [currentBook, setCurrentBook] = React.useState(book || {
        title: "",
        author: "",
        genre: "fiksi",
        publication_year: "",
        description: "",
        reading_status: "belum_dibaca",
        rating: "",
        pages: "",
        isbn: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookData = {
            ...currentBook,
            publication_year: currentBook.publication_year ? Number(currentBook.publication_year) : null,
            rating: currentBook.rating ? Number(currentBook.rating) : null,
            pages: currentBook.pages ? Number(currentBook.pages) : null
        };
        onSubmit(bookData);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl rounded-2xl">
                    <CardHeader className="border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-3 text-xl font-bold">
                                <BookPlus className="w-6 h-6 text-[var(--primary-green)]" />
                                {book ? 'Edit Detail Buku' : 'Tambah Buku Baru'}
                            </CardTitle>
                            <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-full">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="font-semibold">Judul Buku *</Label>
                                    <Input
                                        id="title"
                                        value={currentBook.title}
                                        onChange={(e) => setCurrentBook({...currentBook, title: e.target.value})}
                                        placeholder="e.g., Laskar Pelangi"
                                        required
                                        className="h-11"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="author" className="font-semibold">Penulis *</Label>
                                    <Input
                                        id="author"
                                        value={currentBook.author}
                                        onChange={(e) => setCurrentBook({...currentBook, author: e.target.value})}
                                        placeholder="e.g., Andrea Hirata"
                                        required
                                        className="h-11"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="genre" className="font-semibold">Genre</Label>
                                    <Select
                                        value={currentBook.genre}
                                        onValueChange={(value) => setCurrentBook({...currentBook, genre: value})}
                                    >
                                        <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fiksi">Fiksi</SelectItem>
                                            <SelectItem value="non-fiksi">Non-Fiksi</SelectItem>
                                            <SelectItem value="teknologi">Teknologi</SelectItem>
                                            <SelectItem value="sejarah">Sejarah</SelectItem>
                                            <SelectItem value="bisnis">Bisnis</SelectItem>
                                            <SelectItem value="self-help">Self-Help</SelectItem>
                                            <SelectItem value="biografi">Biografi</SelectItem>
                                            <SelectItem value="romance">Romance</SelectItem>
                                            <SelectItem value="thriller">Thriller</SelectItem>
                                            <SelectItem value="fantasy">Fantasy</SelectItem>
                                            <SelectItem value="lainnya">Lainnya</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="publication_year" className="font-semibold">Tahun Terbit</Label>
                                    <Input
                                        id="publication_year"
                                        type="number"
                                        min="1000"
                                        max="2030"
                                        value={currentBook.publication_year}
                                        onChange={(e) => setCurrentBook({...currentBook, publication_year: e.target.value})}
                                        placeholder="e.g., 2005"
                                        className="h-11"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="pages" className="font-semibold">Jumlah Halaman</Label>
                                    <Input
                                        id="pages"
                                        type="number"
                                        min="1"
                                        value={currentBook.pages}
                                        onChange={(e) => setCurrentBook({...currentBook, pages: e.target.value})}
                                        placeholder="e.g., 529"
                                        className="h-11"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="reading_status" className="font-semibold">Status Membaca</Label>
                                    <Select
                                        value={currentBook.reading_status}
                                        onValueChange={(value) => setCurrentBook({...currentBook, reading_status: value})}
                                    >
                                        <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="belum_dibaca">Belum Dibaca</SelectItem>
                                            <SelectItem value="sedang_dibaca">Sedang Dibaca</SelectItem>
                                            <SelectItem value="selesai">Selesai</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="rating" className="font-semibold">Rating (1-5)</Label>
                                    <Select
                                        value={currentBook.rating?.toString() || ""}
                                        onValueChange={(value) => setCurrentBook({...currentBook, rating: value})}
                                    >
                                        <SelectTrigger className="h-11"><SelectValue placeholder="Beri rating" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">⭐</SelectItem>
                                            <SelectItem value="2">⭐⭐</SelectItem>
                                            <SelectItem value="3">⭐⭐⭐</SelectItem>
                                            <SelectItem value="4">⭐⭐⭐⭐</SelectItem>
                                            <SelectItem value="5">⭐⭐⭐⭐⭐</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="font-semibold">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    value={currentBook.description}
                                    onChange={(e) => setCurrentBook({...currentBook, description: e.target.value})}
                                    placeholder="Tulis ringkasan singkat atau kesan Anda tentang buku ini..."
                                    rows={4}
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-gray-200">
                                <Button type="button" variant="outline" onClick={onCancel} className="h-11 px-6">
                                    Batal
                                </Button>
                                <Button type="submit" className="bg-[var(--primary-green)] hover:bg-[var(--primary-green-dark)] h-11 px-6 shadow-md">
                                    <Save className="w-4 h-4 mr-2" />
                                    {book ? 'Update Buku' : 'Simpan Buku'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}