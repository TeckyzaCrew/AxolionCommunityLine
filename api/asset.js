export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const r = await fetch(`https://economy.roblox.com/v2/assets/${id}/details`);
    const d = await r.json();
    d.imageUrl = `https://via.placeholder.com/150/16243d/00e5ff?text=AXO+Asset`;
    res.status(200).json(d);
  } catch(e) { res.status(500).json({error: 'Proxy Error'}); }
}