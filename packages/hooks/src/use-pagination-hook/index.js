import {useEffect, useState, useRef} from 'react';

const usePagination = ({cursor: initialCursor, pagesCount: initialPagesCount, onPageChange: pageChangeCallback}) => {
    const [cursor, setCursor] = useState(initialCursor);
    const [pagesCount] = useState(initialPagesCount);

    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        } else {
            pageChangeCallback(cursor);
        }
    }, [cursor, pageChangeCallback]);

    const changePage = (newCursor) => {
        setCursor(newCursor);
    };

    const goPrev = () => {
        changePage(cursor - 1);
    };

    const goNext = () => {
        changePage(cursor + 1);
    };

    return [cursor, pagesCount, goPrev, goNext, changePage];
};

export default usePagination;
