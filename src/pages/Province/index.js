import React from 'react';
import ContentProvince from '../../components/Organisms/ContentProvince';
import Layout from '../../components/Organisms/Layout/index';
import CreateProvince from './create';
import DetailProvince from './detail';
import EditProvince from './edit';

const Province = () => {
    return (
        <Layout>
            <ContentProvince />
        </Layout>
    );
}

export {Province, CreateProvince, EditProvince, DetailProvince};
