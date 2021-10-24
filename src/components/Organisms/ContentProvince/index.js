import {Breadcrumbs, Link, Typography} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    fetchAircraft,
    removeAircraft
} from '../../../store/actions/Reducers-Aircraft';
import TableProvince from '../../Molecules/ContentProvince/TableProvince';
import ViewStyle from './View-Style';

const ContentProvince = () => {
    const classes = ViewStyle();
    const dispatch = useDispatch();
    const dekstop = useMediaQuery('(min-width:600px)');

    const stateAircraft = useSelector((state) => state.airCraft);
    useEffect(() => {
        const promiseAircraft = dispatch(fetchAircraft());
        Promise.allSettled([promiseAircraft]);
    }, []);

    const deleteAircraft = (id) => {
        const removeItem = dispatch(removeAircraft({id}));

        Promise.allSettled([removeItem]).then((values) => {
            dispatch(fetchAircraft());
        });
    };

    // const handleEditAircraft = (id) => {
    //   const editAircraft = dispatch()
    // }
    return (
        <div className={classes.container}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link className={classes.titleBread} color="inherit" href="/">
                    Master Data Management
                </Link>
                <Typography className={classes.titleBreadAirCraft} color="textPrimary">
                    Province
                </Typography>
            </Breadcrumbs>
            <div className={classes.title}>
                <Typography color="textPrimary" variant="h5" component="h1">
                    Master Province
                </Typography>
            </div>
            <div className={classes.containerTable}>
                <div className={classes.rootTab}>
                    <TableProvince
                        removeFunction={deleteAircraft}
                        dataTable={stateAircraft.dataAircraft}
                        titleButton="Create New"
                        linkButton="/province/create"
                    />
                </div>
            </div>
        </div>
    );
}

export default ContentProvince;