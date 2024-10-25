const RetailerProduct = require('../../Model/RetailerProReg/RetailerProduct');

exports.getAllProducts = (req, res) => {
    RetailerProduct.getAll((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.getProductById = (req, res) => {
    RetailerProduct.getById(req.params.pid, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

exports.createProduct = (req, res) => {
    RetailerProduct.create(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Product created successfully', productId: result.insertId });
    });
};

exports.updateProduct = (req, res) => {
    RetailerProduct.update(req.params.pid, req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Product updated successfully' });
    });
};

exports.deleteProduct = (req, res) => {
    RetailerProduct.delete(req.params.pid, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Product deleted successfully' });
    });
};
