export function call_approxOT(C, r, c) {
    return fetch("http://localhost:80/", {
        method: "POST",
        body: { C, r, c }
    });
}
