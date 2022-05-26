
export default function handler(req, res) {
    if (req.method === 'POST') {
        const {from, text} = req.body;
        
        res.status(200).json(req.body);
    }
  }