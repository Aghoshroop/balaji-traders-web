import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create a safe, unique filename
    const originalName = file.name;
    const extension = path.extname(originalName);
    const safeName = path.basename(originalName, extension).replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const timestamp = Date.now();
    const newFileName = `${safeName}-${timestamp}${extension}`;
    
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'products');
    
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filePath = path.join(uploadDir, newFileName);
    fs.writeFileSync(filePath, buffer);
    
    const publicUrl = `/images/products/${newFileName}`;
    
    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      filename: newFileName
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
