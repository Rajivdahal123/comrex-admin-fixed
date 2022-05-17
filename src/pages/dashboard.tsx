import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from 'react';
const Button = dynamic(() => import("../components/common/Button"));
const Input = dynamic(() => import("../components/common/Input"));
const PageNationBar = dynamic(() => import("../components/common/PaginationBar"));
const Select = dynamic(() => import("../components/common/Select"));
const AlertModal = dynamic(() => import("../components/Modal/AlertModal"));
const CodecSetupModal = dynamic(() => import('../components/Modal/CodecSetupModal'));
const  ConfirmModal = dynamic(() => import('../components/Modal/ConfirmModal'));
const EditAccountModal= dynamic(() => import('../components/Modal/EditAccountModal'));
const ModeratorTable = dynamic(() => import('../components/table/moderatorTable'));
import { useModerator } from '../context/moderatorContext';
import { Moderator } from '../interfaces/moderator';
import withLayout from '../layout/adminLayout';

const DashboardPage = () => {

  const { deleteModerator, requestReset, getModerators, page, perPage, setPage, setPerPage, setSearch, totalCount, moderators } = useModerator();
  const [editState, openEditModal] = useState<boolean>(false);
  const [confirmState, openConfirmModal] = useState<boolean>(false);
  const [selectedIndex, setIndex] = useState<number>(0);
  const [selectedUser, setUser] = useState<Moderator>();
  const [key] = useState<string>();
  const [actionType, setType] = useState<string>('');
  const [alertState, openAlert] = useState<boolean>(false);
  const [codecState, openCodec] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>();
  const [msg, setMessage ] = useState<string>();
  const [moderatorDisable, setModeratorDisable ] = useState<boolean>(false);

  function callbackFunctionToDisableModeratorButton(data) {
    setModeratorDisable(true)
    }
  const editMorderator = useCallback((moderator, index) => {
    setUser(moderator);
    setIndex(index);
    setTimeout(() => {
      openEditModal(true);
    }, 200)
  }, []);

  const newMorderator = useCallback(() => {
    setUser({} as any);
    openEditModal(true);
  }, []);

  const resetPassword = useCallback(async (moderator: Moderator) => {
    setUser(moderator);
    const result = await requestReset(moderator.id);
    if(result.success) {
      setAlertTitle('Password reset successfully');
      setMessage(`${moderator?.firstName} ${moderator?.lastName} will receive an email to reset the password shortly.`)
      openAlert(true);
    }
  }, [requestReset]);

  const update = useCallback((result:string) => {
    openEditModal(false);
    if(result.includes('updated')) {
      setAlertTitle('Moderator account updated successfully');
    } else {
      setAlertTitle('Moderator account created successfully');
    }
    setMessage(result);
    openAlert(true);
  }, []);

  const updateCodecHandle = useCallback((result: string) => {
    openEditModal(false);
    if(result) {
      setAlertTitle(result);
    }
    openCodec(false);
    setMessage(result);
    openAlert(true);
  }, [])

  const filterModerator = useCallback((e) => {
    // setKey(e.target.value);
    setSearch(e.target.value);
  }, []);

  const doConfirm = useCallback((moderator: Moderator, index: number, type: string) => {
    setUser(moderator);
    setType(type);
    if(index) {
      setIndex(index);
    }
    openConfirmModal(true);
  }, []);

  const closeEditModal = useCallback(() => {
    setUser({} as any);
    openEditModal(false);
  }, []);

  const setupCodec = useCallback(() => {
    setType('codec');
    openConfirmModal(true);
  }, []);

  const doAction = useCallback( async () => {
    openConfirmModal(false);
    if(actionType === 'codec') {
      openCodec(true)
    } else {
      if(actionType === 'edit') {
        editMorderator(selectedUser, selectedIndex);
      } else {
        const result = await deleteModerator(selectedUser?.id);
        if(result) {
          setAlertTitle('Moderator account successfully removed');
          setMessage(`The moderator account ${selectedUser?.firstName} ${selectedUser?.lastName} has been successfully removed`);
          openAlert(true)
        }
      }
    }

  }, [actionType, selectedUser, selectedIndex])
  const callback=(value)=>{
    console.log("insdie callback")
    setModeratorDisable(value)
  }

  useEffect(() => {
    getModerators();
  }, []);
  console.log("moderator button is",moderatorDisable)
  return (
    <div className="bg-background font-regularHN">
      <div className="dashboard-back opacity-70" />
      <div className="relative container mx-auto justify-center items-center px-6 sm:px-12 py-12">
        <div className="flex flex-col mt-2">
          <div className="-my-2 sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
              <div className="mb-4 w-full">
                <h1 className="text-2xl font-semibold text-left flex-1 mb-4">Dashboard</h1>
                <div className="flex flex-col md:flex-row">
                  <div className="flex flex-1 items-center">
                  {moderators && moderators.length > 0 && (
                    <>
                      <p className="text-xl mb-0 mr-1">Show</p>
                      <Select
                        value={perPage}
                        onChange={(value: string) => setPerPage(value)}
                        options={[
                          {label: '5', value: '5' },
                          {label: '10', value: '10' },
                          {label: '25', value: '25' },
                          {label: '50', value: '50' }
                        ]}
                      />
                      <p className="text-xl mb-0 ml-1">entries</p>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className="w-full md:w-[300px]  mr-4 md:mr-10">
                      <Input
                        type="search"
                        placeholder="Search..."
                        onChange={filterModerator}
                      />
                    </div>
                    <div>
                      {
                        moderatorDisable?<Button
                        disabled={true}
                       type="button"
                       label="Add Moderator"
                       className="w-full justify-center sm:w-auto items-center rounded-full mt-3 sm:mt-0 ml-0 md:-ml-5 flex border-transparent bg-second hover:bg-secondHover text-white font-normal whitespace-nowrap"
                     />:<Button
                        type="button"
                        onClick={() => newMorderator()}
                        label="Add Moderator"
                        className="w-full justify-center sm:w-auto items-center rounded-full mt-3 sm:mt-0 ml-0 md:-ml-5 flex border-transparent bg-second hover:bg-secondHover text-white font-normal whitespace-nowrap"
                      />
                      }

                    </div>
                    <div className='ml-8'>
                      <Button
                         disabled={true}
                        type="button"
                        onClick={() => setupCodec()}
                        label="Set Up Codec"
                        className="w-full justify-center sm:w-auto items-center rounded-full mt-3 sm:mt-0 ml-0 md:-ml-5 flex border-transparent bg-second hover:bg-secondHover text-white font-normal whitespace-nowrap"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full min-h-[500px] shadow overflow-x-auto bg-white sm:rounded-xl py-6">
                <ModeratorTable resetHandler={resetPassword} editHandler={(moderator: any, index: number) => doConfirm(moderator, index, 'edit')} deleteHandler={(moderator: any) => doConfirm(moderator, NaN, 'remove')} searchKey={key} disableAddModeratorButton={callback}/>
              </div>
              {moderators && moderators.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                  <p className="text-sm mb-2 sm:mb-0">
                    {
                      totalCount === 0
                        ? 'No entries'
                        : `Showing ${page * perPage + 1} to ${(page + 1) * perPage < totalCount ? (page + 1) * perPage : totalCount} entries`
                    }
                  </p>
                  <PageNationBar perPage={perPage} page={page} onChangePage={(value) => setPage(value)} totalCount={totalCount} />
                </div>
              )}
            </div>
          </div>
        </div>
        <CodecSetupModal isOpen={codecState} onClose={() => openCodec(false)} onSubmit={updateCodecHandle} />
        <EditAccountModal isOpen={editState} moderator={selectedUser}  onClose={closeEditModal} onSubmit={update}/>
        <ConfirmModal isOpen={confirmState} type={actionType} onClose={() => openConfirmModal(false)} onSubmit={doAction}/>
        <AlertModal
          title={alertTitle}
          message={msg}
          isOpen={alertState}
          onClose={() => openAlert(false)}
        />
      </div>
    </div>
  );
}

export default withLayout(DashboardPage);
