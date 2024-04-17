import os from "node:os";
import { createHash } from "node:crypto";

export type LoggedUser = {
  displayName: string;
  email: string;
  name: string;
  avatar: string;
};

export async function fetchLoggedUser(): Promise<LoggedUser> {
  const hash = hashString(os.hostname());

  return fetch(`https://dummyjson.com/users/${(hash.code % 100) + 1}`)
    .then((res) => res.json())
    .then((fetchedUser) => ({
      ...fetchedUser,
      displayName: [fetchedUser.firstName, fetchedUser.lastName]
        .filter((it) => Boolean(it))
        .join(" "),
      avatar: `https://api.dicebear.com/8.x/lorelei/svg?seed=${hash.sha256}`,
      hash,
    }));
}

function hashString(item: string) {
  const sha256 = createHash("sha256").update(item).digest("hex");

  const primes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97,
  ];

  let code = 277;
  for (let i = 0; i < sha256.length; i++) {
    code ^= primes[i] * sha256.charCodeAt(i);
  }

  return { code, sha256 };
}
