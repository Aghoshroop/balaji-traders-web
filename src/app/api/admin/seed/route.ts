import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import productsData from '@/data/products.json';

export async function GET() {
  try {
    const productsRef = collection(db, 'products');
    
    // Seed all products from JSON
    const promises = productsData.map(async (product) => {
      const docRef = doc(productsRef, product.id);
      await setDoc(docRef, product);
    });
    
    await Promise.all(promises);
    
    return NextResponse.json({ success: true, count: productsData.length });
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
