'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Save, X, ImagePlus, Loader2, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';
import type { Product } from '@/types';

export default function HiddenAdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  };

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleAddNew = () => {
    setEditingProduct({
      name: '',
      brand: 'Balaji',
      category: 'Swimwear',
      price: 0,
      mrp: 0,
      shortDescription: '',
      images: [],
      sizes: ['Standard'],
      colors: ['Standard'],
      material: '',
      availability: 'in-stock',
    });
    setView('editor');
  };

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setView('editor');
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
      showFeedback('Product deleted');
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    setUploadingImage(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.success && editingProduct) {
        setEditingProduct({
          ...editingProduct,
          images: [{ src: data.url, alt: editingProduct.name || 'Product Image', width: 800, height: 1000 }]
        });
      }
    } catch (err) {
      console.error('Upload failed', err);
      alert('Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    if (!editingProduct?.name || !editingProduct?.images?.length) {
      alert('Name and Image are required!');
      return;
    }
    
    setSaving(true);
    try {
      const isNew = !editingProduct.id;
      const res = await fetch('/api/admin/products', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });
      
      const savedProduct = await res.json();
      
      if (isNew) {
        setProducts([...products, savedProduct]);
      } else {
        setProducts(products.map(p => p.id === savedProduct.id ? savedProduct : p));
      }
      
      showFeedback('Product saved successfully!');
      setView('list');
    } catch (err) {
      console.error('Failed to save', err);
      alert('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans selection:bg-sky-200">
      {/* Toast Feedback */}
      {feedback && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {feedback}
        </div>
      )}

      {view === 'list' && (
        <>
          {/* Header */}
          <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 flex items-center justify-between">
            <h1 className="text-xl font-black uppercase tracking-tight">Inventory</h1>
            <button 
              onClick={fetchProducts}
              className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          {/* List */}
          <div className="p-4 space-y-3">
            {loading ? (
              <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-sky-500" /></div>
            ) : (
              products.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => handleEdit(p)}
                  className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200 flex items-center gap-4 cursor-pointer active:scale-95 transition-transform"
                >
                  <div className="w-16 h-16 rounded-xl bg-slate-100 relative overflow-hidden shrink-0">
                    {p.images?.[0] ? (
                      <Image src={p.images[0].src} alt={p.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400"><ImagePlus className="w-6 h-6" /></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">{p.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-black text-sky-600">₹{p.price}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{p.sku}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => handleDelete(p.id, e)}
                    className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-full shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
          
          {/* Floating Action Button */}
          <button
            onClick={handleAddNew}
            className="fixed bottom-6 right-6 w-14 h-14 bg-slate-900 text-white rounded-full shadow-xl shadow-slate-900/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-40"
          >
            <Plus className="w-6 h-6" />
          </button>
        </>
      )}

      {view === 'editor' && editingProduct && (
        <div className="bg-white min-h-screen pb-32">
          {/* Editor Header */}
          <div className="sticky top-0 z-30 bg-white border-b border-slate-100 p-4 flex items-center gap-3">
            <button onClick={() => setView('list')} className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-black uppercase flex-1">{editingProduct.id ? 'Edit Product' : 'New Product'}</h1>
          </div>

          <div className="p-4 space-y-6 max-w-lg mx-auto">
            {/* Image Upload Area */}
            <div>
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
              />
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-square bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer hover:bg-slate-100 transition-colors"
              >
                {editingProduct.images?.[0] ? (
                  <>
                    <Image src={editingProduct.images[0].src} alt="Preview" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="bg-white text-slate-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg">Change Photo</span>
                    </div>
                  </>
                ) : uploadingImage ? (
                  <div className="flex flex-col items-center text-sky-600 gap-2">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-xs font-bold uppercase tracking-wider">Uploading...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-slate-400 gap-2">
                    <ImagePlus className="w-10 h-10" />
                    <span className="text-xs font-bold uppercase tracking-wider">Tap to upload photo</span>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Product Name</label>
                <input 
                  type="text" 
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="e.g. Eglider Aqua Wave"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Price (₹)</label>
                  <input 
                    type="number" 
                    value={editingProduct.price || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, price: parseInt(e.target.value) || 0})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">MRP (₹)</label>
                  <input 
                    type="number" 
                    value={editingProduct.mrp || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, mrp: parseInt(e.target.value) || 0})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-bold text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Brand</label>
                  <select 
                    value={editingProduct.brand || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, brand: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Balaji">Balaji</option>
                    <option value="Eglider">Eglider</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">SKU</label>
                  <input 
                    type="text" 
                    value={editingProduct.sku || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, sku: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-mono text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="e.g. BLJ-001"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Short Description</label>
                <textarea 
                  rows={2}
                  value={editingProduct.shortDescription || ''}
                  onChange={(e) => setEditingProduct({...editingProduct, shortDescription: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                  placeholder="Catchy 1-liner describing the product..."
                />
              </div>
            </div>
          </div>

          {/* Sticky Save Bar */}
          <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-4 flex gap-4 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40">
            <button 
              onClick={() => setView('list')}
              className="flex-1 py-4 font-bold text-slate-500 bg-slate-100 rounded-2xl"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex-[2] py-4 font-black uppercase tracking-widest text-white bg-slate-900 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 active:scale-95 transition-transform"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
