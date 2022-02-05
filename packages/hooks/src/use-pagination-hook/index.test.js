/**
 * Copyright (c) 2021-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-undef */
import {renderHook, act} from '@testing-library/react-hooks';
import usePagination, {NO_TOTAL_PAGES_ERROR} from './index';

describe('UsePagination hook', () => {
    it('should exist', () => {
        const {result} = renderHook(() => usePagination({totalPages: 10}));
        expect(result.current).toBeDefined();
    });

    it('should throw if no total pages were given to it', () => {
        expect(() => {
            usePagination();
        }).toThrow(NO_TOTAL_PAGES_ERROR);
    });

    it('should return the totalPages that was given to it', () => {
        const mockTotalPages = 10;
        const {result} = renderHook(() => usePagination({totalPages: mockTotalPages}));
        expect(result.current.totalPages).toEqual(mockTotalPages);
    });

    it('should return 0 as the cursor position if no cursor was given to it', () => {
        const {result} = renderHook(() => usePagination({totalPages: 10}));
        expect(result.current.cursor).toEqual(0);
    });

    it('should return the received cursor position if it was given to it', () => {
        const {result} = renderHook(() => usePagination({totalPages: 10, initialCursor: 5}));
        expect(result.current.cursor).toEqual(5);
    });

    it('should return the hooks methods', () => {
        const {result} = renderHook(() => usePagination({totalPages: 10}));
        expect(typeof result.current.goNext).toEqual('function');
        expect(typeof result.current.goPrev).toEqual('function');
        expect(typeof result.current.setCursor).toEqual('function');
    });

    describe('setCursor method', () => {
        it('should set the hooks cursor to the given value', () => {
            const {result} = renderHook(() => usePagination({totalPages: 10}));

            act(() => {
                result.current.setCursor(4);
            });

            expect(result.current.cursor).toEqual(4);
        });

        it('should not set the hooks cursor if the given value is above the total pages', () => {
            const {result} = renderHook(() => usePagination({totalPages: 10}));

            act(() => {
                result.current.setCursor(15);
            });

            expect(result.current.cursor).toEqual(0);
        });

        it('should not set the hooks cursor if the given value is lower than 0', () => {
            const {result} = renderHook(() => usePagination({totalPages: 10}));

            act(() => {
                result.current.setCursor(-3);
            });

            expect(result.current.cursor).toEqual(0);
        });
    });

    describe('goNext method', () => {
        it('should set the hooks cursor to the next value', () => {
            const {result} = renderHook(() => usePagination({totalPages: 2}));

            act(() => {
                result.current.goNext();
            });

            expect(result.current.cursor).toEqual(1);
        });

        it('should not set the hooks cursor to the next value if we reached the last page', () => {
            const {result} = renderHook(() => usePagination({totalPages: 5, initialCursor: 4}));

            act(() => {
                result.current.goNext();
            });

            expect(result.current.cursor).toEqual(4);
        });
    });

    describe('goPrev method', () => {
        it('should set the hooks cursor to the prev value', () => {
            const {result} = renderHook(() => usePagination({totalPages: 5, initialCursor: 4}));

            act(() => {
                result.current.goPrev();
            });

            expect(result.current.cursor).toEqual(3);
        });

        it('should not set the hooks cursor to the prev value if we reached the first page', () => {
            const {result} = renderHook(() => usePagination({totalPages: 5}));

            act(() => {
                result.current.goPrev();
            });

            expect(result.current.cursor).toEqual(0);
        });
    });

    describe('onChange callback handler', () => {
        it('should be invoked when the cursor changes by setCursor method', () => {
            const onChangeSpy = jest.fn();
            const {result} = renderHook(() => usePagination({totalPages: 5, onChange: onChangeSpy}));

            act(() => {
                result.current.setCursor(3);
            });

            expect(onChangeSpy).toHaveBeenCalledWith(3);
        });

        it('should not be invoked when the hook is initialized', () => {
            const onChangeSpy = jest.fn();
            renderHook(() => usePagination({totalPages: 5, onChange: onChangeSpy}));

            expect(onChangeSpy).not.toHaveBeenCalled();
        });
    });
});
