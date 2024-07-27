import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    mainImage: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    intro: {
        type: String,
        required: true,
        minLength: [250, "Intro must contain at least 250 characters"]
    },
    paraOneImage: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    paraOneDescription: {
        type: String
    },
    paraOneTitle: {
        type: String
    },
    paraTwoImage: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    paraTwoDescription: {
        type: String
    },
    paraTwoTitle: {
        type: String
    },
    paraThreeImage: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    }, 
    paraThreeDescription: {
        type: String
    },
    paraThreeTitle: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    }, 
    authorAvatar: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    comments: [
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Comment",
        },
    ],
}, {timestamps: true});

const Blog = mongoose.model("Blog", blogSchema)

export default Blog;