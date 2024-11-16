const express = require('express');
const mongoose = require('mongoose');
const Fruit = require('./routes/fruits'); // Đường dẫn tới file fruits.js trong thư mục model

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/FruitDB', { // Kết nối với cơ sở dữ liệu FruitDB
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Đã kết nối MongoDB'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));

// Các route API
app.get('/fruits', async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.send(fruits);
  } catch (err) {
    res.status(500).send('Lỗi khi lấy dữ liệu trái cây');
  }
});

app.post('/fruits', async (req, res) => {
  try {
    let fruit = new Fruit(req.body);
    fruit = await fruit.save();
    res.send(fruit);
  } catch (err) {
    res.status(400).send('Lỗi khi thêm trái cây');
  }
});

app.put('/fruits/:id', async (req, res) => {
  try {
    const fruit = await Fruit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fruit) return res.status(404).send('Không tìm thấy trái cây.');
    res.send(fruit);
  } catch (err) {
    res.status(400).send('Lỗi khi cập nhật trái cây');
  }
});

app.listen(3000, () => {
  console.log('Server đang chạy trên cổng 3000');
});
