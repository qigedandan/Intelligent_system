import axios from "axios";
import { useRouter,useRoute } from "vue-router";


const router = useRouter()
const route = useRoute()
const Http = axios.create({
    baseURL: 'http://127.0.0.1:4002',
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    timeout: 10000,
})

Http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(config.url =='/api/login/' || config.url =='/api/register/'){
        return config
    }
    const email = localStorage.getItem('email');
    if(!email){
        router.push('/login')
        return
    }
    console.log(config.method);
    if(config.method == 'post'){
        config.data.email = email
    }
    if(config.method == 'get'){
        console.log('get');
    config.params.email = email
    }

    // 一定要return config
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default Http