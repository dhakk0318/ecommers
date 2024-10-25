const db = require('../../Config/db');

const RetailerProduct = {
    getAll: (callback) => {
        db.query('SELECT * FROM tbl_retailer_products', callback);
    },
    getById: (pid, callback) => {
        db.query('SELECT * FROM tbl_retailer_products WHERE pid = ?', [pid], callback);
    },
    create: (productData, callback) => {
        const { sub_catid, retid, pid, productname, price, qty, company } = productData;
        db.query(
            'INSERT INTO tbl_retailer_products (sub_catid, retid, pid, productname, price, qty, company) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [sub_catid, retid, pid, productname, price, qty, company],
            callback
        );
    },
    update: (pid, productData, callback) => {
        const fields = [];
        const values = [];

        if (productData.productname) {
            fields.push('productname = ?');
            values.push(productData.productname);
        }
        if (productData.price) {
            fields.push('price = ?');
            values.push(productData.price);
        }
        if (productData.qty) {
            fields.push('qty = ?');
            values.push(productData.qty);
        }
        if (productData.company) {
            fields.push('company = ?');
            values.push(productData.company);
        }

        if (fields.length === 0) {
            return callback(new Error('No fields to update'));
        }

        values.push(pid);
        const query = `UPDATE tbl_retailer_products SET ${fields.join(', ')} WHERE pid = ?`;
        db.query(query, values, callback);
    },
    delete: (pid, callback) => {
        db.query('DELETE FROM tbl_retailer_products WHERE pid = ?', [pid], callback);
    }
};

module.exports = RetailerProduct;
