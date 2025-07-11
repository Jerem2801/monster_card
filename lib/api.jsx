export async function fetchApi(url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Erreur lors du chargement des données ' + url);
    }
    return res.json();
} 

export function jsonResponse(data, status = 200) {
    return new Response(
        JSON.stringify(data),
        {
            status,
            headers: { 'Content-Type': 'application/json' },
        }
    );
}

export function errorResponse(error, status = 500) {
    return new Response(
        JSON.stringify({ error: error.message || error }),
        {
            status,
            headers: { 'Content-Type': 'application/json' },
        }
    );
}