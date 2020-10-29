'use strict'

import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { setTransform } from './utils';
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { district } from './district'
import './index.scss'


export interface AddressData {
    value: string;
    title: string;
    children?: AddressData[];
}

interface TouchState{
    startX?: number;
    startY?: number;
    targetIdx?: number;
    moved?: boolean;
}

interface AddressProps {
    isOpened: boolean;
    title: any;
    value: any[];
    tipText: string;
    className: string;
    prefixCls: string;
    dataSource: AddressData[];
    onConfirm: any;
    onClose: any;
}

export const AddressPicker: React.FC<AddressProps>  = (props, ref) => {
    const wrapRef = useRef(null);
    const navRef = useRef(null);
    const navlineRef = useRef(null);

    let htmlElement= document.querySelector('html');
    const [isOpened, setOpenState] = useState<boolean>(false)

    const [selectedRows, setSelectedRows] = useState<any[]>([])
    const [curIdx, setCurIdx] = useState<number>(-1)
    const [touch, setTouch] = useState<TouchState>({})
    const [prefixCls, setPrefixCls] = useState<string>("picker-address")
    const [tipText, setTipText] = useState<string>("请选择")
    const [title, setTitle] = useState<string>("选择地址")
    const [dataSource, setDataSource] = useState<AddressData[]>(district)

    const getSelectedRows = (value: any[], dataSource: AddressData[]) => {
        let selectedRows: any[] = [];
        if (value && dataSource && value.length) {
            const loop = (ds: AddressData[], level: number) => {
                const v = value[level];
                const rows = ds.filter(item => item.value === v);
                if (rows.length) {
                    selectedRows.push(rows[0]);
                    if (rows[0].children && rows[0].children.length && value.length === level + 1) {
                        selectedRows.push({});
                    } else if (rows[0].children && rows[0].children.length) {
                        loop(rows[0].children, ++level);
                    }
                }
            };
            loop(dataSource, 0);
        }
        if (!selectedRows.length) {
            return {
                curIdx: 0,
                selectedRows: [{}],
            };
        }
        return {
            curIdx: selectedRows.length - 1,
            selectedRows,
        };
    }

    const onTouchStart = (event: any) => {
        setTouch(
            Object.assign({}, touch, {
                startX: event.touches[0].clientX,
                startY: event.touches[0].clientY,
                moved: false,
            })
        )
    }

    const onTouchMove = (event: any) => {
        const moveX = event.touches[0].clientX;
        const moveY = event.touches[0].clientY;
        const deltaX = moveX - touch.startX;
        const deltaY = moveY - touch.startY;

        if (Math.abs(deltaY) > Math.abs(deltaX)) return;

        const curOffsetWidth = -(curIdx * window.innerWidth);
        const maxOffsetWidth = -((selectedRows.length - 1) * window.innerWidth);
        const offsetWidth = Math.min(0, Math.max(maxOffsetWidth, curOffsetWidth + deltaX));
        if (offsetWidth >= 0 || offsetWidth <= maxOffsetWidth) return;
        if (!touch.moved) touch.moved = true;
        event.preventDefault();

        setTransform(wrapRef.current.style, `translate3d(${offsetWidth}px, 0, 0)`);
        const percent = Math.abs(deltaX / window.innerWidth);
        setTouch(
            Object.assign({}, touch, {
                targetIdx: percent >= 0.1 ? (deltaX < 0) ? curIdx + 1 : curIdx - 1 : curIdx
            })
        )
    }

    const onTouchEnd = () => {
        if (!touch.moved) return;
        if (touch.targetIdx !== curIdx) {
            setCurIdx(touch.targetIdx)
        }
    }

    const bindEvent = () => {
        wrapRef.current.addEventListener('touchstart', onTouchStart, false);
        wrapRef.current.addEventListener('touchmove', onTouchMove, false);
        wrapRef.current.addEventListener('touchend', onTouchEnd, false);
    }

    const unBindEvent = () => {
        wrapRef.current.removeEventListener('touchstart', onTouchStart, false);
        wrapRef.current.removeEventListener('touchmove', onTouchMove, false);
        wrapRef.current.removeEventListener('touchend', onTouchEnd, false);
    }

    useEffect(
        () => {
            let { curIdx, selectedRows } = getSelectedRows(
                props.value,
                dataSource
            )
            setSelectedRows(selectedRows)
            setCurIdx(curIdx)
            setOpenState(props.isOpened)
            if(props.tipText) setTipText(props.tipText)
            if(props.prefixCls) setPrefixCls(props.prefixCls)
            if(props.title) setTitle(props.title)
            if(props.dataSource) setDataSource(props.dataSource)
        }, [props.isOpened]
    )

    useEffect(
        () => {
            if (isOpened) {
                htmlElement.classList.add('noscroll');
            }
            bindEvent();

            return () => {
                if (htmlElement.classList.contains('noscroll')) {
                    htmlElement.classList.remove('noscroll');
                }
                unBindEvent();
            }
        }
    )

    useEffect(
        () => {
            if (!isOpened) {
                htmlElement.classList.remove('noscroll');
            } else {
                if (!htmlElement.classList.contains('noscroll')) {
                    htmlElement.classList.add('noscroll');
                }
                setTransform(wrapRef.current.style, `translate3d(-${(curIdx) * 100}vw, 0, 0)`);
                const navItem = navRef.current.childNodes[curIdx];
                if(navItem) {
                    const rect = navItem.getBoundingClientRect();
                    navlineRef.current.style.width = `${rect.width}px`;
                    navlineRef.current.style.left = `${rect.left}px`;
                    navlineRef.current.style.bottom = `${navRef.current.clientHeight - (navItem.offsetTop + navItem.offsetHeight)}px`;
                    const activeItem = document.querySelector(`.${prefixCls}-main-nav-item.active`);
                    if (activeItem) {
                        activeItem.classList.remove('active');
                    }
                    setTimeout(() => {
                        document.querySelector(`#main-nav-item-${curIdx}`).classList.add('active');
                    }, 300);
                }
            }
        }
    )

    useEffect(
        () => {
            return () => {
                if (isOpened) {
                    htmlElement.classList.remove('noscroll');
                }
            }
        }
    )

    const onClose = (event: any) => {
        if (event.target.classList.contains(prefixCls) && onClose) {
            props.onClose();
        }
    }

    const loadData = () => {

    }

    const onSelectedRow = (item: any, level: number) => () => {
        let newSelectedRows = selectedRows
        if (selectedRows[level]) {
            const args = [level, 1, item];
            if (item.children && item.children.length && curIdx + 1 >= selectedRows.length) {
                args.push({});
            } else if (curIdx + 1 < selectedRows.length) {
                newSelectedRows = selectedRows.slice(0, curIdx + 1);
                args.push({});
            }
            newSelectedRows.splice(...args);
            const isEnd = !item.children || !item.children.length;
            setSelectedRows([...newSelectedRows])
            setCurIdx(isEnd ? level : level + 1)
            setOpenState(isEnd ? false : isOpened)
        }

        if (!item.children || !item.children.length) {
            props.onConfirm(
                selectedRows.map(
                    _item => _item.value
                ).filter(
                    _item => typeof _item !== 'undefined'
                ), 
                selectedRows
            );
        }
    }

    const onSelectedNav = (item: any, level: number) => () => {
        setCurIdx(level)
    }

    const onNavBarMove = () => {
        navlineRef.current.style.width = 0;
    }

    const getNextData = (ds: AddressData[], level = 0) => {
        const row = selectedRows[level] || {};
        const lists = level > 0 ? selectedRows[level - 1].children : ds;

        if (!lists || !lists.length) {
            return null;
        }

        return (
            <View key={level} className={`${prefixCls}-main-body-item`}>
                <View className="atul">
                    {lists.map((item: any) => (
                        <View
                            key={item.value}
                            className={
                                cx(`${prefixCls}-main-body-item-li atul atli`, { active: row.value === item.value })
                            }
                            onClick={onSelectedRow(item, level)}
                        >
                            <Text className="">
                                {item.title}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    }

    const classNames = cx(
        prefixCls,
        props.className,
        { visible: isOpened }
    );
    const wrapStyles = {
        width: `${selectedRows.length * 100}vw`,
    };

    if (selectedRows.length === 1) {
        wrapStyles.transform = 'translate3d(0, 0, 0)';
    }

    return (
        <View className={classNames} onClick={onClose}>
            <View className={`${prefixCls}-main`}>
                <View className={`${prefixCls}-main-title`}>
                    <View className={`${prefixCls}-main-title-text`}>{title}</View>
                    <View className={`${prefixCls}-main-title-close`} onClick={onClose}></View>
                </View>
                <View className={`${prefixCls}-main-nav`}>
                    <View ref={navRef} onTouchMove={onNavBarMove} className='atul'>
                        {
                            selectedRows.map((item, index) => (
                                item.value ?
                                (
                                    <View 
                                        key={index}
                                        onClick={onSelectedNav(item, index)}
                                        id={`main-nav-item-${index}`}
                                        className={`${prefixCls}-main-nav-item atul atli`}
                                    >
                                        {item.title}
                                    </View>
                                ) :
                                (
                                    <View 
                                        key={index} 
                                        id={`main-nav-item-${index}`}
                                        className={`${prefixCls}-main-nav-item  atul atli`}
                                    >
                                        {tipText}
                                    </View>
                                )
                            ))
                        }
                    </View>
                    <Text className={`${prefixCls}-main-nav-active`} ref={navlineRef}></Text>
                </View>
                <View className={`${prefixCls}-main-body`}>
                    <View className="wrap" ref={wrapRef} style={wrapStyles}>
                        {
                            selectedRows.map((item, index) => getNextData(dataSource, index))
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}
