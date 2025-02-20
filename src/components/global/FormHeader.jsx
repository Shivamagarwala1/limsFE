import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function FormHeader({ headerData, activeTheme }) {
    return (
        <div
            className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
            style={{ background: activeTheme?.blockColor }}
        >
            <div>
                <FontAwesomeIcon icon="fa-solid fa-house" />
            </div>
            <div>{headerData}</div>
        </div>
    )
}
