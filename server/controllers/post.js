import { PostModel } from '../models/PostModel.js'

export const getPosts = async(req, res) => {
    //res.send('ROUTER SUCCESS');
    try {
        const posts = await PostModel.find();
        console.log('posts', posts);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const createPost = async (req, res) => {
    //res.send('ROUTER SUCCESS');
    try {
        const newPost = req.body;

        const post = new PostModel(newPost);

        await post.save();

        res.status(200).json(post);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

export const updatePost = async (req, res) => {
    //res.send('ROUTER SUCCESS');
    try {
        const updatePost = req.body;

        const post = await PostModel.findOneAndUpdate({ _id: updatePost._id }, updatePost, { new: true });

        res.status(200).json(post);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};