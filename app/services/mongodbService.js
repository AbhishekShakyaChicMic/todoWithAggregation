const dbServices = {};

// dbServices.findUser = async (model,filter) => {
//     return model.findOne(filter).lean();
// }

dbServices.findData = async (model, matchFilter) => {
    return model.aggregate([
        matchFilter
    ])
}

// dbServices.updateUser=async (model,filter,query,option) => {
//     return model.updateOne(filter, query, option);
// }

dbServices.updateData = async (model, matchFilter, setQuery, mergeQuery) => {
    return model.aggregate([
        matchFilter,
        setQuery,
        mergeQuery
    ]);
}

module.exports = dbServices;