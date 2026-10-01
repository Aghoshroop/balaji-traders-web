'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Save, ArrowLeft, RefreshCw, CheckCircle2, ImagePlus, Loader2, LogOut, Pencil } from 'lucide-react';
import { db, storage, auth } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';
import type { Product } from '@/types';

export default function HiddenAdminPanel() {
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Admin State
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        fetchProducts();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setAuthError(error.message || 'Failed to login');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch');
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err: any) {
      console.error('Failed to load products', err);
      showFeedback('Error fetching products.');
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
      // Instead of deleting the document, we mark it as deleted.
      // This ensures that even if it's a hardcoded product, it gets overridden and hidden.
      await setDoc(doc(db, 'products', id), { isDeleted: true }, { merge: true });
      setProducts(products.filter(p => p.id !== id));
      showFeedback('Product deleted');
    } catch (err: any) {
      console.error('Failed to delete', err);
      showFeedback('Delete failed. Check Firebase rules.');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploadingImage(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed on server');
      }

      const data = await response.json();
      
      if (editingProduct) {
        setEditingProduct({
          ...editingProduct,
          images: [{ src: data.url, alt: editingProduct.name || 'Product Image', width: 800, height: 1000 }]
        });
      }
      
      showFeedback('Upload successful');
    } catch (err) {
      console.error('Upload error', err);
      showFeedback('Upload error');
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
      let finalProduct = { ...editingProduct };
      
      // Auto-generate ID if new
      if (isNew) {
        const maxId = products.reduce((max, p) => {
          const num = parseInt(p.id.replace('prod-', ''), 10);
          return isNaN(num) ? max : Math.max(max, num);
        }, 0);
        finalProduct.id = `prod-${maxId + 1}`;
      }
      
      // Auto-generate slug
      if (!finalProduct.slug) {
        finalProduct.slug = finalProduct.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }
      if (!finalProduct.categorySlug && finalProduct.category) {
        finalProduct.categorySlug = finalProduct.category.toLowerCase();
      }

      await setDoc(doc(db, 'products', finalProduct.id as string), finalProduct);
      
      if (isNew) {
        setProducts([...products, finalProduct as Product]);
      } else {
        setProducts(products.map(p => p.id === finalProduct.id ? (finalProduct as Product) : p));
      }
      
      showFeedback('Product saved to Firebase!');
      setView('list');
    } catch (err) {
      console.error('Failed to save', err);
      showFeedback('Save failed. Check Firebase rules.');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
          <span className="technical-mono text-xs font-bold text-slate-500">AUTHENTICATING...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 w-full max-w-md shadow-2xs">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">Admin Login</h1>
            <p className="text-xs text-slate-500 mt-2 technical-mono">SECURE WAREHOUSE PORTAL</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100">
                {authError}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase technical-mono">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                placeholder="admin@balajitraders.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase technical-mono">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-slate-950 hover:bg-sky-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md mt-6"
            >
              Access Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

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
            <h1 className="text-xl font-black uppercase tracking-tight text-slate-800">Firebase CMS</h1>
            <div className="flex items-center gap-2">
              <button 
                onClick={fetchProducts}
                className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200"
                title="Refresh"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button 
                onClick={handleLogout}
                className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-600 rounded-full hover:bg-red-100"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* List */}
          <div className="p-4 space-y-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-10 gap-2">
                <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Connecting to Firebase...</span>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-10 text-center gap-3">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                  <DatabaseIcon className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="font-bold text-slate-800">Database is Empty</h3>
                <p className="text-sm text-slate-500">Check your Firebase security rules, or tap + to add your first product.</p>
              </div>
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
                    <h3 className="font-bold text-sm text-slate-800 truncate">{p.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-black text-sky-600">₹{p.price}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{p.sku || p.id}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 shrink-0">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEdit(p); }}
                      className="w-10 h-10 flex items-center justify-center bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors rounded-full"
                      title="Edit Product"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => handleDelete(p.id, e)}
                      className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 transition-colors rounded-full"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Floating Action Button */}
          <button
            onClick={handleAddNew}
            className="fixed bottom-6 right-6 w-14 h-14 bg-sky-500 text-white rounded-full shadow-xl shadow-sky-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-40"
          >
            <Plus className="w-6 h-6" />
          </button>
        </>
      )}

      {view === 'editor' && editingProduct && (
        <div className="bg-white min-h-screen pb-32">
          {/* Editor Header */}
          <div className="sticky top-0 z-30 bg-white border-b border-slate-100 p-4 flex items-center gap-3 shadow-sm">
            <button onClick={() => setView('list')} className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-600 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-black uppercase text-slate-800 flex-1">{editingProduct.id ? 'Edit Product' : 'New Product'}</h1>
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
                    <span className="text-xs font-bold uppercase tracking-wider">Uploading to Cloud...</span>
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
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Category</label>
                  <select 
                    value={editingProduct.category || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Swimwear">Swimwear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
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
              className="flex-[2] py-4 font-black uppercase tracking-widest text-white bg-sky-500 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-sky-500/30 active:scale-95 transition-transform"
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

function DatabaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}
