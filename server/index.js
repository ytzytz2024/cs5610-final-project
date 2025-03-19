const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

// 初始化Express应用
const app = express();
const PORT = process.env.PORT || 5001;

// 中间件
app.use(cors());
app.use(express.json());

// 导入所有路由
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// 注册所有路由
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

// 测试路由
app.get('/api', (req, res) => {
  res.json({ message: 'SmartRecipe API is running' });
});

// 连接MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});