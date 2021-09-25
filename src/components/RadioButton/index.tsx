/* eslint-disable @typescript-eslint/no-unused-vars */

import { Space } from 'antd';
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Link, useLocation } from 'umi';

const RadioMenu: React.FC<{ values: any}> = ({ values, ...props }) => {
    const [selectedIndex, setIndex] = useState(0)
    const location = useLocation();
    return (
        <div className={styles.main} >
            <Space >
                {
                    values.map((v, index) =>
                        <Link
                            key={v.url}
                            to={v.url}
                            className={styles.button_item}
                            style={
                                location.pathname === v.url ?
                                    {
                                        backgroundColor: "#722ED1",
                                        fontWeight: "bolder",
                                    } :{}
                            }
                            onClick={
                                () => {
                                    if (index !== selectedIndex) setIndex(index)
                                }
                            }
                        >
                            {v.name}
                        </Link>
                    )
                }
            </Space>
        </div >
    );
};

export default RadioMenu;
