declare global {
  function importShim(moduleId: string): Promise<any>;
}

export interface Configuration {
  ufronts: Record<string, string>;
}
