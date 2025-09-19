import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Star, Edit } from "lucide-react";

const genreColors = {
  fiksi: "bg-orange-100 text-orange-800",
  "non-fiksi": "bg-emerald-100 text-emerald-800",
  teknologi: "bg-blue-100 text-blue-800",
  sejarah: "bg-yellow-100 text-yellow-800",
  biografi: "bg-indigo-100 text-indigo-800",
  sains: "bg-cyan-100 text-cyan-800",
  bisnis: "bg-gray-200 text-gray-800",
  "self-help": "bg-pink-100 text-pink-800",
  romance: "bg-rose-100 text-rose-800",
  thriller: "bg-red-100 text-red-800",
  fantasy: "bg-purple-100 text-purple-800",
  lainnya: "bg-gray-100 text-gray-800"
};

const statusLabels = {
  belum_dibaca: "Belum Dibaca",
  sedang_dibaca: "Sedang Dibaca",
  selesai: "Selesai"
};

export default function BookCard({ book, onEdit }) {
  const renderStars = (rating) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-[var(--primary-green)]">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-800 line-clamp-2 leading-tight pr-4">
              {book.title}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(book)}
              className="text-gray-400 hover:text-[var(--primary-green)] flex-shrink-0 -mt-2 -mr-2"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-500 font-medium">{book.author}</p>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-4">
             {book.description && (
              <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed h-[60px]">
                {book.description}
              </p>
            )}

            <div className="flex gap-2 flex-wrap">
              <Badge className={`${genreColors[book.genre] || genreColors.lainnya} font-medium`}>
                {book.genre}
              </Badge>
              <Badge variant="outline" className="font-medium">
                {statusLabels[book.reading_status]}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
              <div className="flex items-center gap-4">
                {book.publication_year && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{book.publication_year}</span>
                  </div>
                )}
                {book.pages && (
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    <span>{book.pages} hal</span>
                  </div>
                )}
              </div>
              {book.rating && renderStars(book.rating)}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}