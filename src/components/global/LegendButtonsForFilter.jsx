import React from 'react'

import useRippleEffect from '../customehook/useRippleEffect';

export default function LegendButtonsForFilter({ onFilterSelect, allFilterData }) {

    // const activeTheme = useSelector((state) => state.theme.activeTheme);


    useRippleEffect()


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2  my-2  mx-1 lg:mx-2 items-center">

            {allFilterData?.data?.reduce((acc, item, index) => {
                if (index % 2 === 0) {
                    acc.push([]);
                }
                acc[acc.length - 1].push(item);
                return acc;
            }, []).map((group, idx) => (
                <div className="flex gap-[0.25rem]" key={idx}>
                    {group.map((item) => (
                        <div className="relative flex-1" key={item?.id}>
                            <button
                                type="submit"
                                data-ripple-light="true"
                                className="overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer px-2 text-white"
                                style={{ background: item?.colourCode }}
                                onClick={() => onFilterSelect(item?.contantName)}
                            >
                                {item?.contantName}
                            </button>
                        </div>
                    ))}

                    {/* If the group has only one item, add an empty div to maintain alignment */}
                    {group.length === 1 && <div className="relative flex-1"></div>}
                </div>
            ))}


        </div>
    )
}
