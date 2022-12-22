class GenericController{
    generatePagination(_limit, _page){
        const limit = _limit ? parseInt(_limit) : 5;
        const page = _page ? parseInt(_page) - 1 : 0;

        const paramsLimit = {
            offset: page * limit,
            limit
        }

        return paramsLimit
    }
}

module.exports = GenericController;