import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {

    try{
        const videos = await Video.find({});
        res.render("home", {pageTitle: "home", videos});
    }catch(error){
        console.log(error);
        res.render("home", {pageTitle: "home", videos: []});
    }
}

export const search = (req, res) => {
    const {
        query: { term : searchingBy }
    } = req;
    res.render("search", {pageTitle: "search", searchingBy, videos});
}

export const getUpload = (req, res) => res.render("upload", {pageTitle: "upload"});
export const postUpload = async (req, res) => {
    const {
        body: {title, description},
        file: {path}
    } = req;

    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    })

    // To Do: Upload and Save
    res.redirect(routes.videoDetail(newVideo.id));
}

export const videoDetail = async (req, res) => {
    const {
        params: { id }
    } = req;

    try{
        const video = await Video.findById(id);
        res.render("videoDetail", {pageTitle: video.title, video});
    }catch(error){
        res.redirect(routes.home);
    }

}
export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    } = req;

    try{
        const video = await Video.findById(id);
        res.render("editVideo", {pageTitle: `Edit ${video.title}`, video})
    }catch(error){
        res.redirect(routes.home);
    }

    res.render("editVideo", {pageTitle: "editVideo"});
}

export const postEditVideo = async (req, res) => {
    const {
        params: {id},
        body: {title, description}
    } = req;

    try{
       await Video.findOneAndUpdate({_id : id}, {title, description});
       res.redirect(routes.videoDetail(id));
    }catch(error){
        res.redirect(routes.home);
    }
}
export const deleteVideo = async (req, res) => {
    const {
        params: {id}
    } = req;

    try{
        await Video.findOneAndDelete({_id : id});
    }catch(error){}

    res.redirect(routes.home);
}