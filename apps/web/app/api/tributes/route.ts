// app/api/tributes/route.ts
import { NextResponse } from 'next/server'

// In-memory store (swap with DB later)
let tributes: any[] = []

export async function GET() {
  return NextResponse.json(tributes)
}

export async function POST(req: Request) {
  const data = await req.json()
  const newTribute = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  tributes.push(newTribute)
  return NextResponse.json(newTribute)
}
