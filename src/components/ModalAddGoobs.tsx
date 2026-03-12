"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export function AddProductModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки данных на сервер (POST запрос)
    console.log("Товар добавлен");
    setIsOpen(false); // Закрываем окно после успеха
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Кнопка, которая открывает модалку */}
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-[#2D3FE7] hover:bg-[#1e2dbd]">
          <Plus size={20} />
          <span>Добавить</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Добавить новый товар</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Наименование</label>
            <Input placeholder="Например, iPhone 15" required />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Категория</label>
            <Input placeholder="Электроника" required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Цена, ₽</label>
            <Input type="number" placeholder="0" required />
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Отмена
            </Button>
            <Button type="submit" className="bg-[#2D3FE7]">
              Сохранить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}