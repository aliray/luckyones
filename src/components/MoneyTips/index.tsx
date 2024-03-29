/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import RewardsTips from '../Tools/RewardsTips';

const MoneyTips: React.FC<{
    prefix?: string, money: any, mstyle?: Object,
    s1?: string, s2?: string, unit?: string
}>
    = ({ prefix, money, mstyle, s1, s2, unit = "$", ...props }) => {
        return (
            <>
                <span>
                    {
                        prefix ?
                            <span style={{
                                fontSize: s2,
                                fontWeight: "bold",
                            }}>
                                {prefix}&nbsp;
                            </span>
                            : null
                    }
                    <span style={{ fontSize: s1, ...mstyle, color: "#280D5F", fontWeight: "lighter" }}>
                        {/* {intl.formatNumber(money)} */}
                        <RewardsTips value={Number(money)} />
                    </span>
                    <span style={{ fontSize: s2 }}>
                        &nbsp;{unit}
                    </span>
                </span>
            </>
        );
    };


const MoneyTipsLarge: React.FC<{ money: any, style?: Object }> = ({ money, style, ...props }) => {
    return (
        <MoneyTips money={money} s1="xxx-large" s2="large" mstyle={style} />
    );
}

const MoneyTipsNormal: React.FC<{ prefix?: any, money: any, unit?: string }> = ({ prefix, money, unit = "$", ...props }) => {
    return (
        <MoneyTips money={money} s1="large" s2="xx-small" unit={unit} prefix={prefix} />
    );
}

const UnitipsNormal: React.FC<{ prefix?: any, value: any, unit?: string }> = ({ prefix, value, unit = "$", ...props }) => {
    return (
        <MoneyTips money={value} s1="large" s2="xx-small" unit={unit} prefix={prefix} />
    );
}

const MoneyTipsStatistic: React.FC<{ prefix?: any, money: any, unit?: string }> = ({ prefix, money, unit = "$", ...props }) => {
    return (
        <MoneyTips money={money} s1="20px" s2="10px" unit={unit} prefix={prefix} />
    );
}


export { MoneyTips, MoneyTipsLarge, MoneyTipsNormal, UnitipsNormal, MoneyTipsStatistic };
