/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react'
import { useModel } from 'umi'

const Div: React.FC<{
    classNames?: string[],
    style?,
    lessStyles,
    content?: React.ReactNode
}> = ({ classNames, style, lessStyles, content, ...props }) => {

    const { theme } = useModel("uimodel")
    const { children } = props
    const classes = classNames.map(
        (classn) => {
            return theme === "dark" ? lessStyles[`${classn}_dark`] || lessStyles[`${classn}`] : lessStyles[`${classn}`]
        }
    ).join(" ")

    return (
        <div className={classes}>
            {
                content || children
            }
        </div >
    )
}

export { Div }

