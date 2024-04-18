declare global {
  function importShim(moduleId: string): Promise<any>;
}

export type UfrontEnvName = "local-dev" | "local" | "remote";

export interface Configuration {
  ufronts: Record<string, Record<UfrontEnvName, string>>;
}
