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
import toast from "react-hot-toast";

export function AddProductModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Товар добавлен");
    setIsOpen(false);
  };
  

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-[#2D3FE7] hover:bg-[#1e2dbd] cursor-pointer h-10">
          <Plus size={20} />
          <span>Добавить</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Добавить новый товар</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Наименование</label>
            <Input placeholder="Например, iPhone 15" required />
          </div>
          
          <div className="grid gap-2">
            <label className="text-sm font-medium">Цена, ₽</label>
            <Input type="number" placeholder="0" required />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Вендор</label>
            <Input placeholder="Samsung" required />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Артикул</label>
            <Input placeholder="GRO-BAD-GRE-026" required />
          </div>

          <DialogFooter className="pt-4 bg-white">
            <Button 
              type="button" 
              variant="outline" 
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Отмена
            </Button>
            <Button type="submit" className="bg-[#2D3FE7] cursor-pointer">
              Сохранить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}