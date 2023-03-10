import axios from "axios";
import config from '../config'
import {NewsI} from "../interfaces/News";
import {Comment} from "../interfaces/Comment";


const getAllId = (): Promise<number[]> => {
    return axios.get<number[]>(`${config.baseUrl}/newstories.json`).then(res => res.data)
}

const getNews = (id: number): Promise<NewsI> => {
    return axios.get(`${config.baseUrl}/item/${id}.json`).then(res => res.data)
}

const getComments = (id: number): Promise<Comment> => {
    return axios.get(`${config.baseUrl}/item/${id}.json`).then(res => res.data)
}

export default {
    getAllId,
    getNews,
    getComments
}