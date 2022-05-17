import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { Moderator } from '../interfaces/moderator';
import * as AuthApi from '../services/auth.service';
import * as ModeratorApi from '../services/moderator.service';

const ModeratorContext = React.createContext({} as any);

function ModeratorProvider(props: any) {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [moderators, setMorderators] = useState<Moderator[]>([]);
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [totalCount, setTotalCount] = useState(0);

    const getModerators = async() => {
        try {
            setLoading(true);
            const result = await ModeratorApi.getModerators(page, perPage, search);
            if (result) {
                setMorderators(result.moderators);
                setTotalCount(result.totalCount);
            }
            setLoading(false);
            return;
        } catch (err) {
            setLoading(false);
            return Promise.reject(err);
        }
    }

    useEffect(() => {
        (async () => {
            await getModerators();
        })();
    }, []);

    const createModerator = async (data: Moderator) => {
        try {
            setLoading(true);
            const result = await ModeratorApi.createModerator(data);
            if (result && result.moderator) {
                setMorderators(_moderators => {
                    return _moderators.concat(result.moderator);
                })
            }
            setLoading(false);
            return result;
        } catch (err) {
            setLoading(false);
            return Promise.reject(err);
        }
    }

    const updateModerator = async (data: Moderator) => {
        try {
            setLoading(true);
            const result = await ModeratorApi.updateModerator(data?.id || '' , data);
            if (result) {
                setMorderators((_moderators: Moderator[]) => {
                    const temp = _moderators;
                    temp.map((item, index) => {
                        if(item.id === data.id) {
                            temp[index] = data;
                        }
                        return true;
                    })
                    // temp[index] = data;
                    return temp;
                });
            }
            setLoading(false);
            return result;
        } catch (err) {
            setLoading(false);
            return Promise.reject(err);
        }
    }

    const deleteModerator = async(id: string) => {
        try {
            setLoading(true);
            const result = await ModeratorApi.removeModerator(id);
            if(result) {
                setMorderators(_morderators => {
                    const data = _morderators.filter(morderator => morderator.id !== id);
                    return data
                })
            }
            setLoading(false);
            return result;
        } catch(err) {
            setLoading(false);
            return Promise.reject(err);
        }
    }

    const resetPass = async(token: string, newPass: string) => {
        try {
            setLoading(true);
            const result = await ModeratorApi.updatePass(token, newPass);
            setLoading(false);
            return result;
        } catch(err) {
            setLoading(false);
            return Promise.reject(err);
        }
    }

    const requestReset = async(id: string) => {
        try {
            setLoading(true);
            const result = await ModeratorApi.resetPass(id);
            setLoading(false);
            return result;
        } catch(err) {
            setLoading(false);
            return Promise.reject(err)
        }
    }

    const acceptInvitation = async(status: string) => {
        try {
            setLoading(true);
            const { token } = Router.query;
            return await AuthApi.acceptInvite(token, status);
        } catch(err) {
            setLoading(false);
          return Promise.reject(err);
        }
    }

    const changePassword = async(id: string, oldPass: string, newPass: string) => {
        try {
            setLoading(true);
            const result = await AuthApi.moderatorChangePass(id, oldPass, newPass);
            setLoading(false);
            return result;
        } catch(err) {
            setLoading(false);
            return Promise.reject(err);
        }
    }

    const resetModeratorPassword = async(token: string | string[] | undefined, newPass: string) => {
        try {
            setLoading(true);
            const result = await AuthApi.restModeratorPass(token, newPass);
            setLoading(false);
            return result;
        } catch(err) {
            setLoading(false);
            return Promise.reject(err);
        }
    }

    const setupAccountPass = async(id: string | string[] | undefined, newPass: string) => {
        try {
            setLoading(true);
            const result = await AuthApi.setupAccountPass(id, newPass);
            setLoading(false);
            return result;
        } catch(err) {
            setLoading(false);
            return Promise.reject(err);
        }
    }

    useEffect(() => {
        setPage(0);
    }, [perPage]);

    useEffect(() => {
        getModerators().catch((err) => err);
    }, [search, perPage, page]);


    return (
        <ModeratorContext.Provider
            value={{
                isLoading,
                moderators,
                getModerators,
                createModerator,
                updateModerator,
                deleteModerator,
                resetPass,
                setMorderators,
                acceptInvitation,
                changePassword,
                resetModeratorPassword,
                requestReset,
                setLoading,
                page,
                setPage,
                perPage,
                setPerPage,
                totalCount,
                setTotalCount,
                search,
                setSearch,
                setupAccountPass
            }}
            {...props}
        />
    )
}

function useModerator() {
    const context = React.useContext(ModeratorContext);

    if (context === undefined) {
        throw new Error('useModerator must be used within a ModeratorProvider');
    }
    return context;
}

export { ModeratorProvider, useModerator }
