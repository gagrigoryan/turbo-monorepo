const fs = require("fs");
const path = require("path");
const os = require("os");
const prompts = require("prompts");
const execSync = require("child_process").execSync;

const templates = Object.freeze({
  "rollup+ts+scss": {
    directory: "templates/rollup-typescript-template",
  },
  custom: {
    directory: "templates/custom-template",
  },
});

const getTemplateOptions = () => {
  return Object.keys(templates).map((item) => ({
    title: item,
  }));
};

const generateTemplate = async () => {
  const rootDir = path.join(__dirname, "..");

  try {
    const packageData = await prompts([
      {
        type: "text",
        name: "packageName",
        message: "Package name",
        initial: "./my_package",
      },
      {
        type: "autocomplete",
        name: "buildType",
        message: "Pick your package builder",
        choices: getTemplateOptions(),
      },
    ]);

    const { packageName, buildType } = packageData;

    const destinationDir = path.join(rootDir, `packages/${packageName}`);
    const templateDir = path.join(rootDir, templates[buildType].directory);
    const packageJsonTemplate = path.join(templateDir, "template.json");

    const json = JSON.parse(fs.readFileSync(packageJsonTemplate, "utf8"));

    if (fs.existsSync(destinationDir)) {
      throw Error("package with the same name already exists");
    }

    fs.mkdirSync(destinationDir, { recursive: true });

    fs.writeFileSync(
      path.join(destinationDir, `package.json`),
      JSON.stringify(
        {
          name: `@mykit/${packageName}`,
          ...json,
        },
        null,
        2
      ) + os.EOL
    );

    fs.cpSync(path.join(templateDir, "template"), destinationDir, {
      recursive: true,
    });
    execSync("yarn install");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

generateTemplate();
