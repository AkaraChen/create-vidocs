import { execaSync as execa } from "execa";

export type pkgManager = "npm" | "yarn" | "pnpm";

const userAgent = process.env.npm_config_user_agent;

export const getPkgManager = (): pkgManager => {
  if (userAgent) {
    if (userAgent.startsWith("yarn")) {
      return "yarn";
    }
    if (userAgent.startsWith("pnpm")) {
      return "pnpm";
    }
  }
  return "npm";
};

const pkgManager = getPkgManager();

export const pkgInit = () => {
  switch (pkgManager) {
    case "npm":
      execa("npm init -y");
      break;
    case "yarn":
      execa("yarn init -y");
      break;
    case "pnpm":
      execa("pnpm init");
      break;
  }
};

export const pkgInstall = () => execa(`${pkgManager} install`);

export const pkgScript = (script: string, command: string) => {
  execa(`npm set-script ${script} "${command}"`);
};
