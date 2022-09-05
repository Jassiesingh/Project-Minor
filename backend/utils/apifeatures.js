class ApiFeatures {
    constructor(query, queryStr) { //queryStr is the keyword and query is everything after the ? in the url
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {}
        this.query = this.query.find({ ...keyword })
        return this
    }

    filter() {
        const queryCopy = { ...this.queryStr }

        //removing some fields for filtering category because if not removed we may not get the product we want
        const removeFields = ["keyword", "page", "limit"]

        removeFields.forEach(key => delete queryCopy[key])

        // filter for price and rating
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)



        this.query = this.query.find(JSON.parse(queryStr)) //this.query is basically product.find method
        return this



    }

    pagination(resultsPerPage){
        const currPage = Number(this.queryStr.page) || 1

        const skip = resultsPerPage * (currPage - 1)

        this.query = this.query.limit(resultsPerPage).skip(skip)
        return this

    }
}




module.exports = ApiFeatures;
