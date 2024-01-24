import { useEffect } from 'react';
import '../styles/common.scss'
import '../styles/home.scss'
import View from './View';
import { useActiveStore, useStore } from '../Store';
import Write from './Write';

function Home() {
    const { getData } = useStore();
    const { setActive } = useActiveStore();

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className='HomeContainer'>
                <View />
                <Write />
                <button className='writeBtn' onClick={() => { setActive(true) }}>+</button>
            </div>
        </>
    );
}

export default Home;