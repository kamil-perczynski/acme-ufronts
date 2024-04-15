export type LoggedUser = {
  username: string;
  email: string;
  name: string;
};

export function someLoggedUser(): LoggedUser {
  return {
    email: "kamil.perczynski@respect.energy",
    username: "kamil.perczynski",
    name: "Kamil Perczyński",
  };
}

export async function fetchLoggedUser(): Promise<LoggedUser> {
  return fetch("https://jsonplaceholder.typicode.com/users/2").then((res) =>
    res.json(),
  );
}
