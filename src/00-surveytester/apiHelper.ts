export function getHeader() {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    return {
        headers: { "token": userData?.Token }
    }
}