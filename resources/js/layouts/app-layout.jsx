import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import React from 'react';

export default ({ children, breadcrumbs, ...props }) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AppLayoutTemplate>
);