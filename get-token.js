export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const mapboxToken = process.env.MAPBOX_TOKEN;
    if (mapboxToken) {
        return res.status(200).json({ token: mapboxToken });
    } else {
        return res.status(500).json({ error: 'Token not configured' });
    }
}
