import catchAsyncError from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../middlewares/ErrorMiddleware.js";
import Blog from "../models/blogSchema.js";
import Comment from "../models/commentSchema.js";

export const addComment = catchAsyncError(async(req, res, next) => {
    const {id} = req.params;
    const {comment} = req.body;
    if(!comment){
        return next(new ErrorHandler("Please Enter Comment"))
    }
    const userName = req.user.name
    const userImage = req.user.userAvatar.url
    const postId = id
    const userId = req.user._id
    let blog = await Blog.findById(id)
    if(!blog){
        return next(new ErrorHandler("Oops Blog not found", 404))
    }

    let newComment = await Comment.create({
        comment,
        userName,
        userImage,
        postId,
        userId
    })
    
    blog = await Blog.findByIdAndUpdate(id, {$push: {comments: newComment._id}})

    return res.status(201).json({
        success: true,
        message: "Comment Send Successfully!"
    })
})

export const getAllComments = catchAsyncError(async(req, res, next) => {
    const { id } = req.params 
    const blog = await Blog.findById(id)
    if(!blog){
        return next(new ErrorHandler("Oops Blog not found", 404))
    }
    let fetchAllComments = await Promise.all(blog.comments.map((curId) => 
          Comment.findById(curId)
    ))

    return res.status(200).json({
        success: true,
        comments: fetchAllComments
    })
})

export const deleteComment = catchAsyncError(async(req, res, next) => {
    const {id} = req.params
    let comment = await Comment.findById(id)
    if(!comment){
        return next(new ErrorHandler("Comment Not Found", 404))
    }

    let blogId = comment.postId 
    
    let blog = await Blog.findById(blogId)
    if(!blog){
        return next(new ErrorHandler("Blog Not Found", 404))
    }
    if(blog.comments.includes(id)){
        await Blog.findByIdAndUpdate(blogId, {$pull: {comments: id}})
    }

    await comment.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Comment Deleted Successfully!"
    })
})

export const updateComment = catchAsyncError(async(req, res, next) => {
    const {id} = req.params
    let {comment} = req.body
    let myComment = await Comment.findById(id)
    if(!myComment){
        return next(new ErrorHandler("Comment Not Found", 404))
    }

    if(!comment){
        return next(new ErrorHandler("Please Enter Comment", 400))
    }

    myComment = await Comment.findByIdAndUpdate(id, {comment}, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    return res.status(200).json({
        success: true,
        message: "Comment Updated!",
        comment: myComment
    })
})