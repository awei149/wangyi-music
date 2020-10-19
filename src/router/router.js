import Findmusic from '../components/Findmusic/Findmusic'
import Mymusic from '../components/Mymusic/Mymusic'
const routes = [
    {
        path:'/',
        exact:true,
        component:Findmusic
    },
    {
        path:'/mymusic',
        component:Mymusic
    }
]
export default routes;