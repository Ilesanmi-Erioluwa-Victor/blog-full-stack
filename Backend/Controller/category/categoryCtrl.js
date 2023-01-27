const expressAsyncHandler = require("express-async-handler");
const Category = require("../../Model/category/Category");
const ValidateMongoDbId = require("../../Utils/ValidateMongoDbId");

// ___________________________Create CategoryCtrl
const CreateCategoryCtrl = expressAsyncHandler( async(req, res) => {
   try {
     const category = await Category.create ({
        user : req?.user?._id,
        title : req?.body?.title
     })
     res.json(category)
   } catch (error) {
    res.json(error.message)
   }
});

// ___________________________Getall CategoryCtrl
const GetAllCategoryCtrl = expressAsyncHandler(async(req, res) => {
try {
    const category = await Category.find({}).populate("user").sort("-createdAt");
        res.json(category);
} catch (error) {
    res.json(error.message)
}
});

// ___________________________Get CategoryCtrl
const GetCategoryCtrl = expressAsyncHandler( async(req, res) => {
    const { id } = req?.params
    ValidateMongoDbId(id)
    try {
        const category = await Category.findById(id).populate("user").sort("-createdAt")
        res.json(category)
    } catch (error) {
        res.json(error.message)
    }
});

// ___________________________Update CategoryCtrl
const UpdateCategory = expressAsyncHandler(async(req, res) => {
    const { id } = req?.params;
    ValidateMongoDbId(id)
  try {
    const category = await Category.findByIdAndUpdate(id, {
     title : req?.body?.title
    }, {new : true, runValidators: true})
    res.json(category)
  } catch (error) {
    res.json(error.message)
  }
});

// ___________________________Delete CategoryCtrl
const DeleteCategoryCtrl = expressAsyncHandler(async(req, res) => {
    const { id } = req?.params;
    ValidateMongoDbId(id)
    try {
        const category =  await Category.findByIdAndDelete(id);
        res.json(category);
    } catch (error) {
        res.json(error.message);
    }
})
module.exports = {
    CreateCategoryCtrl,
    GetAllCategoryCtrl,
    GetCategoryCtrl,
    UpdateCategory,
    DeleteCategoryCtrl
}