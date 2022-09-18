#!/usr/bin/env node

import { pkgInit, pkgInstall, pkgScript } from "./util/pkg";
import prompt from "prompt";
import { execaSync as execa } from "execa";
import { existsSync } from "fs";
import consola from "consola";
import path from "path";
import { copy } from "fs-extra";

const _dirname = path.resolve(__dirname, "../");
const template = path.resolve(_dirname, "./template");

const schema = {
  properties: {
    name: {
      description: "Your Docs Dir",
      pattern: /^[a-zA-Z\-]+$/,
      message: "Name must be only letters or dashes",
      required: true,
    },
  },
};

const run = async () => {
  prompt.start();
  const name = (await prompt.get(schema)).name as string;
  if (existsSync(path.resolve("./", name as string))) {
    consola.error(`dir ${name} already existed!`);
    process.exit(1);
  }
  execa(`mkdir ${name}`);
  process.chdir(path.resolve(process.cwd(), `./${name}`));
  pkgInit();
  consola.info("Installing dependencies...");
  await copy(template, process.cwd());
  pkgInstall("@akrc/vidocs");
  pkgScript("dev", "vidocs dev");
  pkgScript("build", "vidocs build");
  pkgScript("build:ssg", "vidocs build:ssg");
  consola.success("Create vidocs successfully");
  consola.log("Run following script to get started:");
  consola.log(` cd ${name}`);
  consola.log(" vidocs dev");
};

run();
