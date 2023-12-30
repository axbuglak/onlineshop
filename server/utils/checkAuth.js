import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if(!token) return void res.json({ message: 'No access' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET).catch(() => return void res.json({ message: 'No access' }));
    req.userId = decoded.id;
    return void next();
}
