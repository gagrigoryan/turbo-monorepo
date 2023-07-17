const fs = require("fs");
const path = require("path");
const os = require("os");
const execSync = require("child_process").execSync;

const processArgs = process.argv;

const generateTemplate = () => {
  const rootDir = path.join(__dirname, "..");
  const templateDir = path.join(
    rootDir,
    "templates/rollup-template-typescript"
  );
  const packageJsonTemplate = path.join(templateDir, "template.json");

  const json = JSON.parse(fs.readFileSync(packageJsonTemplate, "utf8"));
  const preparedArguments = processArgs.slice(2);

  try {
    let packageName = "";

    if (preparedArguments.length === 0) {
      throw Error("package name missing");
    }
    packageName = preparedArguments[0];

    const destinationDir = path.join(rootDir, `packages/${packageName}`);

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
    console.error(error);
  }
};

generateTemplate();
