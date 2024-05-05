
const { Product } = require("../models");

class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ?
            {
                name: {
                    [db.Sequelize.Op.iLike]: `%${this.queryStr.keyword}%`
                },
            } : {}

        this.query = Product.findAll({ where: { ...keyword } });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        const removeFeilds = ['Keyword', 'page', 'limit'];

        removeFeilds.forEach((key) => delete queryCopy[key]);

        this.query = Product.findAll({ where: { ...queryCopy } });

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = Product.findAll({
            ...this.query,
            limit: resultPerPage,
            offset: skip,
        });
        return this;

    }
}

module.exports = ApiFeatures;