import fs from "node:fs";
import path from "node:path";

let instance: AppConfig<any> = null as unknown as AppConfig<any>;

export class AppConfig<T extends object> {
  private config: T | null = null;
  private loader: Promise<any>;

  constructor(loader: Promise<string>) {
    this.loader = loader.then((config) => {
      this.config = JSON.parse(config);
    });
  }

  public get(): Promise<T> {
    if (this.config) {
      return Promise.resolve(this.config);
    }

    return this.loader.then(() => this.config as unknown as T);
  }

  static load<T extends object>(): AppConfig<T> {
    const configPath = path.resolve(process.cwd(), "./config.json");

    if (instance === null) {
      instance = new AppConfig(
        fs.promises
          .readFile(configPath)
          .then((bytes) => bytes.toString("utf-8"))
      );

      console.debug("Reading config from:", configPath);
    }

    return instance;
  }
}
