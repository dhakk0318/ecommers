const createError = require('http-errors');
const db = require('../../Config/db');  // Database connection

// Controller to get count of admin users
const getAdminUserCount = (req, res) => {
    const query = 'SELECT COUNT(*) AS userCount FROM tbl_admin_user_registration';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching admin user count:', err);
            return res.status(500).json({ message: 'Error fetching admin user count', error: err });
        }
        return res.status(200).json(results[0]);
    });
};

// Controller to get count of categories
const getCategoryCount = (req, res) => {
    const query = 'SELECT COUNT(*) AS categoryCount FROM tbl_admin_p_category';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching category count:', err);
            return res.status(500).json({ message: 'Error fetching category count', error: err });
        }
        return res.status(200).json(results[0]);
    });
};

// Controller to get count of subcategories
const getSubCategoryCount = (req, res) => {
    const query = 'SELECT COUNT(*) AS subcategoryCount FROM tbl_admin_p_sub_category';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching subcategory count:', err);
            return res.status(500).json({ message: 'Error fetching subcategory count', error: err });
        }
        return res.status(200).json(results[0]);
    });
};

// Controller to get count of retailer products
const getRetailerProductCount = (req, res) => {
    const query = 'SELECT COUNT(*) AS productCount FROM tbl_retailer_products';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching product count:', err);
            return res.status(500).json({ message: 'Error fetching product count', error: err });
        }
        return res.status(200).json(results[0]);
    });
};
const getRetailerCount = (req, res) => {
    const query = 'SELECT COUNT(*) AS retailerCount FROM tbl_retailer_reg';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching retailer count:', err);
            return res.status(500).json({ message: 'Error fetching retailer count', error: err });
        }
        return res.status(200).json(results[0]);
    });
};

// Exporting controller functions
module.exports = {
    getAdminUserCount,
    getCategoryCount,
    getSubCategoryCount,
    getRetailerProductCount,
    getRetailerCount
};
