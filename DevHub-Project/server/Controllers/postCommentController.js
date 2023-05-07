const Post = require('../Models/postModel');
const Comment = require('../Models/commentModel');

 const myPost = async (req,res) => {
    const {title, post, tag} = req.body;

    try {
        await postModel.create({
            title,
            post,
            tag
        });
        res.send('post successful');
        
    } catch (error) {
        res.status(500).send("cannot post");
        throw error;  
    }
 }


 const updatePost = async (req, res) => {
    const {id} = req.params;
    const {title, post, tag} = req.body;

    try {
        const post = await Post.findByIdAndUpdate(id,{title, post}, {new:true});
        if (!post) {
            return res.status(401).send({msg:'cannot update post'});
        }
    } catch (error) {
        res.status(404).send({ msg:'cannot update post' });  
        throw error;    
    }

 }


 const deletePost =  async(req, res)=> {
    try {
        let {id} = req.params;
        const toDelete = await postModel.findByIdAndRemove(id);
        res.status(204).send({msg: 'post deleted', toDelete});
        
    } catch (error) {
        res.status(500).send({msg:'unable to delete post'});
        throw error;
    }
}


module.exports = {
    myPost,
    updatePost,
    deletePost
}