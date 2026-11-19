import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const env = { ...process.env };

// Concurrent nested directory creation can fail on Windows workspace mounts.
if (process.platform === "win32") env.UV_THREADPOOL_SIZE ??= "1";

const result = spawnSync(process.execPath, [require.resolve("next/dist/bin/next"), "build", "--webpack"], {
  env,
  stdio: "inherit",
});

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
