/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

export default function uimodel() {

    // numbers manager;
    const [uinm, setUinm] = useState(false)

    const openUinm = () => {
        setUinm(true)
    }

    const closeUinm = () => {
        setUinm(false)
    }

    return { uinm, openUinm, closeUinm }
}