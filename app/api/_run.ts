import { spawn } from 'node:child_process';

/** 프로젝트 루트에서 CLI 실행(검증된 tsx 파이프라인). 번들링 이슈 회피용. */
export function run(args: string[], env: Record<string, string> = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    const p = spawn('npx', ['tsx', ...args], {
      shell: true,
      cwd: process.cwd(),
      env: { ...process.env, ...env },
    });
    let err = '';
    p.stdout.on('data', (d) => process.stdout.write(d));
    p.stderr.on('data', (d) => { err += d; process.stderr.write(d); });
    p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(err || `exit ${code}`))));
  });
}
