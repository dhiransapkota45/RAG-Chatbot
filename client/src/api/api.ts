export const get : <T>(url : string) => Promise<T> = async(url) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKENDURL}/${url}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const post : <T>(url : string, body : any) => Promise<T> = async(url, body) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKENDURL}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}