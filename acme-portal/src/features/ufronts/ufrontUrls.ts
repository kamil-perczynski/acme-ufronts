import { Configuration, UfrontEnvName } from "~/global";

export function toUfrontUrl(ufront: string, config: Configuration) {
  const parts = ufront.split(/@|-|\//).filter((it) => Boolean(it));

  const envName = ["ufront", ...parts].map((it) => it.toUpperCase()).join("_");
  const ufrontEnv: UfrontEnvName =
    (process.env[envName] as UfrontEnvName) ?? "remote";

  return config.ufronts[ufront][ufrontEnv] ?? config.ufronts[ufront].remote;
}
