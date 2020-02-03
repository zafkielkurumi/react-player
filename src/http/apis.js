import axios from './http';

export class API {
    static async getTopSong(id) {
        const res = await axios.get(`/api/artist/top/song?id=${id}`);
        if (res.code === 200) {
            return res.songs;
        }
    }

    static async getSongUrl(id) {
        const res = await axios.get(`/api/song/url?id=${id}`);
        if (res.code === 200) {
            return res.data[0];
        }
    }
}
