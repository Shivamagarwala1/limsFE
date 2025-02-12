import React, { useState } from 'react'
import { FaUserCircle, FaUserEdit } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { LuMessageCircleMore } from "react-icons/lu";
import { useSelector } from 'react-redux';

export default function ChartBoatApp() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);
    const user = useSelector((state) => state.userSliceName?.user || null);

    const [showChartPopup, setShowChartPopup] = useState(false);

    return (
        <>
            <div className='fixed bottom-6 right-3  p-2 rounded-full z-30 shadow-2xl cursor-pointer' title='Chart With Friends'
                style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}

                onClick={() => setShowChartPopup(!showChartPopup)}
            >
                <LuMessageCircleMore className='text-2xl' />
            </div>


            {
                showChartPopup === true && (
                    <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
                        <div className="w-full mx-40 z-50 shadow-2xl bg-white rounded-lg    animate-slideDown ">

                            <div className='border-b-[1px]  flex justify-between items-center px-2 py-1 rounded-t-md text-xs'
                                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                            >
                                <div className=" font-semibold"
                                    style={{ color: activeTheme?.iconColor }}
                                >
                                    LIMS Chart App
                                </div>

                                <IoMdCloseCircleOutline className='text-xl cursor-pointer'
                                    style={{ color: activeTheme?.iconColor }}
                                    onClick={() => setShowChartPopup(!showChartPopup)}
                                />
                            </div>


                            <div className='h-96 grid grid-cols-12 gap-4'>

                                <div className='h-96  overflow-scroll col-span-4 border-[1px] rounded-l-md'>

                                    {/* user details */}
                                    <div className='flex justify-between items-center border-[1px]  px-1' style={{ background: activeTheme?.subMenuColor }}>
                                        <div className='flex items-center gap-1 my-1'>
                                            <div>
                                                {
                                                    user?.image ?
                                                        <img src={user?.image} alt="path not found" className="w-8 h-8 rounded-full" />
                                                        :
                                                        <FaUserCircle />

                                                }
                                            </div>
                                            <div className="text-sm font-semibold">{user?.name}</div>
                                        </div>

                                        <div>
                                            <FaUserEdit className='w-6 h-6 cursor-pointer'
                                                style={{ color: activeTheme?.menuColor }}
                                            />
                                        </div>
                                    </div>

                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel reiciendis culpa amet molestias provident? Sit natus minima quaerat neque eligendi. Rerum doloribus dolor dolore amet maiores tenetur distinctio aperiam quam non quaerat ducimus, impedit praesentium fugit et ex earum modi eligendi laborum expedita nemo ea, explicabo iste. Incidunt fuga voluptas iure dolorem recusandae natus similique at perspiciatis? Saepe, facilis ipsum molestiae suscipit in rerum doloremque quam possimus, illo quos exercitationem alias aperiam! Commodi, atque dignissimos minima odit consectetur iusto alias temporibus, saepe veniam, assumenda natus ea vero rerum quasi. Nostrum, tempora at modi aspernatur quidem veniam debitis ratione nobis animi consequatur quisquam repudiandae ducimus dolorem sequi illum amet natus delectus sapiente alias quas vitae nemo. Reiciendis blanditiis obcaecati quam sunt quasi laborum, molestiae, molestias consequatur doloremque esse voluptatum iure dolore. Odio veniam eveniet nam nobis accusantium rerum reiciendis ipsa quaerat excepturi dolorum, alias minus modi corrupti ut labore quas cumque illum, fugiat qui adipisci similique sapiente mollitia? Totam officiis aut excepturi doloribus sint reiciendis ut illo adipisci officia, explicabo accusantium labore voluptate facere ducimus nam repudiandae vero quos assumenda atque inventore doloremque alias recusandae nihil. Commodi est dicta ex omnis nobis consectetur, consequuntur voluptatem porro sint necessitatibus neque nihil non.
                                </div>
                                <div className='col-span-8 border-2 h-96 overflow-scroll'>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure dolores necessitatibus commodi quidem eius quo ut vitae provident facere. Sit cumque laboriosam quisquam veniam unde maiores aliquam eius? Ipsum a recusandae reprehenderit perspiciatis, voluptate doloremque dolorum, nisi totam, deleniti ut quidem vel? Est veritatis fuga culpa impedit accusamus deserunt molestias tenetur vero excepturi sapiente enim dolor, ipsam laboriosam laborum consectetur quibusdam assumenda officiis esse repellendus dolores numquam praesentium consequuntur, minus soluta. Nemo eveniet aut, ab quas asperiores maiores minus delectus minima ullam ducimus totam magnam? Id exercitationem consequatur, minus assumenda quas eligendi inventore provident. Ex optio, ullam facere accusantium recusandae magnam. Eaque laboriosam minus atque quam in! Corrupti id quod qui deleniti tempora harum illo nam nobis non eveniet dignissimos vitae quae voluptatibus similique cupiditate assumenda fugiat at in mollitia, natus enim consequuntur ipsa reiciendis? Neque quasi ipsum debitis, repudiandae placeat excepturi totam. Mollitia ducimus ratione alias recusandae, nesciunt delectus optio dolor cum cupiditate minima veniam tenetur sapiente reprehenderit necessitatibus at et laudantium consequuntur iusto atque odit ea facere architecto quia ad? Enim eaque voluptate rerum animi sed ratione saepe repellendus perspiciatis. Assumenda libero, qui recusandae perspiciatis beatae error sed expedita maiores dolores iure, facilis eaque repellendus iusto provident rem fugit incidunt corporis facere accusantium. Eaque officiis amet soluta tempora, doloribus ex aperiam labore assumenda in laborum nam cupiditate ad quae ullam quasi necessitatibus et asperiores? Repellendus, quod! Error assumenda quod modi sed similique harum dignissimos iste libero incidunt culpa sapiente est minus voluptatibus, quis quas aut dolor magnam. Iste architecto ipsum ducimus earum commodi, porro nihil ab dicta, alias delectus tempora. Mollitia vitae debitis molestiae dolor fuga alias quis nihil! Nemo quas odio voluptas, temporibus quos ullam magnam modi accusamus! Sapiente praesentium iste quidem magni ex. Ab nesciunt sit, est aperiam in necessitatibus saepe ut quam consequatur, quos totam, inventore rem nobis vitae quidem! Magni, eos qui. Possimus aspernatur sunt, iure quisquam quos dignissimos explicabo a corrupti distinctio consequuntur? Nihil tempore maxime nisi repudiandae labore praesentium eum, voluptatem voluptatum. Molestias consequatur id architecto autem animi, delectus doloribus nisi voluptate reiciendis ea fuga fugit distinctio, laborum non, assumenda hic eaque mollitia aspernatur porro voluptatibus amet. Necessitatibus animi quas veniam alias hic, ullam nemo dicta cumque nobis earum tenetur beatae repellendus voluptate, ad eligendi dolorum autem? Ut modi laudantium deleniti. Sequi nemo perferendis necessitatibus doloribus porro provident, error, natus tempore, at perspiciatis quisquam nam! Dignissimos non dicta et veniam odio dolor nesciunt, eligendi magni cum explicabo eius reprehenderit ipsum. Aspernatur dolores molestiae necessitatibus dolorum mollitia aliquid deserunt libero saepe autem laudantium explicabo doloribus eum architecto, debitis voluptate illum animi similique exercitationem tempore inventore hic vitae! Quidem mollitia possimus id fugiat laudantium ullam quisquam delectus dolorum eius adipisci, praesentium, temporibus corrupti eveniet harum nemo tempora libero placeat, sunt eaque quasi officiis? Dicta eveniet laboriosam nulla a consequatur dolorem expedita asperiores similique error perspiciatis nihil vel ad consectetur repellendus laborum sapiente molestiae tempora, quia aspernatur quas porro iure voluptatem tempore! Itaque tenetur iure sit doloremque velit ratione harum labore nam quia saepe, in rem repellat totam. Explicabo ea maiores mollitia corrupti quis, maxime iusto velit iste autem hic dignissimos pariatur blanditiis vero nemo obcaecati excepturi corporis delectus nesciunt dolore non dolores itaque? Minus a consequuntur officia expedita nam tenetur doloribus officiis possimus, alias ab repudiandae, fugit eum vel magni inventore reiciendis sunt ipsum optio, recusandae iure dignissimos? Quos sunt debitis quod sed porro a vero mollitia saepe libero nobis tempore est ab, suscipit doloremque quibusdam magnam. Minus ut modi recusandae nobis? Modi, id aperiam ducimus optio eius cumque dolore quasi voluptatibus est porro, tenetur, dicta quas animi dolores qui enim rem adipisci. Quis sint necessitatibus eos voluptate ducimus quia suscipit aut iusto? Delectus deleniti maxime debitis autem cum facilis sed ipsa soluta quia beatae nostrum eveniet commodi voluptatum minus molestias non sit harum, quae, explicabo corporis iste dicta. Quae cupiditate laborum vitae corrupti odit saepe omnis deleniti, illo sint dolorum cumque rerum quis praesentium quibusdam distinctio. Eum, non dicta? Debitis pariatur quisquam consectetur odit optio soluta, itaque officiis quod non doloremque nobis quis voluptatem officia voluptate at odio animi fugiat quam quasi, vitae, unde similique. Veritatis, porro, explicabo aliquam quas ullam sapiente qui totam unde dolore impedit repellendus vel repudiandae ad. Similique, cupiditate.
                                </div>

                            </div>

                        </div>
                    </div>
                )
            }
        </>
    )
}
