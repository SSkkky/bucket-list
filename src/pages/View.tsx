import React, { useState } from 'react';
import { useActiveStore, useStore } from '../Store';
import { itemTy } from '../modal/dataTypes'

function List() {
    const { d, data, deleteData, setData } = useStore();
    const { active, setActive } = useActiveStore(); // Popup
    const [ view, setView ] = useState('all'); // list.map
    const [ btnstyle, setBtnstyle ] = useState('all'); // button css

    // 'in' 상태와 'done' 상태를 따로 관리
    const inList = data.filter((obj: itemTy) => obj && obj.state === false);
    const doneList = data.filter((obj: itemTy) => obj && obj.state === true);

    // 필터에 따라 출력할 리스트를 결정
    let displayList;
    switch (view) {
        case 'in': displayList = inList; break;
        case 'done': displayList = doneList; break;
        default: displayList = data; }

    const onDeleteHandler = (id: number) => {
        console.log('클릭', id, ' typeof id', typeof (id))
        deleteData(id)
    }

    const onPutHandler = (item: itemTy) => {
        setActive(true);
        console.log(item, 'item')
        const putData = { id: item.id, name: item.name, date: item.date, state: false }
        setData(putData);
    }

    // console.log(data, '<-----data')

    return (
        <>
        <section className='HomeTitle'>
            <span>2024</span>
            <h2>My Bucket List</h2>
            <div className='progress'>
            <button className={btnstyle === 'all' ? 'all active' : 'all'} onClick={() => { setView('all'); setBtnstyle('all'); }}>전체</button>
<button className={btnstyle === 'in' ? 'in active' : 'in'} onClick={() => { setView('in'); setBtnstyle('in'); }}>진행중</button>
<button className={btnstyle === 'done' ? 'done active' : 'done'} onClick={() => { setView('done'); setBtnstyle('done'); }}>완료</button>

            </div>
        </section>
        <section className='HomeList'>
            <ul>
                {
                    displayList.map((item: itemTy) => {
                        return <li key={item.id}>
                            <p>{item.name}</p>
                            <div className='bottom'>
                                <div className="btns">
                                    <button onClick={() => { onPutHandler(item) }}>수정</button>
                                    <button onClick={() => { onDeleteHandler(item.id) }}>삭제</button>
                                </div>
                                <span className='date'>{item.date}</span>
                            </div>
                        </li>
                    })
                }
            </ul>
            </section>
            </>
    );
}

export default List;