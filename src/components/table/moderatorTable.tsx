import React, { useEffect, useState } from 'react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { useModerator } from '../../context/moderatorContext';
import { Moderator } from '../../interfaces/moderator';

const ModeratorTable = ({resetHandler, editHandler, deleteHandler, searchKey,disableAddModeratorButton}) => {

    const { moderators } = useModerator();
    const [moderatorsTemp, setMorderators] = useState<Moderator[]>(moderators);

    const userStatusClass = (status: string) => {
        switch(status) {
            case 'Pending':
                return 'text-orange';
            case 'Active':
                return 'text-green-800';
            case 'Rejected':
                return 'text-red-800';
            default:
                return 'text-orange'
        }
    }

    useEffect(() => {
        setMorderators(moderators)
        console.log("moderator length is",moderators,moderators.length)
        if(moderators.length>4){
            console.log("inside if changing to true")
            console.log("moderator temp is greater than 4",moderators.length,disableAddModeratorButton)
            disableAddModeratorButton(true)
        }
        else{
            console.log("insdie else changing to false",disableAddModeratorButton)
            disableAddModeratorButton(false)
        }
    }, [moderators]);

    return(
        <div className="min-w-[900px] px-4">
            <div className="w-full bg-primary text-white text-base flex py-3 pl-6 pr-3 rounded-md">
                <div className="w-14 text-center">Avatar</div>
                <div className="w-32 text-center">First Name</div>
                <div className="w-32 text-center">Last Name</div>
                <div className="w-40 text-center">User Name</div>
                <div className="w-3/12 text-center">Email</div>
                <div className="w-1/12 text-center">Reset</div>
                <div className="w-1/12 text-center">Status</div>
                <div className="w-1/12 text-center">Edit</div>
                <div className="w-1/12 text-center">Delete</div>
            </div>
            {moderatorsTemp.map((moderator: Moderator, index: number) => {
                return (
                    <div key={index} className={`w-full py-3 pl-6 pr-3 flex text-textHolder ${index > 0 ? 'border-t border-borderColor' : ''}`}>
                        <div className="w-14 flex items-center text-center">
                            <img
                                className='w-[50px] h-[50px] rounded-full'
                                src={`${moderator.avatar ? `data:image/png;base64,${moderator.avatar?.buffer}` : '/images/profile_avatar.jpg'}`}
                            />
                        </div>
                        <div className="w-32 flex items-center justify-center">{moderator.firstName}</div>
                        <div className="w-32 flex items-center justify-center">{moderator.lastName}</div>
                        <div className="w-40 flex items-center justify-center">{moderator.userName}</div>
                        <div className="w-3/12 flex items-center justify-center">{moderator.email}</div>
                        <div className="w-1/12 flex items-center justify-center">
                            <button
                                onClick={() => resetHandler(moderator)}
                                className="bg-grayHover text-white active:bg-lightGray font-medium text-base px-4 py-1 rounded-lg shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                type="button">
                                Reset
                            </button>
                        </div>
                        <div className={`w-1/12 flex items-center text-medium justify-center ${userStatusClass(moderator.status)}`}>
                            {moderator.status}
                        </div>
                        <div className="w-1/12 flex items-center justify-center">
                            <button onClick={() => editHandler(moderator, index)}>
                                <PencilAltIcon  className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="w-1/12 flex items-center justify-center">
                            <button onClick={() => deleteHandler(moderator)}>
                                <TrashIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>
                )
            })}
            {moderatorsTemp && moderatorsTemp.length === 0 && (
                <div className="bg-white w-full min-h-[500px] items-center flex justify-center">
                    No data to display
                </div>
            )}
        </div>
    )
}

export default ModeratorTable;
