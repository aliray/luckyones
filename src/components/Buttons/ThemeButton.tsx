/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useModel, useIntl } from 'umi'
import { HiOutlineSun, HiSun } from 'react-icons/hi'

const ThemeButton: React.FC = (props) => {

    const { theme, toogleTheme } = useModel("uimodel")
    return (
        // <HiOutlineSun />,
        <a style={{ fontSize: "25px" }}>
            {
                theme === "dark" ? <HiOutlineSun onClick={() => { toogleTheme("") }} /> :
                    <HiSun onClick={() => { toogleTheme("dark") }} />
            }
        </a>
    )
}
export default ThemeButton