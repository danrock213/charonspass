// app/api/tributes/[id]/route.ts
import { NextResponse } from 'next/server'

let tributes: any[] = []

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const tribute = tributes.find(t => t.id === params.id)
  return tribute ? NextResponse.json(tribute) : NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const index = tributes.findIndex(t => t.id === params.id)
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  tributes[index] = { ...tributes[index], ...data }
  return NextResponse.json(tributes[index])
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  tributes = tributes.filter(t => t.id !== params.id)
  return NextResponse.json({ success: true })
}
