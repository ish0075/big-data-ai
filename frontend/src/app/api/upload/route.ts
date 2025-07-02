import { NextResponse } from 'next/server';
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { tmpdir } from 'os';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'No file' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const tempPath = path.join(tmpdir(), file.name);
  await fs.promises.writeFile(tempPath, buffer);

  const result = spawnSync('python', ['backend/crewai_agents/main.py', tempPath], {
    cwd: path.join(process.cwd(), '..'),
  });

  if (result.status !== 0) {
    return NextResponse.json({ error: result.stderr.toString() }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
