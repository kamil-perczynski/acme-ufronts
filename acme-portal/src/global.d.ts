declare global {
  function importShim(moduleId: string): Promise<any>;
}
export {};
