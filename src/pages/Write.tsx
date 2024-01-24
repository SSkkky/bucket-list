import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/write.module.scss';
import { useActiveStore, useStore } from '../Store';

function Write() {
    const { postData, seldata, putData, setData } = useStore();
    const { active, setActive } = useActiveStore();
    const [setMsg] = useState<any>('');
    const InPutRef = useRef<any>()
    let params = {};

    useEffect(() => {
        if (seldata) {
            InPutRef.current.value = seldata.name;
        }
    }, [seldata])
    


    const formChangeHandler = (e: any) => {
        e.preventDefault();
        const nd = new Date();
        const today = nd.getFullYear() + '-' + (nd.getMonth() + 1) + '-' + nd.getDate();
        // console.log(seldata, '---seldata확인!!')
        if (seldata && seldata.id) {
            params = {
                id: seldata.id,
                name: InPutRef.current.value
            }
            putData(params);
            InPutRef.current.value = '';
        } else {
            params = {
                id: nd.getTime(),
                name: InPutRef.current.value,
                date: String(today),
                state: false
            }
            setMsg(InPutRef.current.value)
            console.log(params, '-----params')

            postData(params).then(() => setActive(false));
            InPutRef.current.value = '';
        }
        setData({ id: null, name: null });
    }

    return (
        <div className={styles.writePopup} style={{ display: active ? "block" : "none" }} >
            <div className={styles.writeCont}>
                <div className={styles.writeHeader}>
                    <h3>작성하기</h3>
                    <button onClick={() => { setActive(false)}}>✕</button>
                </div>
                <form onSubmit={formChangeHandler}>
                    <input type="text" ref={InPutRef} placeholder='버킷리스트를 입력해주세요!' />
                    <button>저장</button>
                </form>
            </div>
        </div>
    );
}

export default Write;