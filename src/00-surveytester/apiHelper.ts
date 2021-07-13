export function getHeader() {
    const authToken = localStorage.getItem("token")
    return {
        headers: { "token": authToken }
    }
}