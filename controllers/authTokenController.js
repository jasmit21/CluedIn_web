module.exports = {
    post : async (req, res) => {
        try {
          const token = req.header("x-auth-token");
          if (!token) return res.json(false);
          const verified = jwt.verify(token, "passwordKey");
          if (!verified) return res.json(false);
      
          const user = await User.findById(verified.id);
          if (!user) return res.json(false);
          res.json(true);
        } catch (e) {
          res.status(500).json({ err: e.message });
        }
      },
      
}