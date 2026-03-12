"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  RotateCcw,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowDownUp,
} from "lucide-react";
import { Product } from "../shared/types";
import { getAuthToken, removeAuthToken } from "../shared/lib/cookies";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const ProductsTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const nav = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [select, setSelect] = useState("");
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  const logout = () => {
    removeAuthToken();
    nav.push("/");
    toast.success("Вы успешно вышли из системы");
  };

  // const getRaitingColor2 = (rating: number) => {
  //   if (rating >= 4) {
  //     return "text-green-500";
  //   } else if (rating >= 3) {
  //     return "text-yellow-500";
  //   } else {
  //     return "text-red-500";
  //   }
  // };   ВОЗМОЖНО ЛУЧШЕ НО НЕ ПО ТЗ

  const getRaitingColor = (rating: number) => {
    if (rating < 3) {
      return "text-red-500";
    }
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const processedProducts = useMemo(() => {
  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(select.toLowerCase()) ||
      p.category.toLowerCase().includes(select.toLowerCase())
  );
  return [...filtered].sort((a, b) => 
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price
  );
}, [products, select, sortOrder]);

  const currentProducts = processedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      nav.push("/");
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Ошибка при загрузке");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Произошла ошибка:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-[#F8F9FB] min-h-screen font-sans">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-slate-900">Товары</h1>
        <div className="relative w-full max-w-5xl">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Найти"
            value={select}
            onChange={(e) => {
              setSelect(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-100 rounded-lg shadow-sm focus:outline-none"
          />
        </div>
        <button
          className="flex items-center gap-2 bg-[#FF0000] hover:bg-[#CC0000] text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
          onClick={logout}
        >
          <span className="text-sm font-medium">Выйти</span>
        </button>
      </div>

      <div className="bg-white rounded-t-2xl p-4 border-b border-slate-100 flex justify-between items-center">
        <h2 className="font-semibold text-slate-800">Все позиции</h2>
        <div className="flex gap-2">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors">
            <RotateCcw size={20} />
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors">
            <ArrowDownUp onClick={handleSort}/>
          </button>
          <button className="flex items-center gap-2 bg-[#2D3FE7] hover:bg-[#1e2dbd] text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
            <Plus size={20} />
            <span className="text-sm font-medium">Добавить</span>
          </button>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow-sm border-x border-slate-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-sm border-b border-slate-100">
              <th className="p-4 w-12">
                <input type="checkbox" className="rounded border-slate-300" />
              </th>
              <th className="p-4 font-medium">Наименование</th>
              <th className="p-4 font-medium text-center">Вендор</th>
              <th className="p-4 font-medium text-center">Артикул</th>
              <th className="p-4 font-medium text-center">Оценка</th>
              <th className="p-4 font-medium text-center">Цена, ₽</th>
              <th className="p-4 w-28"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {currentProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  Пусто
                </td>
              </tr>
            ) : (
              currentProducts.map((p) => (
                <tr
                  key={p.id}
                  className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${
                    p.selected ? "bg-blue-50/30" : ""
                  }`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={p.selected}
                      className="rounded border-slate-300 text-blue-600"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-lg shrink-0" />
                      <div>
                        <div className="font-bold text-slate-900">
                          {p.title}
                        </div>
                        <div className="text-xs text-slate-400">
                          {p.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center font-bold text-slate-800">
                    {p.brand}
                  </td>
                  <td className="p-4 text-center text-slate-500">{p.sku}</td>
                  <td className={`p-4 text-center font-medium`}>
                    <span className={getRaitingColor(p.rating)}>
                      {p.rating}
                    </span>
                    <span className="font-normal">/5</span>
                  </td>
                  <td className="p-4 text-center font-bold text-slate-800">
                    {p.price}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-end">
                      <button className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Plus size={18} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-b-2xl p-4 flex justify-between items-center border-t border-slate-100">
        <div className="text-sm text-slate-400">
          Показано{" "}
          <span className="text-slate-700 font-medium text-base">
            {indexOfFirstProduct + 1}-
            {Math.min(indexOfLastProduct, products.length)}
          </span>{" "}
          из {products.length}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setCurrentPage(n)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors border ${
                n === currentPage
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-50"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
