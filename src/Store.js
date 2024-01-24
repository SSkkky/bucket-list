import { create } from 'zustand';
import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_baseURL,
    timeout: 1000
});

export const useActiveStore = create((set) => {
    return {
        active: false,
        setActive: (a) => set({ active: a })
    }
})

export const useStore = create((set) => {
    return {
        data: [],
        selData: {},
        setD: (newD) => set({ d: newD }),
        d: [],
        setData: (items) => {
            set({ seldata: items });
        },
        getData: () => {
            request.get('/')
                .then(res => set({ data: res.data }))
                .catch((err) => { console.log(err) })
        },
        postData: (f) => {
            request.post('/', f)
                .then(res => set({ data: res.data }))
                .catch((err) => { console.log(err) })
        },
        deleteData: (id) => {
            request.delete(`/${id}`)
                .then(res => { set({ data: res.data }); })
                .catch((err) => { console.log(err) })
        },
        putData: (f) => {

            console.log("f", f)
            request.put(`/`, f)
                .then(res => { set({ data: res.data }); })
                .catch((err) => { console.log(err) })
        }   
    }
})