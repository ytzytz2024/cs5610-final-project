const express = require('express');
const router = express.Router();

// 获取所有食谱
router.get('/', async (req, res) => {
  try {
    // 数据库操作...
    res.json(results); // 使用res.json()返回数据
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;