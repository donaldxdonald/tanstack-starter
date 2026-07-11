#!/usr/bin/env node

import { access, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { spawnSync } from "node:child_process";

const packageJsonPath = new URL("../package.json", import.meta.url);
const nitroConfigPath = new URL("../nitro.config.ts", import.meta.url);

const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
packageJson.scripts = {
  ...packageJson.scripts,
  "cf:preview": "vp build && wrangler dev",
  "cf:deploy": "vp build && wrangler deploy",
};

await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

try {
  await access(nitroConfigPath, constants.F_OK);
  console.log("Keeping existing nitro.config.ts");
} catch {
  await writeFile(
    nitroConfigPath,
    `import { defineConfig } from "nitro";\n\nexport default defineConfig({\n  preset: "cloudflare_module",\n});\n`,
  );
  console.log("Created nitro.config.ts with the Cloudflare Workers preset");
}

if (!packageJson.devDependencies?.wrangler) {
  console.log("Installing Wrangler...");
  const result = spawnSync("vp", ["add", "-D", "wrangler"], {
    cwd: new URL("..", import.meta.url),
    stdio: "inherit",
  });

  const updatedPackageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
  if (result.status !== 0 && !updatedPackageJson.devDependencies?.wrangler) {
    console.error("Wrangler installation failed. Run: vp add -D wrangler");
    process.exit(result.status ?? 1);
  }
}

console.log(
  `\nCloudflare Workers deployment is ready.\n\nNext steps:\n  1. Authenticate: vp exec wrangler login\n  2. Preview:      vp run cf:preview\n  3. Deploy:       vp run cf:deploy\n`,
);
